import { useNavigate, useParams } from "react-router-dom";
import { MovieService } from "@/services/MovieService";
import { useState, useEffect } from "react";
import type { Movie } from "@/types/Movie";
import { Card, Button } from "antd";

export default function ReadMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const data = await MovieService.getById(Number(id));
        setMovie(data);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-leaf-700">Detalhes do Filme</h1>
      <Card className="bg-gray-50">
        <div className="space-y-4">
          <div>
            <span className="font-medium">ID: </span>
            <span>{movie.id}</span>
          </div>
          <div>
            <span className="font-medium">Nome: </span>
            <span>{movie.name}</span>
          </div>
          <div>
            <span className="font-medium">Gênero: </span>
            <span>{movie.genre}</span>
          </div>
          <div>
            <span className="font-medium">Ano: </span>
            <span>{movie.releaseYear}</span>
          </div>
        </div>
        <div className="mt-6">
          <Button type="primary" onClick={() => navigate("/")} className="bg-green-600">
            Voltar
          </Button>
        </div>
      </Card>
    </div>
  );
}