
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Spin, Alert } from "antd";
import { useMovie } from "@/hooks/useMovie";


export default function ReadMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovie(id);

  if (loading) {
    return <Spin tip="Carregando..." />;
  }
  if (error) {
    return <Alert type="error" message={error} showIcon />;
  }
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
            <span>{movie.nome}</span>
          </div>
          <div>
            <span className="font-medium">Gênero: </span>
            <span>{movie.genero}</span>
          </div>
          <div>
            <span className="font-medium">Ano: </span>
            <span>{movie.ano}</span>
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