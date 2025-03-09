interface StatisticProps  {
    info: string,
    qtd: number | string
}
const Statistic = ({info, qtd}: StatisticProps) => {
  return (
    <div className=" hover:scale-110 transition-transform ease-out drop-shadow-md bg-white my-10 py-5 text-center w-[30%]">
      <h1 className="text-2xl font-bold">{info}</h1>
      <p className="text-5xl font-bold italic text-purple-primary">{qtd}</p>
    </div>
  )
}

export default Statistic
