import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieService } from "@/services/MovieService";
import type { Movie } from "@/types/Movie";
import { Form, InputNumber, Button, Card, Descriptions, Popconfirm, message } from "antd";

export default function DeleteMovie() {
  const navigate = useNavigate();
  const [movieId, setMovieId] = useState<number | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isSearching, setIsSearching] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const searchMovie = async (id: number) => {
    try {
      const data = await MovieService.getById(id);
      if (data) {
        setMovie(data);
        setIsSearching(false);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch {
      message.error("Erro ao buscar filme");
    }
  };

  const handleDelete = async () => {
    try {
      if (movieId) {
        await MovieService.delete(movieId);
        message.success("Filme excluído com sucesso!");
        navigate("/");
      }
    } catch {
      message.error("Erro ao excluir filme");
    }
  };

  if (notFound) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-leaf-700">Apagar Filme</h1>
        <Card>
          <div className="text-center">
            <p className="text-lg mb-4">Filme não encontrado</p>
            <Button onClick={() => navigate("/")}>Voltar para Início</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-leaf-700">Apagar Filme</h1>
        <Card>
          <Form layout="vertical" className="max-w-sm">
            <Form.Item
              label="ID do Filme"
              rules={[{ required: true, message: "Por favor, insira o ID" }]}
            >
              <InputNumber
                min={1}
                value={movieId}
                onChange={(value) => setMovieId(value)}
              />
            </Form.Item>
            <Form.Item>
              <div className="flex gap-3">
                <Button onClick={() => navigate("/")}>Cancelar</Button>
                <Button
                  type="primary"
                  onClick={() => movieId && searchMovie(movieId)}
                  danger
                >
                  Procurar
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-leaf-700">Apagar Filme</h1>
      <Card>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="ID">{movie.id}</Descriptions.Item>
          <Descriptions.Item label="Nome">{movie.name}</Descriptions.Item>
          <Descriptions.Item label="Diretor">{movie.director}</Descriptions.Item>
          <Descriptions.Item label="Ano de Lançamento">{movie.releaseYear}</Descriptions.Item>
          <Descriptions.Item label="Duração">{movie.duration} minutos</Descriptions.Item>
          <Descriptions.Item label="Gênero">{movie.genre}</Descriptions.Item>
          <Descriptions.Item label="Avaliação">{movie.rating}/5</Descriptions.Item>
          <Descriptions.Item label="Descrição" span={3}>
            {movie.description}
          </Descriptions.Item>
        </Descriptions>

        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={() => navigate("/")}>Cancelar</Button>
          <Popconfirm
            title="Apagar filme"
            description="Tem certeza que deseja apagar este filme?"
            onConfirm={handleDelete}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="primary" danger>
              Apagar
            </Button>
          </Popconfirm>
        </div>
      </Card>
    </div>
  );
}