/* eslint-disable @typescript-eslint/no-explicit-any*/
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: {
    code?: string
    details?: any
  }
}

export interface Usuario {
  id: string
  username: string
  nomeBase: string
  dataCriacao: string
  email?: string
  exp?: number
}

export interface Desculpa {
  id: string
  texto: string
  categoria: string
  contexto: string
  dataCriacao: string
  autorId: string
  contadorVotos: number
  votadaPeloUsuario: boolean
}

export type Categoria =
  | 'trabalho'
  | 'estudos'
  | 'encontros'
  | 'família'
  | 'eventos'
