import { create } from 'zustand'
import { Categoria } from '@/types/api'
import { gerarDesculpa, salvarDesculpa } from '@/services/excuseService'
import { toast } from 'sonner'

interface ExcuseStore {
  // Estado
  desculpaGerada: string
  contextoInserido: string
  categoriaSelecionada: Categoria | null
  isCopied: boolean
  isEditing: boolean
  // aux
  shouldResetForm: boolean

  // Ações
  setDesculpaGerada: (text: string) => void
  setCategoriaSelecionada: (categoria: Categoria | null) => void
  setIsEditing: (isEditing: boolean) => void
  // aux
  setShoulResetForm: (should: boolean) => void

  handleEditExcuse: () => void
  handleCopyExcuse: () => void
  handleGerarDesculpa: (categoria: Categoria, contexto: string) => Promise<void>
  handleSalvarDesculpa: (
    categoria: Categoria,
    contexto: string,
    isAuthenticated: boolean
  ) => Promise<boolean>
  resetarTudo: () => void
}

export const useExcuseStore = create<ExcuseStore>((set, get) => ({
  // Estado inicial
  desculpaGerada: '',
  contextoInserido: '',
  categoriaSelecionada: null,
  isCopied: false,
  isEditing: false,
  // aux
  shouldResetForm: false,

  // Métodos para atualizar o estado
  setDesculpaGerada: (text) => set({ desculpaGerada: text }),
  setCategoriaSelecionada: (categoria) =>
    set({ categoriaSelecionada: categoria }),
  setIsEditing: (isEditing) => set({ isEditing }),
  // aux
  setShoulResetForm: (should) => set({ shouldResetForm: should }),

  // Handlers
  handleEditExcuse: () => set({ isEditing: true }),

  handleCopyExcuse: () => {
    const { desculpaGerada } = get()
    navigator.clipboard.writeText(desculpaGerada)
    set({ isCopied: true })
    setTimeout(() => set({ isCopied: false }), 1500)
  },

  handleGerarDesculpa: async (categoria, contexto) => {
    try {
      const texto = await gerarDesculpa(categoria, contexto)
      set({
        desculpaGerada: texto,
        contextoInserido: contexto,
        categoriaSelecionada: categoria,
        isEditing: false,
      })
    } catch (error) {
      toast.error('Erro ao gerar desculpa', {
        description: (error as Error).message,
      })
    }
  },

  handleSalvarDesculpa: async (categoria, contexto, isAuthenticated) => {
    if (!isAuthenticated) {
      toast.error('Faça login para salvar a desculpa')
      return false
    }

    const { desculpaGerada } = get()

    try {
      await salvarDesculpa(categoria, contexto, desculpaGerada)
      toast.success('Desculpa salva com sucesso!')
      get().resetarTudo()
      return true
    } catch (error) {
      toast.error('Erro ao salvar desculpa', {
        description: (error as Error).message,
      })
      return false
    }
  },

  resetarTudo: () =>
    set({
      desculpaGerada: '',
      contextoInserido: '',
      categoriaSelecionada: null,
      isEditing: false,
      shouldResetForm: true,
    }),
}))
