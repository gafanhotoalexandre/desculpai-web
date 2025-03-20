interface StatisticProps {
  info: string;
  qtd: number | string;
}

const Statistic = ({ info, qtd }: StatisticProps) => {
  return (
    <div className="hover:scale-105 transition-all duration-300 ease-out drop-shadow-sm bg-white my-6 py-5 px-4 text-center rounded-lg border border-gray-100 w-full max-w-xs">
      <h2 className="text-xl font-semibold text-gray-800">{info}</h2>
      <p className="text-4xl font-bold text-purple-primary mt-2">{qtd}</p>
    </div>
  );
};

export default Statistic;