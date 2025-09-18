import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/produtos');
        if (!response.ok) {
          throw new Error('Erro ao carregar produtos');
        }
        const data = await response.json();
        setProdutos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) return <div>Carregando produtos...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Produtos</h1>
        <div className="produtos-container">
          <table className="produtos-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>SKU</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Em Estoque</th>
                <th>Criado em</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.sku}</td>
                  <td>{produto.name}</td>
                  <td>R$ {parseFloat(produto.price).toFixed(2)}</td>
                  <td>{produto.in_stock ? 'Sim' : 'Não'}</td>
                  <td>{new Date(produto.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
