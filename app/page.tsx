"use client"; 

import { useState } from "react"; 
import { Grid, Bell,  ArrowRight, ShoppingCart } from "lucide-react";
import Botao from "./components/ui/botao"; 
import CardBolo from "./components/cards/card-bolo";
import { ProdutoBolo } from "./Types/bolo";
import { formatarPrecoKz } from "./Utils/formatarPreco";

const CATEGORIAS = ["Todos", "Bolos", "Sumos", "", "Donuts"];

const MOCK_POPULARES: ProdutoBolo[] = [
  { id: 1, nome: "Bolo de Chocolate ", preco: 7.500, tag: "Popular" },
  { id: 2, nome: "Pasteis de Atum", preco: 13.90, tag: "Popular" },
];

export default function Home() {

  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const produtosFiltrados = MOCK_POPULARES.filter((item) => {
    if (categoriaAtiva === "Todos") return true;
    
  
    return (
      item.nome.toLowerCase().includes(categoriaAtiva.toLowerCase()) ||
      item.tag?.toLowerCase() === categoriaAtiva.toLowerCase()
    );
  });

  return (
    <div className="min-h-screen bg-white text-black antialiased flex flex-col">
    
      <main className="flex-1 min-h-screen flex flex-col pb-28 lg:pb-16 bg-white">
        
        {/* HEADER: Alinhamento refinado com bordas sutis e efeito glass no mobile */}
        <header className="w-full sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-neutral-100">
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
    <h2 className="font-display text-2xl lg:text-3xl font-light tracking-wide">
      Confeitaria  da <span className="font-sans font-light text-neutral-400 text-lg lg:text-xl">Morena</span>
    </h2>
    
    <div className="flex items-center gap-2 lg:gap-3">
      <button className="p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 rounded-xl transition-all cursor-pointer" aria-label="Carrinho">
        <ShoppingCart className="w-4 h-4 lg:w-5 h-5 text-neutral-700" />
      </button>
    </div>
  </div>
</header>

{/* CONTAINER DA GRID  */}
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
  
  {/* COLUNA ESQUERDA */}
  <div className="lg:col-span-2 flex flex-col gap-8">
    
{/* CATEGORIAS: Adicionado fundo sólido, padding superior e sombra sutil ao grudar */}
<nav className="flex gap-2.5 sticky top-[84px] z-30 bg-white pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none shadow-[0_4px_6px_-1px_rgba(255,255,255,1)]">
  {CATEGORIAS.map((cat, idx) => {
    const isSelected = cat === categoriaAtiva;
    return (
      <button 
        key={idx}
        onClick={() => setCategoriaAtiva(cat)}
        className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all shrink-0 cursor-pointer border ${
          isSelected 
            ? "bg-black text-white border-black font-medium shadow-sm" 
            : "bg-neutral-50 text-neutral-500 border-neutral-200/70 hover:bg-neutral-100 hover:text-black"
        }`}
      >
        {cat}
      </button>
    );
  })}
</nav>



            {/* SEÇÃO CARD DESTAQUE: Transmutado em um banner de alta costura P&B */}
            <section className="bg-neutral-50 border border-neutral-200/60 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-8 relative overflow-hidden group hover:shadow-md hover:border-neutral-300 transition-all duration-300">
              
              <div className="flex flex-col gap-3 justify-center sm:max-w-[55%]">
                <span className="text-[10px] font-medium tracking-widest text-neutral-400 uppercase">Destaque do Dia</span>
                <h3 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-black leading-tight">
                  Bolo de morango
                </h3>
                <span className="text-black font-sans font-normal text-xl lg:text-2xl mt-1 tracking-tight">
                  {formatarPrecoKz(12000)}
                </span>
                <div className="mt-4">
                  <Botao className="w-full sm:w-auto bg-black text-white px-6 py-3.5 text-xs uppercase tracking-widest hover:bg-neutral-900 shadow-sm rounded-xl transition-all duration-200">
                    Adicionar ao carrinho
                  </Botao>
                </div>
              </div>

              {/* Box de Imagem Placeholder Minimalista */}
              <div className="w-full sm:w-44 md:w-52 h-40 sm:h-44 md:h-52 bg-neutral-200/80 rounded-2xl flex items-center justify-center text-xs text-neutral-400 font-light border border-neutral-300/40 shrink-0 group-hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
                <span className="tracking-widest uppercase text-[10px] text-neutral-500">[ Imagem ]</span>
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA: Listagem de Populares (Alimentada pela lista filtrada automaticamente) */}
          <div className="lg:col-span-1 flex flex-col gap-6 w-full">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h4 className="font-display font-light text-xl tracking-wide">Itens populares</h4>
              <button className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 hover:text-black flex items-center gap-1.5 transition-colors cursor-pointer group">
                Veja mais 
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Grid responsiva mudada para consumir 'produtosFiltrados' em vez do mock estático */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {produtosFiltrados.length > 0 ? (
                produtosFiltrados.map((item) => (
                  <div key={item.id} className="transition-transform duration-200 hover:-translate-y-0.5">
                    <CardBolo produto={item} />
                  </div>
                ))
              ) : (
                // Feedback visual sutil se a categoria selecionada estiver vazia
                <p className="text-xs text-neutral-400 font-light italic py-4">
                  Nenhum produto encontrado nesta categoria.
                </p>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* BARRA DE NAVEGAÇÃO MOBILE: Simula experiência de App Premium (Invisível no Desktop) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-black text-white rounded-2xl py-4 px-6 flex items-center justify-around shadow-xl z-50 border border-neutral-800">
        <button className="flex flex-col items-center gap-1 transition-opacity opacity-100" aria-label="Menu">
          <Grid className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[9px] uppercase tracking-widest font-light">Menu</span>
        </button>
        <button className="flex flex-col items-center gap-1 transition-opacity opacity-60 hover:opacity-100" aria-label="Notificações">
          <Bell className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[9px] uppercase tracking-widest font-light">Avisos</span>
        </button>
        <button className="flex flex-col items-center gap-1 transition-opacity opacity-60 hover:opacity-100" aria-label="Sacola">
          <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[9px] uppercase tracking-widest font-light">Sacola</span>
        </button>
      </div>

    </div>
  );
}
