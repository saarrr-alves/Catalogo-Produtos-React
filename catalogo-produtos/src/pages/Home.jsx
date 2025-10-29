import React, { useState, useEffect } from 'react';
import ProdutoCard from '../components/ProdutoCard';
import '../components/ProdutoCard.css';
import './Home.css';

const API_URL = 'https://crudcrud.com/api/ab72dc9c231c46d0baf7dc4ed47d90c4/produtos';

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState({
    nome: '',
    preco: '',
    descricao: '',
    imagem: ''
  });

  // Função para carregar produtos da API
  const carregarProdutos = async () => {
    try {
      setCarregando(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setCarregando(false);
    }
  };

  // useEffect para carregar produtos ao montar o componente
  useEffect(() => {
    carregarProdutos();
  }, []);

  // Atualizar estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // Adicionar novo produto e recarregar a lista
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar produto');
      }

      setForm({ nome: '', preco: '', descricao: '', imagem: '' });
      await carregarProdutos(); // Recarrega os produtos após adicionar
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <div className="home">
      <h1>Catálogo de Produtos</h1>

      {carregando ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="lista-produtos">
          {produtos.map((produto) => (
            <ProdutoCard key={produto._id} produto={produto} />
          ))}
        </div>
      )}

      <div className='form-container'>
        <h2>Adicionar novo produto</h2>
        <form onSubmit={handleSubmit} className="form-produto">
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome do produto"
            required
          />
          <input
            type="number"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            placeholder="Preço"
            required
          />
          <input
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            required
          />
          <input
            type="text"
            name="imagem"
            value={form.imagem}
            onChange={handleChange}
            placeholder="URL da imagem (opcional)"
          />
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </div>
  );
}

export default Home;