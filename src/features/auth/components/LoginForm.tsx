import { useState } from 'react'
import { useNavigate } from 'react-router'
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

// Schema de validação para o login
const loginSchema = z.object({
  username: z.string().min(1, { message: 'O username é obrigatório' }),
  senha: z.string().min(1, { message: 'A senha é obrigatória' }),
})

// Tipo para o form
type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const [loginError, setLoginError] = useState('')

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      senha: '',
    },
  })

  // Função para lidar com o envio do formulário de login
  const onSubmit = async (data: LoginFormValues) => {
    setLoginError('')

    try {
      await login(data.username, data.senha)
      navigate('/')
    } catch (error) {
      setLoginError(
        error instanceof Error
          ? error.message
          : 'Erro ao fazer login. Verifique suas credenciais.'
      )
    }
  }

  return (
    <>
      {loginError && (
        <Alert variant="destructive" className="mb-4">
          <TriangleAlert className="h-4 w-4" />
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Seu username" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input type="password" placeholder="Sua senha" {...field} />
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
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Form>
    </>
  )
}
