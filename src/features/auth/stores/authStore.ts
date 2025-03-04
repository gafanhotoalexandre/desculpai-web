import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'
import { Usuario } from '@/types/api'
import { apiService } from '@/lib/api'

interface AuthState {
  user: Usuario | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, senha: string) => Promise<void>
  register: (nomeBase: string, senha: string) => Promise<void>
  logout: () => void
}

interface LoginResponse {
  token: string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (username, senha) => {
        set({ isLoading: true })
        try {
          const response = await apiService.post<LoginResponse>(
            '/usuarios/login',
            { username, senha }
          )

          if (response.success) {
            const { token } = response.data!
            localStorage.setItem('token', token)

            // Decodifica o token para obter informações do usuário
            const user = jwtDecode<Usuario>(token)

            set({ user, token, isAuthenticated: true })
          } else {
            throw new Error(response.message || 'Falha no login')
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
          throw new Error('Erro desconhecido durante o login')
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (nomeBase, senha) => {
        set({ isLoading: true })
        try {
          const response = await apiService.post<LoginResponse>(
            '/usuarios/registro',
            { nomeBase, senha }
          )

          if (response.success) {
            const { token } = response.data as LoginResponse
            localStorage.setItem('token', token)

            // Decodifica o token para obter informações do usuário
            const user = jwtDecode<Usuario>(token)

            set({ user, token, isAuthenticated: true })
          } else {
            throw new Error(response.message || 'Falha no registro')
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
          throw new Error('Erro desconhecido durante o registro')
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
      // Função para hidratar o estado a partir do token armazenado
      onRehydrateStorage: (state) => {
        return (storedState, error) => {
          if (error || !storedState?.token) return

          try {
            const decoded = jwtDecode<Usuario & { exp: number }>(
              storedState.token
            )
            if (decoded.exp * 1000 < Date.now()) {
              localStorage.removeItem('token')
              state?.logout()
            } else {
              // Re-hidratar o objeto user a partir do token
              if (state) state.user = decoded
            }
            /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
          } catch (e) {
            localStorage.removeItem('token')
            state?.logout()
          }
        }
      },
    }
  )
)
