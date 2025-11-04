import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import type { NotFoundMessageProps } from "./NotFoundMessage.type";

export function NotFoundMessage({
  message = "Filme não encontrado",
  buttonText = "Voltar"
}: NotFoundMessageProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-leaf-700 mb-6 text-center">
        {message}
      </h2>
      <Button type="primary" onClick={() => navigate("/")} className="bg-green-600">
        {buttonText}
      </Button>
    </div>
  );
}
