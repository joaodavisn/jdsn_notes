"use client"
import Title from "./components/Title";
import CheckBox from "./components/CheckBox";
import { useState } from "react";
export default function Home() {

  const [rememberMe, setRememberMe] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24 bg-[#1C1C1C]">
      <Title />
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-t-2xl bg-[#6A6A6A] w-56 h-fit relative px-3 py-2">
          <p className="text-[#F1F1F1] text-left text-xl font-bold">
            Login
          </p>
        </div>
        <div className="rounded-b-2xl bg-[#2B2B2B] w-56 h-fit relative px-3 py-4 gap-4 flex flex-col">
          <input type="text" placeholder="Código" className="w-full bg-[#2B2B2B] border-[1px] rounded-xl p-2 border-[#6A6A6A] text-[#F1F1F1] text-lg" />
          <CheckBox label="Lembre-se de mim" checked={rememberMe} onCheck={() => setRememberMe(!rememberMe)} />
          <button className="bg-[#00A3FF] hover:bg-[#0082CB] text-[#F1F1F1] text-lg font-bold rounded-full p-2">Entrar</button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-[#F1F1F1] font-normal">Não tem um código? </p><a href="./register" className="text-[#00A3FF] hover:text-[#0082CB] font-bold">Crie um</a>
      </div>
    </main>
  );
}
