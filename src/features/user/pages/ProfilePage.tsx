import { useAuthStore } from "@/features/auth/stores/authStore";
import { formatDate } from "@/utils/formatDate";
import { Edit2, FileX, Heart, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Statistic from "../components/Statistic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Desculpa } from "@/types/api";
import {
  obterMinhasDesculpas,
  editarDesculpa,
  excluirDesculpa,
} from "@/services/excuseService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const dataFormatada = formatDate(user?.dataCriacao);

  // Estados para gerenciar as desculpas
  const [minhasDesculpas, setMinhasDesculpas] = useState<Desculpa[]>([]);
  const [isDesculpasLoaded, setIsDesculpasLoaded] = useState(false); // uso exclusivo para "ver minhas desculpas"
  const [isLoading, setIsLoading] = useState(false); // loading de uso geral
  const [mostrarDesculpas, setMostrarDesculpas] = useState(false);

  // Estados para edição de desculpa
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [textoEditado, setTextoEditado] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  // Função para carregar as desculpas do usuário
  const carregarDesculpas = async () => {
    try {
      setIsLoading(true);
      const desculpas = await obterMinhasDesculpas();
      console.log(desculpas);
      setMinhasDesculpas(desculpas);
      setIsDesculpasLoaded(true);
      setMostrarDesculpas(true);
    } catch (error) {
      console.error("Erro ao carregar desculpas:", error);
      toast.error("Não foi possível carregar suas desculpas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: implemente a função para iniciar a edição de uma desculpa
  // Esta função deve receber uma desculpa e configurar o estado de edição
  const iniciarEdicao = (desculpa: Desculpa) => {
    setEditandoId(desculpa.id);
    setTextoEditado(desculpa.texto)
  };

  // TODO: implemente a função para cancelar a edição
  // Esta função deve limpar os estados de edição
  const cancelarEdicao = () => {
    setEditandoId(null);
  };

  
  // TODO: implemente a função para salvar a edição de uma desculpa
  // Esta função deve chamar a API e atualizar o estado local
  const salvarEdicao = async (id: string) => {
    const data = await editarDesculpa(id, textoEditado)
    console.log(data)
    console.log(textoEditado)
    setEditandoId(null)
  };

  // TODO: implemente a função para excluir uma desculpa
  // Esta função deve confirmar com o usuário, chamar a API e atualizar o estado local
  const excluirMinhaDesculpa = async (id: string) => {
    await excluirDesculpa(id)
    // implementação
  };

  // Calcula quantas desculpas têm mais de 5 votos (favoritas)
  const desculpasFavoritas = minhasDesculpas.filter(
    (d) => d.contadorVotos > 5
  ).length;

  return (
    <section className="bg-white drop-shadow-md max-w-5xl rounded-md h-full p-4 sm:p-6 my-6 sm:my-10 mx-auto">
      {/* Cabeçalho do perfil */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-purple-400 flex items-center justify-center bg-purple-100">
            <User size={36} className="text-purple-primary sm:hidden" />
            <User size={48} className="text-purple-primary hidden sm:block" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="w-full font-bold text-xl sm:text-2xl md:text-3xl mb-1">
              @{user?.username}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Membro desde: {dataFormatada}
            </p>
            {user?.email ? (
              <p className="text-gray-500 text-sm sm:text-base">
                {user?.email}
              </p>
            ) : (
              <p
                className="text-gray-500 italic opacity-50 cursor-not-allowed text-sm sm:text-base"
                title="Implementação em versões futuras"
              >
                Email não cadastrado
              </p>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full mt-2 sm:mt-0">
              <EllipsisVertical className="cursor-pointer" size={24} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={carregarDesculpas}>
              <Button
                variant="outline"
                className="border border-purple-400 text-purple-600 hover:bg-purple-50 hover:text-purple-700 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Carregando..." : "Ver Minhas Desculpas"}
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem title="Em breve: adicione um email para alteração de senha">
              <Button
                variant="outline"
                className="border border-purple-400 text-purple-600 hover:bg-purple-50 hover:text-purple-700 w-full"
                disabled={true}
                title="Em breve: adicione um email para alteração de senha"
              >
                Alterar Senha
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Estatísticas */}
      <hr className="my-4 sm:my-6" />
      <div className="flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-10 mb-6 sm:mb-8">
        <Statistic
          info="Desculpas"
          qtd={isDesculpasLoaded ? minhasDesculpas.length : "---"}
        />
        <Statistic
          info="Desculpas Favoritas"
          qtd={isDesculpasLoaded ? desculpasFavoritas : "---"}
        />
      </div>

      {/* Seção de Desculpas */}
      {mostrarDesculpas && (
        <div className="mt-6 sm:mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Minhas Desculpas
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMostrarDesculpas(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </Button>
          </div>

          {minhasDesculpas.length === 0 ? (
            <p className="text-center py-4 sm:py-6 text-gray-500 text-sm sm:text-base">
              Você ainda não criou nenhuma desculpa. Que tal criar uma agora?
            </p>
          ) : (
            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
              {minhasDesculpas.map((desculpa) => (
                <div
                  key={desculpa.id}
                  className="border border-gray-100 rounded-lg p-3 sm:p-4 hover:border-purple-200 hover:bg-purple-50/30 transition-colors"
                >
                  {/* TODO: implemente o código condicional aqui para:
                      1. Mostrar a interface de edição quando editandoId === desculpa.id
                      2. Mostrar o modo de visualização normal caso contrário 
                      
                      Use o operador ternário (condição ? resultadoSeVerdadeiro : resultadoSeFalso)
                  */}

                  {/* Este é o código base para o modo de visualização que você deve completar: */}
                  {editandoId === desculpa.id ? (
                    <>
                      <Textarea
                        value={textoEditado}
                        onChange={({ target }) => setTextoEditado(target.value)}
                      />
                      <Button
                        onClick={() => salvarEdicao(desculpa.id)}
                        className="my-2 mr-2 bg-green-600 hover:bg-green-700"
                      >
                        Salvar
                      </Button>
                      <Button
                        onClick={() => cancelarEdicao()}
                        className="my-2 bg-red-600 hover:bg-red-700"
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <p className="mb-3 sm:mb-4 text-gray-700 text-sm sm:text-base">
                      {desculpa.texto}
                    </p>
                  )}
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <Badge className="bg-purple-dark hover:bg-purple-primary transition text-xs sm:text-sm">
                      {desculpa.categoria}
                    </Badge>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1">
                        <Heart
                          size={16}
                          className="text-purple-primary fill-current sm:size-5"
                        />
                        <span className="text-gray-600 text-sm">
                          {desculpa.contadorVotos}
                        </span>
                      </div>
                      <button
                        onClick={() => iniciarEdicao(desculpa)}
                        className="text-purple-primary hover:text-purple-dark cursor-pointer"
                        title="Editar desculpa"
                      >
                        <Edit2 size={14} className="sm:size-4" />
                      </button>
                      <button
                        onClick={() => excluirMinhaDesculpa(desculpa.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        title="Excluir desculpa"
                      >
                        <FileX onClick={() => excluirMinhaDesculpa(desculpa.id)} size={14} className="sm:size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
