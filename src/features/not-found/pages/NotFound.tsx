import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Construction } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <Construction size={64} className="mx-auto text-purple-primary mb-6" />

        <h1 className="text-4xl font-bold text-gray-900 mb-3 font-poppins">
          Oops!
        </h1>

        <div className="mb-6">
          <p className="text-xl text-gray-700 mb-2">Página não encontrada</p>
          <p className="text-gray-600">
            Esta página ainda não foi implementada ou o conteúdo que você
            procura não existe.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            desculp<span className="text-purple-primary">.ai</span> está em
            desenvolvimento
          </p>

          <Button asChild className="inline-flex items-center gap-2">
            <Link to="/">
              <ArrowLeft size={16} />
              Voltar para página inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
