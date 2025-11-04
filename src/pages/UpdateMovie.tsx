import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovie } from "@/hooks/useMovie";
import { useUpdateMovie } from "@/hooks/useUpdateMovie";
import type { Movie } from "@/types/Movie";
import { Card, Button, InputNumber, Form, message } from "antd";
import { NotFoundMessage } from "@/components/NotFoundMessage";
import { MovieForm } from "@/components/MovieForm";

export default function UpdateMovie() {
  const navigate = useNavigate();
  const [movieId, setMovieId] = useState<string>("");
  const [searching, setSearching] = useState(true);
  const { movie, loading: loadingMovie, error } = useMovie(searching ? undefined : movieId);
  const { updateMovie, loading: updating } = useUpdateMovie();

  const onFinish = async (values: Partial<Movie>) => {
    try {
      if (movieId) {
        await updateMovie(movieId, values);
        message.success("Filme atualizado com sucesso!");
        navigate("/");
      }
    } catch {
      message.error("Erro ao atualizar filme");
    }
  };


  if (searching) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-leaf-700">Alterar Filme</h1>
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
      <h1 className="text-3xl font-bold text-leaf-700">Alterar Filme</h1>
      <Card>
        <MovieForm
          initialValues={movie}
          onFinish={onFinish}
          onCancel={() => navigate("/")}
          submitText="Alterar"
          loading={updating}
        />
      </Card>
    </div>
  );
}