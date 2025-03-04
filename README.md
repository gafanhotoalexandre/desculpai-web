# desculp.ai - Gerador de Desculpas com IA

## 📝 Sobre o Projeto

O **desculp.ai** é uma aplicação fullstack que utiliza inteligência artificial para gerar pedidos de desculpa criativos e convincentes para diferentes situações do cotidiano. Desenvolvido como projeto para o programa de residência em TIC 20 do Capacita Brasil/C-JOVEM, este aplicativo trabalha a integração entre frontend React e backend Node.js.

## 🎯 Objetivo

Criar uma solução divertida e funcional que permite aos usuários:

- Gerar desculpas personalizadas baseadas em contextos específicos
<!-- - Salvar suas desculpas favoritas
- Compartilhar e votar nas melhores desculpas da comunidade
- Gerenciar seu próprio catálogo de desculpas -->

## 🚀 Tecnologias Utilizadas

### Frontend

- React + TypeScript (Vite)
- React Router DOM (navegação)
- Zustand (gerenciamento de estado)
- Zod (validação de formulários)
- Axios (requisições HTTP)
- JWT Decode (autenticação)
- TailwindCSS + ShadcnUI (estilização)

<!-- ### Backend

- Node.js
- Express
- JWT (JSON Web Tokens)
- Banco de dados (MongoDB/PostgreSQL)
- APIs de IA para geração de texto -->

## 📋 Funcionalidades

- **Autenticação de usuários**: Registro e login seguros
- **Geração de desculpas**: Interface intuitiva para criar desculpas personalizadas por categoria
- **Gerenciamento pessoal**: Salvar, editar e excluir suas próprias desculpas
<!-- - **Sistema de votação**: Mecanismo para destacar as melhores desculpas da comunidade
- **Ranking**: Visualização das desculpas mais populares -->

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (v20+)
- npm ou yarn

### Frontend

```bash
# Clonar o repositório
git clone https://github.com/gafanhotoalexandre/desculpai-web.git

# Acessar o diretório do frontend
cd desculpai-web

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env com:
VITE_API_URL=http://localhost:3000
VITE_API_MOCK=true

# Iniciar servidor de desenvolvimento
npm run dev
```

<!-- ### Backend

```bash
# Acessar o diretório do backend
cd desculpai_backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env com:
PORT=3000
JWT_SECRET=seu_segredo_aqui
DATABASE_URL=sua_url_conexao_aqui
GEMINI_API_KEY=sua_api_key

# Iniciar servidor
npm run dev
``` -->

<!-- ## 🧩 Estrutura do Projeto (Frontend)

```
src/
├── assets/               # Arquivos estáticos (imagens, ícones, fonts)
├── components/           # Componentes reutilizáveis
│   ├── ui/               # Componentes shadcn/ui (button, card, dialog...)
│   └── common/           # Componentes globais (Layout, Navbar, Footer)
├── features/             # Funcionalidades independentes
│   ├── auth/             # Autenticação (Login, Registro)
│   ├── excuse-generator/ # Geração de desculpas
│   ├── my-excuses/       # Gerenciamento de desculpas
│   └── community/        # Ranking comunitário
├── lib/                  # Utilitários globais
│   ├── api.ts            # Configuração do cliente HTTP
│   ├── utils.ts          # Funções helper
│   └── constants.ts      # Constantes (cores, textos)
├── types/                # Tipagens TypeScript (ex: respostas da API)
├── routes/               # Configuração de rotas
├── App.tsx               # Componente raiz
└── main.tsx              # Ponto de entrada
``` -->

<!-- ## 📚 API Endpoints

### Autenticação

- `POST /usuarios/registro` - Registrar novo usuário
- `POST /usuarios/login` - Autenticar usuário

### Desculpas

- `POST /desculpas/gerar` - Gerar nova desculpa com IA
- `POST /desculpas` - Salvar desculpa
- `GET /usuarios/minhas-desculpas` - Obter desculpas do usuário
- `PUT /desculpas/:id` - Editar desculpa existente
- `DELETE /desculpas/:id` - Excluir desculpa
- `POST /desculpas/:id/votar` - Votar em uma desculpa
- `GET /desculpas/ranking` - Obter ranking de desculpas -->

## 👥 Equipe de Desenvolvimento - `sem perdão`

- [Alexandre Martins](https://github.com/gafanhotoalexandre)
- [Davi Sousa](https://github.com/daviiisousa)
- [Mikael Mendes](https://github.com/mikael326)
- [Levy Rodrigues](https://github.com/levyrodrigues23)

## 🔗 Repositórios

- [desculpai-api](https://github.com/levyrodrigues23/Desculp.AI)

- [desculpai-web](https://github.com/gafanhotoalexandre/desculpai-web)

## 📄 Licença

<!-- Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

--- -->

Desenvolvido como parte do programa de residência em TIC 20 do Capacita Brasil/C-JOVEM (turma FST1).
