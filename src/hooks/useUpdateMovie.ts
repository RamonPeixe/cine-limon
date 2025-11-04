import { useState } from "react";
import axios from "axios";
import type { Movie } from "@/types/Movie";

type ApiError = { message?: string };

export function useUpdateMovie() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateMovie(id: string, movie: Partial<Omit<Movie, "id">>): Promise<Movie> {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.put<Movie>(
        `https://690a14111a446bb9cc2141de.mockapi.io/cinelimon/${id}`,
        movie,
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (err: unknown) {
      let message = "Erro desconhecido";
      if (axios.isAxiosError<ApiError>(err)) {
        message = err.response?.data?.message ?? err.message ?? message;
      } else if (err instanceof Error) {
        message = err.message ?? message;
      }
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }

  return { updateMovie, loading, error };
}
