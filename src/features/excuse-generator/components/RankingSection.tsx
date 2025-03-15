import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Star } from 'lucide-react'
import { obterRanking, votarDesculpa } from '@/services/excuseService'
import { Desculpa } from '@/types/api'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function RankingSection() {
  const [ranking, setRanking] = useState<Desculpa[]>([])
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const desculpas = await obterRanking(3)
        setRanking(desculpas)
      } catch (error) {
        toast.error('Erro ao carregar ranking', {
          description: `${(error as Error).message}`,
        })
      }
    }
    fetchRanking()
  }, [])

  const handleVotar = async (id: string) => {
    if (!isAuthenticated) {
      toast.error('Faça login para votar')
      return
    }

    try {
      const { liked, contadorVotos } = await votarDesculpa(id)

      setRanking((current) =>
        current.map((desculpa) =>
          desculpa.id === id
            ? { ...desculpa, votadaPeloUsuario: liked, contadorVotos }
            : desculpa
        )
      )
    } catch (error) {
      toast.error('Erro ao votar', {
        description: `${(error as Error).message}`,
      })
    }
  }

  return (
    <section className="mt-16">
      <h2
        className="font-poppins
       text-2xl mb-6 flex items-center space-x-2"
      >
        <Star className="text-purple-primary" />
        <span>Top Desculpas</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ranking.map((desculpa) => (
          <Card
            key={desculpa.id}
            className="gap-2 hover:border-purple-200 hover:bg-purple-50/30 transition-colors"
          >
            <CardContent>
              <p className="mb-4 max-h-[168px] overflow-hidden text-ellipsis">
                {desculpa.texto}
              </p>
            </CardContent>
            <CardFooter className="mt-auto flex justify-between items-center text-sm">
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-dark">{desculpa.categoria}</Badge>
              </div>
              <button
                onClick={() => handleVotar(desculpa.id)}
                className="flex items-center space-x-1 cursor-pointer"
              >
                <Heart
                  className={cn(
                    `w-5 h-5`,
                    desculpa.votadaPeloUsuario
                      ? 'text-purple-primary fill-current'
                      : 'text-gray-medium'
                  )}
                />
                <span>{desculpa.contadorVotos}</span>
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
