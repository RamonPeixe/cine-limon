import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "@/types/Movie";

export function useMovie(id?: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Movie>(
          `https://690a14111a446bb9cc2141de.mockapi.io/cinelimon/${id}`,
          { signal: controller.signal }
        );
        if (!mounted) return;
        setMovie(data);
        setError(null);
      } catch (err: unknown) {
        if (axios.isCancel?.(err)) return;
        let message = "Erro desconhecido";
        if (axios.isAxiosError?.(err)) {
          if (err.response?.status === 404) {
            if (mounted) {
              setMovie(null);
              setError(null);
            }
            return;
          }
          message = err.response?.data?.message ?? err.message ?? message;
        } else if (err instanceof Error) {
          message = err.message ?? message;
        }
        if (!mounted) return;
        setError(message);
        setMovie(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [id]);

  return { movie, loading, error };
}
