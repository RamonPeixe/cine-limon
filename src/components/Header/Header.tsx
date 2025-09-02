import logo from "@/assets/images/logo-2.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-header border-b-2 border-border shadow-[0_2px_0_rgba(0,0,0,0.03)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-5 lg:py-7 min-h-[96px] lg:min-h-[120px]">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Logo Limon"
              className="h-16 w-16 lg:h-20 lg:w-20 rounded-full ring-1 ring-divider shadow-sm"
            />
            <div className="leading-tight">
              <span className="block text-leaf-700 font-brandSans font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl">
                limon
              </span>
              <span className="block -mt-1 text-leaf-500 font-brandSerif font-semibold text-lg md:text-xl lg:text-2xl">
                informática
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3" />
        </div>
      </div>
    </header>
  );
}
