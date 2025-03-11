import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Categoria } from '@/types/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useExcuseStore } from '../stores/excuseStore'
import { Loader2 } from 'lucide-react'

// Zod schema para validação do formulário
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

// Inferindo o tipo do formulário a partir do schema
export type ExcuseFormValues = z.infer<typeof excuseFormSchema>

export function ExcuseForm() {
  const {
    categoriaSelecionada,
    contextoInserido,
    handleGerarDesculpa,
    shouldResetForm,
    setShoulResetForm,
  } = useExcuseStore()
  const [isLoading, setIsLoading] = useState(false)

  // Inicializar o formulário
  const form = useForm<ExcuseFormValues>({
    resolver: zodResolver(excuseFormSchema),
    defaultValues: {
      categoria: categoriaSelecionada || undefined,
      contexto: contextoInserido || '',
    },
  })

  // Resetar form
  useEffect(() => {
    if (!shouldResetForm) return

    form.reset({
      categoria: undefined,
      contexto: '',
    })

    setShoulResetForm(false)
  }, [shouldResetForm, form, setShoulResetForm])

  const onSubmit = async (data: ExcuseFormValues) => {
    try {
      setIsLoading(true)
      await handleGerarDesculpa(data.categoria, data.contexto)
    } catch (error) {
      console.error('Erro ao gerar desculpa:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const categorias: Categoria[] = [
    'trabalho',
    'estudos',
    'encontros',
    'família',
    'eventos',
  ]

  return (
    <Card className="text-gray-dark">
      <CardHeader>
        <CardTitle className="font-poppins">Gerar Desculpa</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
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
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer bg-purple-primary hover:bg-purple-dark transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Gerando...
                </>
              ) : (
                'Gerar Desculpa'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
