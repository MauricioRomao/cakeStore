# CakeStore

Este é um projeto de um site para encomendas de bolos desenvolvido com [Next.js](https://nextjs.org) (App Router), TypeScript e Tailwind CSS.

O objetivo do sistema é permitir que os clientes vejam o catálogo de bolos, adicionem produtos ao carrinho e façam os seus pedidos de forma organizada.

## 📁 Estrutura de Pastas

A organização do código foi dividida da seguinte forma para separar o visual da lógica:

```text
src/
├── app/                        
│   ├── layout.tsx              
│   ├── page.tsx                 
│   └── encomendas/             
│
├── components/                  
│   ├── ui/                      
│   ├── cards/                  
│   └── layout/                 
│
├── hooks/                       
├── services/                   
├── types/                      
└── utils/                       
```

## 🛠️ Tecnologias Utilizadas

* **Next.js** (Framework React)
* **TypeScript** (Tipagem estática)
* **Tailwind CSS** (Estilização visual)
* **Zustand** (Controlo do estado do carrinho)

## 🚀 Como Executar o Projeto

Para rodar este projeto localmente na sua máquina, siga os passos abaixo:

1. Clone o repositório:
```bash
git clone https://github.com/MauricioRomao/cakeStore
```

2. Acesse a pasta:
```bash
cd cakeStore
```

3. Instale todas as dependências necessárias:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

 [http://localhost:3000](http://localhost:3000)
