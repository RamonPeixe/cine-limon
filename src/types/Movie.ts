export interface Movie {
  id: number;
  name: string;
  description?: string;
  director?: string;
  releaseYear?: number;
  duration?: number;
  genre?: string;
  rating?: number;
}