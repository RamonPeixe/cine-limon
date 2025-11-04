import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "@/types/Movie";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<Movie[]>(
          "https://690a14111a446bb9cc2141de.mockapi.io/cinelimon",
          { signal: controller.signal }
        );
        if (!mounted) return;
        setMovies(data);
        setError(null);
      } catch (err: unknown) {
        if (axios.isCancel && axios.isCancel(err)) return;

        let message = "Erro desconhecido";
        if (axios.isAxiosError?.(err)) {
          message = err.response?.data?.message ?? err.message ?? message;
        } else if (err instanceof Error) {
          message = err.message ?? message;
        }
        if (!mounted) return;
        setError(message);
        setMovies([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return { movies, loading, error };
}
