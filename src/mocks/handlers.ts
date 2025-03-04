import { http, HttpResponse, delay } from 'msw'
import { ApiResponse, Usuario, Desculpa, Categoria } from '../types/api'

// Tipos para os parâmetros e bodies de requisição/resposta
type LoginRequestBody = {
  username: string
  senha: string
}

type LoginResponseBody = ApiResponse<{
  token: string
}>

type RegistroRequestBody = {
  nomeBase: string
  senha: string
}

type RegistroResponseBody = ApiResponse<{
  token: string
}>

type GerarDesculpaRequestBody = {
  categoria: Categoria
  contexto: string
}

type GerarDesculpaResponseBody = ApiResponse<{
  texto: string
}>

type SalvarDesculpaRequestBody = {
  categoria: Categoria
  contexto: string
  texto: string
}

type SalvarDesculpaResponseBody = ApiResponse<Desculpa>

type DesculpasResponseBody = ApiResponse<Desculpa[]>

type EditarDesculpaParams = {
  id: string
}

type EditarDesculpaRequestBody = {
  texto: string
}

type EditarDesculpaResponseBody = ApiResponse<Desculpa>

type ExcluirDesculpaParams = {
  id: string
}

type ExcluirDesculpaResponseBody = ApiResponse<void>

type VotarDesculpaParams = {
  id: string
}

type VotarDesculpaResponseBody = ApiResponse<{
  liked: boolean
  contadorVotos: number
}>

// Funções auxiliares para gerar dados mockados
const gerarId = () => crypto.randomUUID()

function generateShortHash(length: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let hash = ''
  for (let i = 0; i < length; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return hash
}

const gerarUsuario = (nomeBase: string): Usuario => ({
  id: gerarId(),
  username:
    nomeBase.toLowerCase().replace(/\s/g, '_') + '_' + generateShortHash(4),
  nomeBase,
  dataCriacao: new Date().toISOString(),
})

const gerarToken = (usuario: Usuario) => {
  // Token JWT simplificado para mock
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({
      ...usuario,
      exp: Math.floor(Date.now() / 1000) + 3600, // Expira em 1 hora
    })
  )
  const signature = btoa('signature')
  return `${header}.${payload}.${signature}`
}

const gerarDesculpaTexto = (categoria: Categoria, contexto: string) => {
  const desculpas = {
    trabalho: [
      `Não consegui entregar o projeto porque ${contexto} e meu computador teve um problema sério de atualização.`,
      `Vou me atrasar para a reunião porque ${contexto} e o trânsito está completamente parado.`,
    ],
    estudos: [
      `Não consegui entregar o trabalho porque ${contexto} e meu arquivo corrompeu na hora de enviar.`,
      `Perdi a prova porque ${contexto} e tive um problema de saúde de última hora.`,
    ],
    encontros: [
      `Não vou poder ir ao encontro porque ${contexto} e acabei de receber uma ligação de emergência.`,
      `Preciso remarcar porque ${contexto} e surgiu um compromisso familiar inadiável.`,
    ],
    família: [
      `Não poderei ir ao almoço de família porque ${contexto} e estou com sintomas de gripe.`,
      `Vou me atrasar para o evento porque ${contexto} e tive um contratempo com o carro.`,
    ],
    eventos: [
      `Infelizmente não poderei comparecer porque ${contexto} e tive um imprevisto com meu pet.`,
      `Vou ter que cancelar minha presença porque ${contexto} e recebi uma visita inesperada.`,
    ],
  }

  const opcoes = desculpas[categoria]
  return opcoes[Math.floor(Math.random() * opcoes.length)]
}

const gerarDesculpa = (
  categoria: Categoria,
  contexto: string,
  autorId: string
): Desculpa => ({
  id: gerarId(),
  texto: gerarDesculpaTexto(categoria, contexto),
  categoria,
  contexto,
  dataCriacao: new Date().toISOString(),
  autorId,
  contadorVotos: Math.floor(Math.random() * 50),
  votadaPeloUsuario: false,
})

// Banco de dados em memória
const usuarios: Usuario[] = [gerarUsuario('Admin')]

