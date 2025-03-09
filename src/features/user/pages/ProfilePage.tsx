import { useAuthStore } from "@/features/auth/stores/authStore";
import fotoUsuario from "../../../assets/img/fotoPerfilUsario.jpg";
import { formatDate } from "../../../utils/formatDate";
import { EllipsisVertical } from "lucide-react";
import Statistic from "../components/Statistic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const dataFormatada = formatDate(user?.dataCriacao);

  return (
    <section className="bg-white drop-shadow-md max-w-5xl rounded-md h-full p-10 my-10 mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img
            src={fotoUsuario}
            className="w-[20%] h-full rounded-full border-4 border-purple-primary"
            alt={`Foto do usuário ${user?.username}`}
          />
          <div>
            <h1 className="w-full font-bold text-4xl mb-1.5">
              @{user?.username}
            </h1>
            <p className="text-gray-500">Membro desde: {dataFormatada}</p>
            {user?.email ? (
              <p className="text-gray-500">{user?.email}</p>
            ) : (
              <p className="text-gray-500">Email não cadastrado</p>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="w-[50%] cursor-pointer" size={28} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative left-[-100px] top-[-20px]">
            <DropdownMenuItem>
              <button className="border border-purple-400 text-purple-primary p-1 rounded-md cursor-pointer">
                Ver Minhas Desculpas
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="border border-purple-400 text-purple-primary p-1 rounded-md cursor-pointer w-full">
                Alterar Senha
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <hr className="mt-10" />
      <div className="flex justify-around items-center gap-10">
        <Statistic info="Desculpas" qtd={7} />
        <Statistic info="Desculpas Favoritas" qtd={10} />
      </div>
    </section>
  );
};

export default ProfilePage;
