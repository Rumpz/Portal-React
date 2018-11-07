// React imports
import React, { Component } from 'react';

// Assets imports
import dumperPage from '../../assets/img/dumperPage.PNG';
import reporting from '../../assets/img/reporting.PNG';
import navbarOpened from '../../assets/img/navbarOpened.PNG';
import navbarClosed from '../../assets/img/navbarClosed.PNG';

// Custom imports
import NavBar from '../../components/NavBar/NavBar';

// CSS imports 
import './css/main.css';

export default class MainPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: 'Página Inicial',
      showPageDetail: ''
    };
  }

  showPageInfo = page => {
    this.setState({ showPageDetail: page })
  }

  render () {
    const { title, showPageDetail } = this.state;
    const showPages = showPageDetail === 'reporting'
      ? (
          <section>
            <h4>Reporting</h4>
            <div className='img-div1'>
              <img style={{margin: '0px auto'}} src={reporting} />
            </div>
            <strong><p style={{color: 'red'}}>1 - Categoria</p></strong>
            <p>Escolha de qual a categoria a pesquisar, ao selecionar são disponibilizados filtros de sub-categorias e os relatórios associados à categoria principal</p>
            <br />

            <strong><p style={{color: 'red'}}>2 - Sub-Categoria</p></strong>
            <p>Filtro de sub-categoria a aplicar, dentro da primeira categoria existe a possibilidade de filtrar as sub-categorias associadas</p>
            <p>Após a pesquisa dos filtros aplicados, irão ser disponibilizados todos os relatórios que se encontram dentro dos parâmetros pesquisados</p>
            <br />

            <strong><p style={{color: 'red'}}>3 - Relatórios</p></strong>
            <p>Ao selecionar o relatório pretendido é disponibilizado um link para download</p>
            <br />
          </section>
        )
      : showPageDetail === 'dumper'
        ? (
            <section>
              <h4>Extrator de dados</h4>
              <div className='img-div2'>
                <img src={dumperPage} />
              </div>
              <strong><p style={{color: 'red'}}>1 - Fonte</p></strong>
              <p>Fonte a aplicar na busca, 
              após a escolha serão mostradas todas as opções de filtros, 
              inputs e outputs disponiveis na fonte a pesquisar</p>
              <br />

              <strong><p style={{color: 'red'}}>2 - Filtro</p></strong>
              <p>O filtro apenas está disponivel em certas fontes, dentro das quais estarão disponiveis as pesquisas as tabelas de diarias, semanais ou mensais</p>
              <br />

              <strong><p style={{color: 'red'}}>3 - Seleção de data e pesquisa</p></strong>
              <p>Dentro desta secção encontram-se os filtros de pesquisa entre datas e qual o tipo de data a procurar o que resulta da pesquisa</p>
              <strong><p> Ex: "procura por data de OT com inicio 'x' e fim 'y' "</p></strong>
              <br />

              <strong><p style={{color: 'red'}}>4 - Escolha de campos a inserir e colunas a apresentar no download</p></strong>
              <p> Inputs -> Filtros para procura de campos especificos </p>
              <strong><p>Ex: "procura por data de OT com inicio 'x' e fim 'y' onde a OT = 1-YYYY"</p></strong>
              <p> Outputs -> Filtros para extração de quais os campos a extrair </p>
              <strong><p> Ex: "Extrai os campos Conta Serviço, Comentários, NIF onde a procura por data de OT com inicio 'x' e fim 'y' onde a OT = 1-YYYY"</p></strong>
              <br />
            </section>
          )
        : showPageDetail === 'navbar'
        ? (
            <section>
              <h4>Barra de navegação</h4>
              <div>
                <img src={navbarClosed} />
                <br />
                <img style={{marginTop: '20px', marginLeft: '20px'}} src={navbarOpened} />
              </div>
              <br />
              <strong><p style={{color: 'red'}}>1 - Botão de menu</p></strong>
              <p>Botão de navegação entre páginas ao pressionar disponibiliza as possibilidades de navegação entre páginas</p>
              <br />
              <strong><p style={{color: 'red'}}>2 - Opção de procura</p></strong>
              <p>Desativo temporariamente</p>
              <br />
              <strong><p style={{color: 'red'}}>3 - Hiperlink de navegação entre páginas</p></strong>
              <p>Ao clicar na ligação pretendida é redirecionado para a página em questão</p>
            </section>
          )
        : null;

    return (
      <div className='main-div'>
        <NavBar />
        <h1>{title}</h1>
        <h4 style={{margin: '0px auto'}}>Funcionalidades e páginas</h4>
        <ul className='mainPage-ul'>
          <li onClick={this.showPageInfo.bind(null, 'reporting')}>
            Reporting
          </li>
          <li onClick={this.showPageInfo.bind(null, 'dumper')}>
            Extrator de dados
          </li>
          <li onClick={this.showPageInfo.bind(null, 'navbar')}>
            Barra de navegação
          </li>
        </ul>
        {showPages}
      </div>
    );
  }
}
