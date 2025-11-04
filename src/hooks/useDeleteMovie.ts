import { useState } from "react";
import axios from "axios";

type ApiError = { message?: string };

export function useDeleteMovie() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteMovie(id: string): Promise<boolean> {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`https://690a14111a446bb9cc2141de.mockapi.io/cinelimon/${id}`);
      return true;
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

  return { deleteMovie, loading, error };
}
