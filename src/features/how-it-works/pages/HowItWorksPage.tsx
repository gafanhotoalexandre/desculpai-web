import { useNavigate } from 'react-router'
import { Shield, Clock, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const CATEGORIES = ['trabalho', 'estudos', 'encontros', 'família', 'eventos']

const BENEFITS = [
  {
    title: 'Personalização',
    description: 'Desculpas adaptadas ao seu contexto específico.',
    icon: <Shield className="w-8 h-8" />,
  },
  {
    title: 'Rapidez',
    description: 'Gere desculpas em segundos para qualquer situação.',
    icon: <Clock className="w-8 h-8" />,
  },
  {
    title: 'Confidencialidade',
    description: 'Suas informações são processadas com total privacidade.',
    icon: <User className="w-8 h-8" />,
  },
]

export function HowItWorksPage() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto py-10 md:py-16">
        <h1 className="text-2xl md:text-4xl mb-4 font-poppins font-semibold">
          Como funciona o desculp
          <span className="text-purple-primary">.ai</span>
        </h1>
        <p className="text-base md:text-lg text-gray-medium mb-8 px-4">
          Gere pedidos de desculpa convincentes e personalizadas com IA para
          qualquer situação. É simples, rápido e eficiente!
        </p>
      </section>

      {/* Steps Section */}
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* 1: Category Selection */}
        <Card className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-light text-purple-primary rounded-full flex items-center justify-center font-bold text-lg md:text-xl">
              1
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="font-poppins font-semibold text-lg md:text-xl mb-2">
                Escolha uma categoria
              </h2>
              <p className="text-sm md:text-base text-gray-medium mb-4 md:mb-0">
                Selecione a categoria que melhor descreve sua situação. Cada
                contexto requer uma abordagem única.
              </p>
            </div>
            <div className="w-full md:w-64">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* 2: Context Description */}
        <Card className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-light text-purple-primary rounded-full flex items-center justify-center font-bold text-lg md:text-xl">
              2
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="font-poppins font-semibold text-lg md:text-xl mb-2">
                Descreva o contexto
              </h2>
              <p className="text-sm md:text-base text-gray-medium mb-4 md:mb-0">
                Forneça detalhes sobre a situação. Quanto mais específico, mais
                personalizada será sua desculpa.
              </p>
            </div>
            <div className="w-full md:w-64">
              <Textarea
                placeholder="Descreva brevemente a situação..."
                className="resize-none"
                maxLength={500}
              />
            </div>
          </div>
        </Card>

        {/* Explanation of AI Process */}
        <section className="bg-gray-50 rounded-lg p-6 md:p-8 text-center">
          <h2 className="font-poppins font-semibold text-xl md:text-2xl mb-4">
            Como nossa <span className="text-purple-primary">IA</span> funciona
          </h2>
          <p className="text-sm md:text-base text-gray-medium max-w-2xl mx-auto">
            Utilizamos processamento de linguagem natural avançado para analisar
            seu contexto e gerar uma desculpa personalizada. Nossa IA considera
            nuances, tom e especificidades da sua situação para criar uma
            resposta única e convincente.
          </p>
        </section>

        {/* Benefits Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {BENEFITS.map((benefit, index) => (
            <Card key={index} className="p-4 md:p-6 text-center gap-0">
              <CardHeader>
                <div className="bg-purple-light rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4 text-purple-primary">
                  {benefit.icon}
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <h3 className="font-poppins font-semibold text-base md:text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm md:text-base text-gray-medium">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* CTA Section */}
        <section className="text-center bg-purple-light rounded-lg p-6 md:p-10">
          <h2 className="font-poppins font-semibold text-xl md:text-2xl mb-4">
            Pronto para gerar sua desculpa?
          </h2>
          <p className="text-sm md:text-base text-gray-medium max-w-2xl mx-auto mb-6">
            Experimente agora mesmo e descubra como é fácil criar desculpas
            convincentes para qualquer situação.
          </p>
          <Button
            className="bg-purple-primary hover:bg-purple-dark text-white px-6 py-2 md:px-8 md:py-3"
            onClick={() => navigate('/')}
          >
            Começar Agora
          </Button>
        </section>
      </div>
    </div>
  )
}
