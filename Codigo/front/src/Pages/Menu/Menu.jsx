import "./menuStyle.css";


function Menu() {
  return (
    <div>
      <img src="Codigo/front/src/images/LogoSF.png" alt="Logo PetShop" class="logo"></img>
    <div class="menu">
      <ul>
        <li>
          <a id="opHorarios" href="">
            Horários
          </a>
        </li>
        <li>
          <a id="opVendas" href="#">
            Vendas
          </a>
        </li>
        <li>
          <a id="opCadastroTutor" href="#">
            Cadastro de Tutor
          </a>
        </li>
        <li>
          <a id="opGerenciar" href="#">
            Gerenciar Estoque
          </a>
        </li>
        <li>
          <a id="opControleCaixa" href="#">
            Controle de Caixa
          </a>
        </li>
        <li>
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
