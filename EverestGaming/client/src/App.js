import React, { useEffect, useState } from "react";
import ClienteForm from "./ClienteForm";

function App() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data));
  }, []);

  const addCliente = (cliente) => {
    fetch("http://localhost:5000/api/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    })
      .then((res) => res.json())
      .then((newCliente) => setClientes((prev) => [...prev, newCliente]));
  };

  const deleteCliente = (id) => {
    fetch(`http://localhost:5000/api/clientes/${id}`, { method: "DELETE" })
      .then(() => setClientes((prev) => prev.filter((c) => c.id !== id)));
  };

  return (
    <div>
      <h1>Cadastro de Clientes</h1>
      <ClienteForm onAddCliente={addCliente} />
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nome} − {cliente.email} − {cliente.telefone}
            <button onClick={() => deleteCliente(cliente.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
