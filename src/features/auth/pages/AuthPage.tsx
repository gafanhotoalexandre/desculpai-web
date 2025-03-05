import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useAuthStore } from '../stores/authStore'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'
import { UsernameDialog } from '../components/UsernameDialog'

export function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthStore()

  // Pega o valor da tab a partir da URL (se existir)
  const getTabFromUrl = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('tab') === 'register' ? 'register' : 'login'
  }

  const [activeTab, setActiveTab] = useState(getTabFromUrl())
  const [showUsernameDialog, setShowUsernameDialog] = useState(false)
  const [generatedUsername, setGeneratedUsername] = useState('')
  const [justRegistered, setJustRegistered] = useState(false)

  // Efeito para monitorar alterações no usuário e exibir o diálogo quando ele estiver disponível
  useEffect(() => {
    if (justRegistered && user && user.username) {
      setGeneratedUsername(user!.username)
      setShowUsernameDialog(true)
      setJustRegistered(false) // Reset o flag depois de mostrar o diálogo
    }
  }, [user, justRegistered])

  // Atualizar a URL quando a tab mudar
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    navigate(`/auth${value === 'register' ? '?tab=register' : ''}`, {
      replace: true,
    })
  }

  // Função para quando o registro for bem-sucedido
  const handleRegistrationSuccess = () => {
    setJustRegistered(true)
  }

  // Função para fechar o diálogo e redirecionar para a home
  const handleCloseUsernameDialog = () => {
    setShowUsernameDialog(false)
    navigate('/')
  }

  return (
    <div className="container mx-auto px-4 pt-12 max-w-md">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            desculp<span className="text-purple-primary">.ai</span>
          </CardTitle>
          <CardDescription className="text-center">
            Entre ou crie sua conta para salvar suas desculpas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger className="cursor-pointer" value="login">
                Entrar
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="register">
                Cadastrar
              </TabsTrigger>
            </TabsList>

            {/* Tab de Login */}
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            {/* Tab de Registro */}
            <TabsContent value="register">
              <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Diálogo para exibir o username gerado */}
      <UsernameDialog
        open={showUsernameDialog}
        username={generatedUsername}
        onClose={handleCloseUsernameDialog}
      />
    </div>
  )
}
