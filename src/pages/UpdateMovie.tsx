import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieService } from "@/services/MovieService";
import type { Movie } from "@/types/Movie";
import { Card, Button, InputNumber, Form, message } from "antd";
import { MovieForm } from "@/components/MovieForm";

export default function UpdateMovie() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [movieId, setMovieId] = useState<number | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isSearching, setIsSearching] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const searchMovie = async (id: number) => {
    try {
      const data = await MovieService.getById(id);
      if (data) {
        setMovie(data);
        form.setFieldsValue(data);
        setIsSearching(false);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch {
      message.error("Erro ao buscar filme");
    }
  };

  const onFinish = async (values: Partial<Movie>) => {
    try {
      if (movieId) {
        await MovieService.update(movieId, values);
        message.success("Filme atualizado com sucesso!");
        navigate("/");
      }
    } catch {
      message.error("Erro ao atualizar filme");
    }
  };

  if (notFound) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-leaf-700">Alterar Filme</h1>
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
        <h1 className="text-3xl font-bold text-leaf-700">Alterar Filme</h1>
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-leaf-700">Alterar Filme</h1>
      <Card>
        <MovieForm
          initialValues={movie || {}}
          onFinish={onFinish}
          onCancel={() => navigate("/")}
          submitText="Alterar"
        />
      </Card>
    </div>
  );
}