export function formatarPrecoKz(valor: number): string {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0, 
  }).format(valor);
}

console.log(formatarPrecoKz(100000)); 
