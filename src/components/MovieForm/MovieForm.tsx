import { Form, Input, InputNumber, Button } from "antd";
import type { Movie } from "@/types/Movie";
import { ReactNode } from "react";

export interface MovieFormProps {
  initialValues?: Partial<Movie>;
  onFinish: (values: Partial<Movie>) => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  children?: ReactNode;
}

export function MovieForm({
  initialValues = {},
  onFinish,
  onCancel,
  submitText = "Salvar",
  cancelText = "Cancelar",
  loading = false,
  children,
}: MovieFormProps) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
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
      {children}
      <Form.Item>
        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button onClick={onCancel} disabled={loading}>
              {cancelText}
            </Button>
          )}
          <Button type="primary" htmlType="submit" loading={loading}>
            {submitText}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
