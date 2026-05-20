import Button from "./components/ui/botao"
const NotFound = () => {

  return (
    <main className="flex-col items-center justify-center w-full h-full mt-[25%]">
      <section className="text-center">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="font-Fraunces text-xl mt-4 p-[10px]">
          Oops! A página não existe ou foi removida.
        </p>
      </section>
    </main>
  )
}

export default NotFound