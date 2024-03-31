import React from 'react';

function Menu() {
  return (
    <div>
      <img src="Codigo/front/src/images/LogoSF.png" alt="Logo PetShop" className="logo" />
      <div className="menu">
        <ul>
          <li>
            {/* eslint-disable-next-line */}
            <a id="opHorarios" href="#">
              Horários
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a id="opVendas" href="#">
              Vendas
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a id="opCadastroTutor" href="http://localhost:3000/clientes">
              Cadastro de Tutor
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a id="opGerenciar" href="http://localhost:3000/pets">
              Cadastro de Pets
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a id="opGerenciar" href="#">
              Gerenciar Estoque
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a id="opControleCaixa" href="#">
              Controle de Caixa
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a id="opCadastroUser" href="#">
              Cadastro de Usuários
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a id="opCadastroUser" href="http://localhost:3000/dadosmestre">
              Tabelas de Parâmetros
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
