import React from 'react';
import './menuStyle.css';

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
            <a id="opCadastroTutor" href="#">
              Cadastro de Tutor
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
        </ul>
      </div>
    </div>
  );
}

export default Menu;
