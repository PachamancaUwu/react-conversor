import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      alert("Ingresa un monto válido");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `https://crudpractica-bcaqcxcyf6dvhgd8.brazilsouth-01.azurewebsites.net/api/getPractica?amount=${amount}&currency=${currency}&code=DL3UpmxEcOemrEtD3vgeRW_6NM9exNnTYAdMni5AmYaUAzFuAgHLyQ==`
      );

      let bodyText = await res.text();

      if (!res.ok) {
        // Mostrar error HTTP con tipo, código y cuerpo
        setResult(
          `❌ Error de Function\nTipo: HTTP ${res.status} (${res.statusText})\nCuerpo: ${bodyText}`
        );
      } else {
        setResult(
          `✅ Resultado: ${bodyText} ${currency === "USD" ? "PEN" : "USD"}`
        );
      }
    } catch (err) {
      // Error de conexión o fetch
      setResult(
        `❌ Error de conexión\nTipo: ${err.name}\nMensaje: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-500 min-h-screen flex flex-col items-center justify-center bg-gray-500 p-4">
      <div className="shadow-lg rounded-lg p-6 w-full max-w-md bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Conversor de Monedas
        </h1>

        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        >
          <option value="USD">USD → PEN</option>
          <option value="PEN">PEN → USD</option>
        </select>

        <button
          onClick={handleConvert}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full transition-colors"
        >
          {loading ? "Convirtiendo..." : "Convertir"}
        </button>

        {result && (
          <pre className="mt-4 text-center text-lg font-medium text-gray-700 whitespace-pre-wrap">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
