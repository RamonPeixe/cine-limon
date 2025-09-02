import React from "react";
import {
  Card,
  Form,
  Select,
  Input,
  InputNumber,
  Radio,
  Button,
  Tooltip,
} from "antd";
import type { FormProdutoProps, ProdutoFormValues } from "./FormProduto.types";
import {
  PlusCircleOutlined,
  ReloadOutlined,
  LaptopOutlined,
  UsbOutlined,
  PrinterOutlined,
  RocketOutlined,
  BulbOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { palette } from "@/theme/palette";
import { useCurrency } from "@/hooks";

const FormProduto: React.FC<FormProdutoProps> = ({
  secoes,
  marcas,
  onSubmit,
  initialValues,
  loading,
  className,
}) => {
  const [form] = Form.useForm<ProdutoFormValues>();
  const { formatCurrency, parseCurrency } = useCurrency();
  const secaoValue = Form.useWatch("secao", form);

  const iconBubble = (
    node: React.ReactNode,
    color = palette.leaf500,
    bg = "rgba(47,158,68,0.12)"
  ) => (
    <span
      style={{ color, background: bg }}
      className="inline-flex items-center justify-center h-8 w-8 rounded-full"
    >
      {node}
    </span>
  );

  const iconBySecao: Record<string, React.ReactNode> = {
    computadores: iconBubble(<LaptopOutlined />),
    acessorios: iconBubble(<UsbOutlined />),
    impressoras: iconBubble(<PrinterOutlined />),
    games: iconBubble(<RocketOutlined />),
    gadgets: iconBubble(<BulbOutlined />),
  };

  const Title = () => (
    <div className="flex items-center justify-between">
      <span className="font-brandSerif text-lg">Dados do Produto</span>
      <Tooltip
        title={
          secaoValue
            ? `Seção: ${
                secoes.find((s) => s.value === secaoValue)?.label ?? secaoValue
              }`
            : "Selecione a seção"
        }
      >
        {iconBySecao[secaoValue ?? ""] ?? iconBubble(<AppstoreAddOutlined />)}
      </Tooltip>
    </div>
  );

  const handleFinish = async (values: ProdutoFormValues) => {
    await onSubmit(values);
    form.resetFields();
    form.setFieldsValue({ condicao: "novo" });
  };

  return (
    <div className={className}>
      <Card
        title={<Title />}
        className="rounded-xl ring-1 ring-[#E8E6DB] shadow-[0_12px_32px_rgba(20,32,34,0.06)] hover:shadow-[0_16px_48px_rgba(20,32,34,0.10)] transition-shadow"
        styles={{
          header: { background: "#FFFDF6", borderBottom: "1px solid #EEEBDD" },
          body: { background: palette.card },
        }}
      >
        <Form
          className="limon-form"
          layout="vertical"
          form={form}
          initialValues={{ condicao: "novo", ...initialValues }}
          onFinish={handleFinish}
          requiredMark={true}
        >
          <Form.Item
            label="Seção"
            name="secao"
            rules={[{ required: true, message: "Selecione uma seção." }]}
          >
            <Select
              placeholder="Selecione"
              options={secoes}
              showSearch
              optionFilterProp="label"
              filterOption={(i, o) =>
                (o?.label as string).toLowerCase().includes(i.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            label="Marca"
            name="marca"
            rules={[{ required: true, message: "Selecione uma marca." }]}
          >
            <Select
              placeholder="Selecione"
              options={marcas}
              showSearch
              optionFilterProp="label"
              filterOption={(i, o) =>
                (o?.label as string).toLowerCase().includes(i.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            label="Nome"
            name="nome"
            rules={[
              { required: true, message: "Informe o nome do produto." },
              {
                min: 2,
                message: "O nome do produto deve ter no mínimo 2 caracteres.",
              },
            ]}
          >
            <Input placeholder="Ex.: Notebook XYZ 15”" allowClear />
          </Form.Item>

          <Form.Item
            label="Preço (R$)"
            name="preco"
            rules={[
              { required: true, message: "Informe o preço." },
              {
                validator: async (_, value) => {
                  const n = Number(value);
                  if (!Number.isFinite(n) || n <= 0) {
                    return Promise.reject("O preço deve ser maior que 0.");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0.01}
              step={0.01}
              placeholder="0,00"
              formatter={formatCurrency}
              parser={parseCurrency}
            />
          </Form.Item>

          <Form.Item label="Condição" name="condicao">
            <Radio.Group>
              <Radio value="novo">Novo</Radio>
              <Radio value="usado">Usado</Radio>
            </Radio.Group>
          </Form.Item>

          <div className="mt-2 flex items-center gap-3">
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusCircleOutlined />}
              loading={!!loading}
            >
              Inserir Produto
            </Button>
            <Button
              htmlType="button"
              icon={<ReloadOutlined />}
              onClick={() => {
                form.resetFields();
                form.setFieldsValue({ condicao: "novo" });
              }}
            >
              Limpar
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default FormProduto;