const desculpas: Desculpa[] = [
  gerarDesculpa('trabalho', 'estou com muito trabalho', usuarios[0].id),
  gerarDesculpa('estudos', 'tive que estudar para uma prova', usuarios[0].id),
  gerarDesculpa('encontros', 'estou muito cansado', usuarios[0].id),
]

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Handlers
export const handlers = [
  // Login
  http.post<never, LoginRequestBody, LoginResponseBody>(
    BASE_URL + '/usuarios/login',
    async ({ request }) => {
      const { username } = await request.json()

      const usuario = usuarios.find((u) => u.username === username)

      if (!usuario) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Usuário ou senha inválidos',
          },
          // 404 pois se for "401", o reponse interceptor da api redireciona a page
          { status: 404 }
        )
      }

      // Em um ambiente real, verificaríamos a senha com bcrypt
      // Como é um mock, apenas fingimos que a verificação foi bem-sucedida

      return HttpResponse.json({
        success: true,
        data: {
          token: gerarToken(usuario),
        },
      })
    }
  ),

  // Registro
  http.post<never, RegistroRequestBody, RegistroResponseBody>(
    BASE_URL + '/usuarios/registro',
    async ({ request }) => {
      const { nomeBase } = await request.json()

      if (nomeBase.length < 3) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Nome deve ter pelo menos 3 caracteres',
          },
          { status: 400 }
        )
      }

      // Criar novo usuário
      const novoUsuario = gerarUsuario(nomeBase)
      usuarios.push(novoUsuario)

      return HttpResponse.json({
        success: true,
        data: {
          token: gerarToken(novoUsuario),
        },
      })
    }
  ),

  // Gerar desculpa
  http.post<never, GerarDesculpaRequestBody, GerarDesculpaResponseBody>(
    BASE_URL + '/desculpas/gerar',
    async ({ request }) => {
      const { categoria, contexto } = await request.json()

      return HttpResponse.json({
        success: true,
        data: {
          texto: gerarDesculpaTexto(categoria, contexto),
        },
      })
    }
  ),

  // Salvar desculpa
  http.post<never, SalvarDesculpaRequestBody, SalvarDesculpaResponseBody>(
    BASE_URL + '/desculpas',
    async ({ request }) => {
      const { categoria, contexto, texto } = await request.json()

      // Em um ambiente real, extrairíamos o ID do usuário do token
      // Como é um mock, apenas fingimos que o usuário está autenticado
      const autorId = usuarios[0].id

      const novaDesculpa: Desculpa = {
        id: gerarId(),
        texto,
        categoria,
        contexto,
        dataCriacao: new Date().toISOString(),
        autorId,
        contadorVotos: 0,
        votadaPeloUsuario: false,
      }

      desculpas.push(novaDesculpa)

      return HttpResponse.json({
        success: true,
        data: novaDesculpa,
      })
    }
  ),

  // Obter minhas desculpas
  http.get<never, never, DesculpasResponseBody>(
    BASE_URL + '/usuarios/minhas-desculpas',
    () => {
      // Em um ambiente real, extrairíamos o ID do usuário do token
      // Como é um mock, apenas fingimos que o usuário está autenticado
      const autorId = usuarios[0].id

      const minhasDesculpas = desculpas.filter((d) => d.autorId === autorId)

      return HttpResponse.json({
        success: true,
        data: minhasDesculpas,
      })
    }
  ),

  // Editar desculpa
  http.put<
    EditarDesculpaParams,
    EditarDesculpaRequestBody,
    EditarDesculpaResponseBody
  >(BASE_URL + '/desculpas/:id', async ({ params, request }) => {
    const { id } = params
    const { texto } = await request.json()

    const index = desculpas.findIndex((d) => d.id === id)

    if (index === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Desculpa não encontrada',
        },
        { status: 404 }
      )
    }

    // Atualizar a desculpa
    desculpas[index] = {
      ...desculpas[index],
      texto,
    }

    return HttpResponse.json({
      success: true,
      data: desculpas[index],
    })
  }),

  // Excluir desculpa
  http.delete<ExcluirDesculpaParams, never, ExcluirDesculpaResponseBody>(
    BASE_URL + '/desculpas/:id',
    ({ params }) => {
      const { id } = params

      const index = desculpas.findIndex((d) => d.id === id)

      if (index === -1) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Desculpa não encontrada',
          },
          { status: 404 }
        )
      }

      // Remover a desculpa
      desculpas.splice(index, 1)

      return HttpResponse.json({
        success: true,
      })
    }
  ),

  // Votar em uma desculpa
  http.post<VotarDesculpaParams, never, VotarDesculpaResponseBody>(
    BASE_URL + '/desculpas/:id/votar',
    ({ params }) => {
      const { id } = params

      const index = desculpas.findIndex((d) => d.id === id)

      if (index === -1) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Desculpa não encontrada',
          },
          { status: 404 }
        )
      }

      // Alternar o voto do usuário
      const liked = !desculpas[index].votadaPeloUsuario
      const contadorVotos = liked
        ? desculpas[index].contadorVotos + 1
        : desculpas[index].contadorVotos - 1

      desculpas[index] = {
        ...desculpas[index],
        votadaPeloUsuario: liked,
        contadorVotos,
      }

      return HttpResponse.json({
        success: true,
        data: {
          liked,
          contadorVotos,
        },
      })
    }
  ),

  // Obter ranking de desculpas
  http.get<never, never, DesculpasResponseBody>(
    BASE_URL + '/desculpas/ranking',
    async ({ request }) => {
      const url = new URL(request.url)
      const limit = parseInt(url.searchParams.get('limit') || '10')

      await delay(280)
      // Ordenar desculpas por número de votos (decrescente)
      const ranking = [...desculpas]
        .sort((a, b) => b.contadorVotos - a.contadorVotos)
        .slice(0, limit)

      return HttpResponse.json({
        success: true,
        data: ranking,
      })
    }
  ),
]
