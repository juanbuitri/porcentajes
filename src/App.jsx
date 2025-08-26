import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [notas, setNotas] = useState([{ nota: "", peso: "" }]);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (index, field, value) => {
    const nuevasNotas = [...notas];
    nuevasNotas[index][field] = value;
    setNotas(nuevasNotas);
  };

  const agregarNota = () => {
    setNotas([...notas, { nota: "", peso: "" }]);
  };

  const calcularPorcentaje = () => {
    let total = 0;
    let sumaPesos = 0;

    notas.forEach(({ nota, peso }) => {
      const n = parseFloat(nota) || 0;
      const p = parseFloat(peso) || 0;
      total += n * (p / 100);
      sumaPesos += p;
    });

    if (sumaPesos !== 100) {
      setError(true);
      setResultado("⚠️ La suma de los pesos debe ser 100%");
    } else {
      setError(false);
      setResultado(`✅ Tu nota final es: ${total.toFixed(2)}`);
    }
  };

  return (
    <div className="container">
      <h1>Calculadora de Porcentaje de Notas</h1>

      {notas.map((item, index) => (
        <div key={index} className="input-group">
          <input
            type="number"
            placeholder="Nota"
            value={item.nota}
            onChange={(e) => handleChange(index, "nota", e.target.value)}
          />
          <input
            type="number"
            placeholder="Peso %"
            value={item.peso}
            onChange={(e) => handleChange(index, "peso", e.target.value)}
          />
        </div>
      ))}

      <div className="botones">
        <button onClick={agregarNota} className="btn-add">
          ➕ Agregar Nota
        </button>
        <button onClick={calcularPorcentaje} className="btn-calc">
          Calcular
        </button>
      </div>

      {resultado && (
        <p className={`resultado ${error ? "error" : "ok"}`}>{resultado}</p>
      )}
    </div>
  );
}
