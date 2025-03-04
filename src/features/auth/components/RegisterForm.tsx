import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { TriangleAlert } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'

// Schema de validação para o registro
const registerSchema = z
  .object({
    nomeBase: z.string().min(3, {
      message: 'O nome deve ter pelo menos 3 caracteres',
    }),
    senha: z.string().min(4, {
      message: 'A senha deve ter pelo menos 4 caracteres',
    }),
    confirmSenha: z.string().min(1, {
      message: 'Confirme sua senha',
    }),
  })
  .refine((data) => data.senha === data.confirmSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmSenha'],
  })

// Tipo para o form
type RegisterFormValues = z.infer<typeof registerSchema>

// Props para o componente
interface RegisterFormProps {
  onRegistrationSuccess: () => void
}

export function RegisterForm({ onRegistrationSuccess }: RegisterFormProps) {
  const { register, isLoading } = useAuthStore()
  const [registerError, setRegisterError] = useState('')

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nomeBase: '',
      senha: '',
      confirmSenha: '',
    },
  })

  // Função para lidar com o envio do formulário de registro
  const onSubmit = async (data: RegisterFormValues) => {
    setRegisterError('')

    try {
      await register(data.nomeBase, data.senha)
      onRegistrationSuccess()
    } catch (error) {
      setRegisterError(
        error instanceof Error
          ? error.message
          : 'Erro ao criar conta. Tente novamente.'
      )
    }
  }

  return (
    <>
      {registerError && (
        <Alert variant="destructive" className="mb-4">
          <TriangleAlert className="h-4 w-4" />
          <AlertDescription>{registerError}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nomeBase"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Escolha um nome de usuário" {...field} />
                </FormControl>
                <FormMessage />
                <p className="text-sm text-gray-medium">
                  Um sufixo único será adicionado automaticamente
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="senha"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Crie uma senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmSenha"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-purple-primary hover:bg-purple-dark"
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>
      </Form>
    </>
  )
}
