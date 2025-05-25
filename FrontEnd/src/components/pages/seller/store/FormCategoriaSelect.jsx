import api from "../../../services/api";
import { useState, useEffect } from "react";
import styles from "../../../../styles/pages_styles/Cadastro.module.css"

function FormCategoriaSelect({value, onChange}) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias", error)
      }
    }

    fetchCategorias()

  }, []);

  return (
    <div className={styles.field}>
        <label htmlFor="categoria" className={styles.label} >Categoria: </label>
        <select name="categoria" value={value} onChange={onChange} required className={styles.input}>
            <option disabled value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
                <option key={cat._id} value={cat._id}>
                    {cat.nome}
                </option>
            ))}
        </select>
    </div>
  )

}
export default FormCategoriaSelect;
