import { Form, Input, Button } from "antd";
import type { MovieFormProps } from "./MovieForm.type";

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
        name="nome"
        label="Nome"
        rules={[{ required: true, message: "Por favor, insira o nome do filme" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="genero"
        label="Gênero"
        rules={[{ required: true, message: "Por favor, insira o gênero" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ano"
        label="Ano"
        rules={[
          { required: true, message: "Por favor, insira o ano" },
          { pattern: /^\d+$/, message: "O ano deve conter apenas números" },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              const num = Number(value);
              if (num >= 1895 && num <= 2050) return Promise.resolve();
              return Promise.reject(new Error("O ano deve estar entre 1895 e 2050"));
            }
          }
        ]}
      >
        <Input maxLength={4} inputMode="numeric" />
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
