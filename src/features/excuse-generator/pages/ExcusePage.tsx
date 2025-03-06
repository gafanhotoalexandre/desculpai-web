import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { HeroSection } from '../components/HeroSection'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Check, ClipboardCopy, Edit, Save } from 'lucide-react'
import { gerarDesculpa, salvarDesculpa } from '@/services/excuseService'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { Categoria } from '@/types/api'
import { toast } from 'sonner'
import { RankingSection } from '../components/RankingSection'
import { Badge } from '@/components/ui/badge'

// Zod schema for form validation
const excuseFormSchema = z.object({
  categoria: z.enum(
    ['trabalho', 'estudos', 'encontros', 'família', 'eventos'],
    {
      required_error: 'Selecione uma categoria',
    }
  ),
  contexto: z
    .string()
    .min(10, {
      message: 'O contexto deve ter pelo menos 10 caracteres',
    })
    .max(500, {
      message: 'O contexto não pode exceder 500 caracteres',
    }),
})

// Infer the type of form values from the schema
type ExcuseFormValues = z.infer<typeof excuseFormSchema>

export function ExcusePage() {
  const [desculpaGerada, setDesculpaGerada] = useState('')
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    string | null
  >(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { isAuthenticated } = useAuthStore()

  // Initialize the form with react-hook-form
  const form = useForm<ExcuseFormValues>({
    resolver: zodResolver(excuseFormSchema),
    defaultValues: {
      categoria: undefined,
      contexto: '',
    },
  })

  // Função para resetar todos os campos
  const resetarTudo = () => {
    // Resetar o formulário
    form.reset({
      categoria: undefined,
      contexto: '',
    })

    // Limpar o resultado
    setDesculpaGerada('')
    setCategoriaSelecionada(null)
    setIsEditing(false)
  }

  const handleGerarDesculpa = async (data: ExcuseFormValues) => {
    try {
      const texto = await gerarDesculpa(data.categoria, data.contexto)
      setDesculpaGerada(texto)
      setCategoriaSelecionada(data.categoria)
      setIsEditing(false)
    } catch (error) {
      toast.error('Erro ao gerar desculpa', {
        description: (error as Error).message,
      })
    }
  }

  const handleSalvarDesculpa = async () => {
    if (!isAuthenticated) {
      toast.error('Faça login para salvar a desculpa')
      return
    }

    const currentValues = form.getValues()

    try {
      await salvarDesculpa(
        currentValues.categoria,
        currentValues.contexto,
        desculpaGerada
      )
      toast.success('Desculpa salva com sucesso!')

      // Resetar todos os campos após salvar com sucesso
      resetarTudo()
    } catch (error) {
      toast.error('Erro ao salvar desculpa', {
        description: (error as Error).message,
      })
    }
  }

  const handleCopyExcuse = () => {
    navigator.clipboard.writeText(desculpaGerada)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1500)
  }

  const handleEditExcuse = () => {
    setIsEditing(true)
  }

  const categorias: Categoria[] = [
    'trabalho',
    'estudos',
    'encontros',
    'família',
    'eventos',
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="text-gray-dark">
          <CardHeader>
            <CardTitle className="font-poppins">Gerar Desculpa</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleGerarDesculpa)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categorias.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contexto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contexto da Situação</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva brevemente a situação..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-purple-primary hover:bg-purple-dark transition"
                >
                  Gerar Desculpa
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="text-gray-dark">
          <CardHeader>
            <CardTitle className="font-poppins">Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={desculpaGerada}
                onChange={(e) => setDesculpaGerada(e.target.value)}
                placeholder="Edite sua desculpa"
                className="mb-4"
              />
            ) : (
              <Textarea
                value={desculpaGerada}
                readOnly
                placeholder="Sua desculpa aparecerá aqui"
                className="mb-4"
              />
            )}
          </CardContent>

          <CardFooter className="mt-auto justify-between items-center">
            <div className="flex items-center space-x-3 text-sm text-gray-medium">
              {categoriaSelecionada && (
                <>
                  <Badge className="bg-purple-dark font-bold px-2 py-1 rounded-md">
                    {categoriaSelecionada.charAt(0).toUpperCase() +
                      categoriaSelecionada.slice(1)}
                  </Badge>
                  <span>Gerado agora</span>
                </>
              )}
            </div>

            <div className="flex space-x-2">
              {!isEditing && (
                <Button
                  variant="secondary"
                  onClick={handleEditExcuse}
                  disabled={!desculpaGerada}
                  className="flex items-center gap-2"
                >
                  <Edit size={16} /> Editar
                </Button>
              )}

              <Button
                variant="secondary"
                onClick={handleCopyExcuse}
                disabled={!desculpaGerada}
                className="flex items-center gap-2"
              >
                {isCopied ? (
                  <>
                    <Check size={16} className="text-green-500" /> Copiado
                  </>
                ) : (
                  <>
                    <ClipboardCopy size={16} /> Copiar
                  </>
                )}
              </Button>

              <Button
                className="bg-purple-primary hover:bg-purple-dark flex items-center gap-2"
                onClick={handleSalvarDesculpa}
                disabled={!desculpaGerada}
              >
                <Save size={16} /> Salvar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <RankingSection />
    </div>
  )
}
