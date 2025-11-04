import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovie } from "@/hooks/useMovie";
import { useDeleteMovie } from "@/hooks/useDeleteMovie";
import { Form, InputNumber, Button, Card, Popconfirm, message } from "antd";
import { NotFoundMessage } from "@/components/NotFoundMessage";

export default function DeleteMovie() {
  const navigate = useNavigate();
  const [movieId, setMovieId] = useState<string>("");
  const [searching, setSearching] = useState(true);
  const { movie, loading: loadingMovie, error } = useMovie(searching ? undefined : movieId);
  const { deleteMovie, loading: deleting } = useDeleteMovie();

  const handleDelete = async () => {
    try {
      if (movieId) {
        await deleteMovie(movieId);
        message.success("Filme excluído com sucesso!");
        navigate("/");
      }
    } catch {
      message.error("Erro ao excluir filme");
    }
  };

  if (searching) {
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
                value={movieId ? Number(movieId) : undefined}
                onChange={(value) => setMovieId(value ? String(value) : "")}
              />
            </Form.Item>
            <Form.Item>
              <div className="flex gap-3">
                <Button onClick={() => navigate("/")}>Cancelar</Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    if (movieId) setSearching(false);
                  }}
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

  if (loadingMovie) {
    return <div className="p-8"><span>Carregando...</span></div>;
  }
  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }
  if (!movie) {
    return <NotFoundMessage />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-leaf-700">Apagar Filme</h1>
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
        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={() => navigate("/")}>Cancelar</Button>
          <Popconfirm
            title="Apagar filme"
            description="Tem certeza que deseja apagar este filme?"
            onConfirm={handleDelete}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="primary" danger loading={deleting}>
              Apagar
            </Button>
          </Popconfirm>
        </div>
      </Card>
    </div>
  );
}