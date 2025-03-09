export const formatDate = (date?: string | number): string => {
  if (!date) {
    console.log("Data inválida ou indefinida.");
    return "Data inválida";
  }

  const opcoes: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  };

  return new Intl.DateTimeFormat("pt-BR", opcoes).format(new Date(date));
};
