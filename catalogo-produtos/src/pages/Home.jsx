import React, { useState, useEffect } from 'react';
import ProdutoCard from '../components/ProdutoCard';
import '../components/ProdutoCard.css';
import './Home.css';
import axios from 'axios';

// Imagens locais
import camisetaImg from '../assets/camiseta.png';
import calcaJeansImg from '../assets/calca-jeans.png';
import tenisEsportivoImg from '../assets/tenis-esportivo.png';
import jaquetaImg from '../assets/jaqueta.png';
import mochilaImg from '../assets/mochila.png';
import relogioPulsoImg from '../assets/relogio-pulso.png';

const API_URL = 'https://crudcrud.com/api/469f567b07e2415fa8d9006934793af6/produtos';

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState({
    nome: '',
    preco: '',
    descricao: '',
    imagem: ''
  });

  // Carregar produtos da API
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(API_URL);
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setCarregando(false);
      }
    };

    fetchProdutos();
  }, []);

  // Atualizar estado do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Adicionar novo produto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoProduto = {
      nome: form.nome,
      preco: parseFloat(form.preco),
      descricao: form.descricao,
      imagem: form.imagem || 'https://via.placeholder.com/150'
    };

    try {
      const response = await axios.post(API_URL, novoProduto);
      setProdutos((prevProdutos) => [...prevProdutos, response.data]);
      setForm({ nome: '', preco: '', descricao: '', imagem: '' });
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