
import { ProdutoBolo } from "../../Types/bolo";
import { formatarPrecoKz } from "../../Utils/formatarPreco";
import Botao from "../../components/ui/botao";

interface CardBoloProps {
  produto: ProdutoBolo;
}

export default function CardBolo({ produto }: CardBoloProps) {
  return (
    <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl p-4 flex flex-col lg:flex-row gap-4 items-start lg:items-center transition-all hover:border-neutral-400">
      <div className="w-full lg:w-20 lg:h-20 aspect-square bg-neutral-200 rounded-xl flex items-center justify-center text-[10px] text-neutral-400 font-light shrink-0">
        [Foto]
      </div>
      <div className="flex-1 w-full flex flex-col justify-between h-full gap-1">
        <div>
          {produto.tag && (
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
              {produto.tag}
            </span>
          )}
          <h5 className="font-sans font-light text-sm text-black line-clamp-1">{produto.nome}</h5>
        </div>
        <div className="flex items-center justify-between mt-2 lg:mt-0">
          <span className="text-sm font-medium text-neutral-950">{formatarPrecoKz(produto.preco)}</span>
          <Botao variant="outline" className="px-2 py-1 py-0.5 rounded-lg font-medium">
            +
          </Botao>
        </div>
      </div>
    </div>
  );
}
