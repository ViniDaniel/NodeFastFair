import { createContext, useEffect, useState } from "react";

export const FeiranteContext = createContext();

export function FeiranteProvider({ children }) {
  const [feirante, setFeirante] = useState(null);

  useEffect(() => {
    const feiranteSalvo = localStorage.getItem("feiranteLogado");
    console.log("Feirante salvo no localStorage", feiranteSalvo);

    if (feiranteSalvo && !feirante) {
      setFeirante(JSON.parse(feiranteSalvo));
    }
  }, [feirante]);

  const logarFeirante = (feiranteData) => {
    localStorage.setItem("feiranteLogado", JSON.stringify(feiranteData));
    setFeirante(feiranteData);
  };

  const deslogarFeirante = () => {
    localStorage.removeItem("feiranteLogado");
    setFeirante(null);
  };

  return (
    <FeiranteContext.Provider
      value={{ feirante, logarFeirante, deslogarFeirante }}
    >
      {children}
    </FeiranteContext.Provider>
  );
}
