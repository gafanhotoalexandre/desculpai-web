import { apiService as api } from '@/lib/api'
import { ApiResponse, Desculpa, Categoria } from '../types/api'

export const gerarDesculpa = async (
  categoria: Categoria,
  contexto: string
): Promise<string> => {
  const response = await api.post<{ texto: string }>('/desculpas/gerar', {
    categoria,
    contexto,
  })

  if (!response.success) throw new Error(response.message)
  return response.data!.texto
}

export const salvarDesculpa = async (
  categoria: Categoria,
  contexto: string,
  texto: string
): Promise<Desculpa> => {
  const response = await api.post<Desculpa>('/desculpas', {
    categoria,
    contexto,
    texto,
  })
  if (!response.success) throw new Error(response.message)
  return response.data!
}

export const obterMinhasDesculpas = async (): Promise<Desculpa[]> => {
  const response = await api.get<Desculpa[]>('/usuarios/minhas-desculpas')
  if (!response.success) throw new Error(response.message)
  return response.data!
}

export const editarDesculpa = async (
  id: string,
  texto: string
): Promise<Desculpa> => {
  const response = await api.put<Desculpa>(`/desculpas/${id}`, { texto })
  if (!response.success) throw new Error(response.message)
  return response.data!
}

export const excluirDesculpa = async (id: string): Promise<void> => {
  const response = await api.delete<ApiResponse>(`/desculpas/${id}`)
  if (!response.success) throw new Error(response.message)
}

export const votarDesculpa = async (
  id: string
): Promise<{ liked: boolean; contadorVotos: number }> => {
  const response = await api.post<{ liked: boolean; contadorVotos: number }>(
    `/desculpas/${id}/votar`
  )
  if (!response.success) throw new Error(response.message)
  return response.data!
}

export const obterRanking = async (limit = 10): Promise<Desculpa[]> => {
  const response = await api.get<Desculpa[]>(
    `/desculpas/ranking?limit=${limit}`
  )
  if (!response.success) throw new Error(response.message)
  return response.data!
}
