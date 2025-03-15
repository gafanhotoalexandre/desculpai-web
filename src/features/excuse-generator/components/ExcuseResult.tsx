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
    <Card className="text-gray-dark w-full">
      <CardHeader>
        <CardTitle className="font-poppins">Resultado</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={desculpaGerada}
            onChange={(e) => setDesculpaGerada(e.target.value)}
            placeholder="Edite sua desculpa"
            className="mb-4 w-full"
            rows={5}
          />
        ) : (
          <Textarea
            value={desculpaGerada}
            readOnly
            placeholder="Sua desculpa aparecerá aqui"
            className="mb-4 w-full"
            rows={5}
          />
        )}
      </CardContent>

      <CardFooter className="mt-auto flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between w-full">
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

        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          {!isEditing && (
            <Button
              variant="secondary"
              onClick={handleEditExcuse}
              disabled={!desculpaGerada}
              className="flex items-center gap-2"
              size="sm"
            >
              <Edit size={16} />
              <span className="sm:inline">Editar</span>
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={handleCopyExcuse}
            disabled={!desculpaGerada}
            className="flex items-center gap-2"
            size="sm"
          >
            {isCopied ? (
              <>
                <Check size={16} className="text-green-500" />
                <span className="sm:inline">Copiado</span>
              </>
            ) : (
              <>
                <ClipboardCopy size={16} />
                <span className="sm:inline">Copiar</span>
              </>
            )}
          </Button>

          <Button
            className="bg-purple-primary hover:bg-purple-dark flex items-center gap-2"
            onClick={handleSave}
            disabled={!desculpaGerada}
            size="sm"
          >
            <Save size={16} />
            <span className="sm:inline">Salvar</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
