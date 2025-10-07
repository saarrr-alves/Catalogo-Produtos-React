import React, { Component } from 'react'

function ProdutoCard({ produto }) {
  return (
    <div className="produto-card">
        <h2>{produto.nome}</h2>
        <img className='produto-img' src={produto.imagem} />
        <p className='produto-preco'>Preço: R$ {produto.preco}</p>
        <p>Descrição: {produto.descricao}</p>
    </div>
  )
}

export default ProdutoCard;