import { useState } from "react";
import axios from "axios";
import type { Movie } from "@/types/Movie";

type ApiError = { message?: string };

export function useCreateMovie() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createMovie(movie: Omit<Movie, "id">): Promise<Movie> {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post<Movie>(
        "https://690a14111a446bb9cc2141de.mockapi.io/cinelimon",
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

  return { createMovie, loading, error };
}
