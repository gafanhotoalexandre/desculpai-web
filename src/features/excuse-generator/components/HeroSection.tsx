import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="text-center max-w-3xl mx-auto py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl mb-4 font-poppins font-semibold">
        Nunca mais fique sem{' '}
        <span className="text-purple-primary">desculpas</span>
      </h1>
      <p className="text-gray-medium text-lg mb-8">
        Gere pedidos de desculpa convincentes e personalizadas com IA para
        qualquer situação. Digite o contexto, escolha a categoria e pronto!
      </p>
      <Button
        onClick={() =>
          document.getElementById('generator-section')?.scrollIntoView()
        }
        id="generator-section"
        className="px-6 py-6 rounded-md font-inter font-medium transition-colors duration-200 cursor-pointer bg-purple-primary text-white hover:bg-purple-dark text-lg"
      >
        Gerar Minha Desculpa
      </Button>
    </section>
  )
}
