import logo from "@/assets/images/logo.png";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-header border-b-2 border-border shadow-[0_2px_0_rgba(0,0,0,0.03)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-5 lg:py-7 min-h-[96px] lg:min-h-[120px]">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Logo Cine Limon"
              className="h-16 w-16 lg:h-20 lg:w-20 rounded-full ring-1 ring-divider shadow-sm"
            />
            <div className="leading-tight">
              <span className="block text-leaf-700 font-brandSans font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl">
                Cine Limon
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button 
              onClick={() => navigate("/")}
              className="text-lg font-medium text-green-600 hover:text-green-400 bg-transparent border-green-200 hover:border-green-400 transition-all"
            >
              Início
            </Button>
            <Button 
              onClick={() => navigate("/create")}
              className="text-lg font-medium text-green-600 hover:text-green-400 bg-transparent border-green-200 hover:border-green-400 transition-all"
            >
              Criar
            </Button>
            <Button 
              onClick={() => navigate("/update")}
              className="text-lg font-medium text-green-600 hover:text-green-400 bg-transparent border-green-200 hover:border-green-400 transition-all"
            >
              Alterar
            </Button>
            <Button 
              onClick={() => navigate("/delete")}
              className="text-lg font-medium text-green-600 hover:text-green-400 bg-transparent border-green-200 hover:border-green-400 transition-all"
            >
              Apagar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
