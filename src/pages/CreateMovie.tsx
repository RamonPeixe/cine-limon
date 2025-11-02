import { useNavigate } from "react-router-dom";
import { MovieService } from "@/services/MovieService";
import type { Movie } from "@/types/Movie";
import { Form, Input, InputNumber, Button, Card, message } from "antd";

export default function CreateMovie() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: Omit<Movie, "id">) => {
    try {
      await MovieService.create(values);
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
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="max-w-2xl"
        >
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: "Por favor, insira o nome do filme" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="genre"
            label="Gênero"
            rules={[{ required: true, message: "Por favor, insira o gênero" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="releaseYear"
            label="Ano"
            rules={[{ required: true, message: "Por favor, insira o ano" }]}
          >
            <InputNumber min={1888} max={2025} />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-3">
              <Button onClick={() => navigate("/")}>Cancelar</Button>
              <Button type="primary" htmlType="submit">
                Criar
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}