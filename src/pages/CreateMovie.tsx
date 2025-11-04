import { useNavigate } from "react-router-dom";
import { useCreateMovie } from "@/hooks/useCreateMovie";
import type { Movie } from "@/types/Movie";
import { Card, message } from "antd";
import { MovieForm } from "@/components/MovieForm";

export default function CreateMovie() {
  const navigate = useNavigate();

  const { createMovie, loading } = useCreateMovie();
  const onFinish = async (values: Partial<Movie>) => {
    try {
      await createMovie(values as Omit<Movie, "id">);
      message.success("Filme criado com sucesso!");
      navigate("/");
    } catch {
      message.error("Erro ao criar filme");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-leaf-700">Criar Novo Filme</h1>
      <Card>
        <MovieForm
          onFinish={onFinish}
          onCancel={() => navigate("/")}
          submitText="Criar"
          loading={loading}
        />
      </Card>
    </div>
  );
}