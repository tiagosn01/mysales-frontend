import Link from 'next/link'

export default function Landing() {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Main Content */}
      <main className="mx-auto mb-auto flex flex-col p-8">
        {/* Product Presentation */}
        <section className="mb-8 rounded-md bg-white p-8 shadow-md">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            Controle de Vendas e Clientes
          </h1>
          <p className="text-lg text-gray-600">
            Transforme sua gestão de vendas e relacionamento com clientes com
            nossa plataforma.
          </p>
          {/* Sliders de apresentação de produtos aqui */}
        </section>

        {/* Testimonials */}
        <section className="mb-8 rounded-md bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Depoimentos de Clientes
          </h2>
          {/* Sliders de depoimentos aqui */}
        </section>

        {/* About Us */}
        <section className="mb-8 rounded-md bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Quem Somos
          </h2>
          <p className="text-lg text-gray-600">
            Somos uma equipe dedicada a fornecer soluções inovadoras para
            facilitar a gestão de vendas e a satisfação do cliente.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className=" fixed bottom-0 w-full bg-orange-700 p-4">
        <div className="container mx-auto flex items-center justify-between text-white">
          <div>
            <p className="text-sm">
              &copy; 2024 Sellevisio. Todos os Direitos Reservados
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/terms" className="text-white">
              Termos de Serviço
            </Link>
            <Link href="/privacy" className="text-white">
              Política de Privacidade
            </Link>
            <Link href="/contact" className="text-white">
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
