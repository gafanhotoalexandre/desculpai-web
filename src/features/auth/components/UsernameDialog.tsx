import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface UsernameDialogProps {
  open: boolean
  username: string
  onClose: () => void
}

export function UsernameDialog({
  open,
  username,
  onClose,
}: UsernameDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cadastro realizado com sucesso!</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <span>Seu nome de usuário completo foi gerado:</span>
            <span className="block bg-gray-100 p-3 rounded-md border border-gray-300 text-center font-medium text-purple-primary">
              {username}
            </span>
            <span className="font-bold text-gray-800">
              Anote este nome de usuário! Você precisará dele para fazer login
              no sistema.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onClose}
            className="bg-purple-primary hover:bg-purple-dark"
          >
            Entendi, vamos começar!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
