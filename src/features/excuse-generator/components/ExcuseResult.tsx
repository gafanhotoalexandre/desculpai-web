import { useExcuseStore } from '../stores/excuseStore'
import { useAuthStore } from '@/features/auth/stores/authStore'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ClipboardCopy, Edit, Save } from 'lucide-react'

export function ExcuseResult() {
  const { isAuthenticated } = useAuthStore()
  const {
    desculpaGerada,
    contextoInserido,
    categoriaSelecionada,
    isCopied,
    isEditing,
    setDesculpaGerada,
    handleEditExcuse,
    handleCopyExcuse,
    handleSalvarDesculpa,
  } = useExcuseStore()

  const handleSave = () => {
    if (categoriaSelecionada) {
      handleSalvarDesculpa(
        categoriaSelecionada,
        contextoInserido,
        isAuthenticated
      )
    }
  }

  return (
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
            onClick={handleSave}
            disabled={!desculpaGerada}
          >
            <Save size={16} /> Salvar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
