// React imports
import React, { Component } from 'react';

// Assets imports
import dumperPage from '../../assets/img/dumperPage.PNG';
import reporting from '../../assets/img/reporting.PNG';
import navbarOpened from '../../assets/img/navbarOpened.PNG';
import navbarClosed from '../../assets/img/navbarClosed.PNG';
import resumos from '../../assets/img/resumos.png';
import listagensPage from '../../assets/img/listagensPage.png';
import forms from '../../assets/img/forms.PNG';
import formsForm from '../../assets/img/forms_form.png';

// Custom imports
import NavBar from '../../components/NavBar/NavBar';

// CSS imports 
import './css/main.css';

export default class MainPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: `FAQ's`,
      showPageDetail: ''
    };
  }

  showPageInfo = page => {
    this.setState({ showPageDetail: page })
  }

  render () {
    const { title, showPageDetail } = this.state;
    const showPages = showPageDetail === 'Centro de conhecimento'
      ? (
          <section>
            <h4>Centro de conhecimento</h4>
            <div className='img-div1'>
              <img style={{margin: '0px auto'}} src={reporting} />
            </div>
            <strong><p style={{color: 'red'}}>1 - Filtro de texto</p></strong>
            <p>Possibilidade de filtrar os campos através de texto em todas as colunas</p>
            <br />

            <strong><p style={{color: 'red'}}>2 - Ordem </p></strong>
            <p>Opção para ordenar a coluna em questão</p>
            <p>A ordem apenas funciona para cada uma das colunas</p>
            <br />

            <strong><p style={{color: 'red'}}>3 - Relatórios</p></strong>
            <p>Ao selecionar a linha pretendida, é disponibilizado um link para download com o relatório pretendido </p>
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
        : showPageDetail === 'KPI´S I&M'
        ? (
          <section>
            <h4>KPI´S I&M</h4>
            <div>
              <img style={{marginTop: '20px', marginLeft: '20px'}} src={resumos} />
            </div>
            <br />
            <strong><p style={{color: 'red'}}>Resumos</p></strong>
            <p>Ao fazer login é redirecionado para a página de resumos</p>
            <br />
            <strong><p style={{color: 'red'}}>Opções</p></strong>
            <p>Para ver os resumos deverá selecionar uma das opções apresentadas</p>
            <br />
            <strong><p style={{color: 'red'}}>Ao selecionar uma opção</p></strong>
            <p>Após a selecção será apresentado os gráficos correspondentes para cada opção</p>
          </section>
        )
        : showPageDetail === 'listagens'
        ? (
          <section>
            <h4>Listagens</h4>
            <div className='img-div2'>
              <img src={listagensPage} />
            </div>
            <strong><p style={{color: 'red'}}>1 - Fonte</p></strong>
            <p>Fonte a aplicar na busca, após a escolha as tabelas e campos a pesquisar disponiveis ficam visíveis</p>
            <br />

            <strong><p style={{color: 'red'}}>2 - Filtro</p></strong>
            <p>O filtro apenas está disponivel em certas fontes, dentro das quais estarão disponiveis as pesquisas as tabelas de diarias, semanais ou mensais</p>
            <br />

            <strong><p style={{color: 'red'}}>3 - Pesquisa por campo</p></strong>
            <p>Campo a pesquisar</p>
            <strong><p> Ex: "pesquisar por número de OT</p></strong>
            <br />

            <strong><p style={{color: 'red'}}>4 - Botão para upload de listagem</p></strong>
            <p> Recebe uma listagem através de ficheiro .txt com os items a pesquisar </p>
            <br />

            <strong><p style={{color: 'red'}}>5 - Botão para iniciar a pesquisa</p></strong>
            <p>Botão que dá inicio à pesquisa após inserir os items pretendidos</p>
            <br />

            <strong><p style={{color: 'red'}}>6 - Outputs</p></strong>
            <p>Campos pretendidos na extração dos dados</p>
            <br />
          </section>
        )
        : showPageDetail === 'formulários'
        ? <section>
        <h4>Formulários</h4>
        <div className='img-div2'>
          <img src={forms} />
        </div>
        <div className='img-div2'>
          <img src={formsForm} />
        </div>
        <strong><p style={{color: 'red'}}>1 - Escolha de categoria</p></strong>
        <p>Campo com as opções disponiveis para cada categoria do formulário</p>
        <br />

        <strong><p style={{color: 'red'}}>2 - Escolha de formulário</p></strong>
        <p>Após a escolha da categoria são disponibilizados os formulários correspondente à categoria</p>
        <br />

        <strong><p style={{color: 'red'}}>3 - Pesquisa por filtros</p></strong>
        <p>Possibilidade de filtrar os campos por texto ou ordem crescente / decrescente</p>
        <br />

        <strong><p style={{color: 'red'}}>4 - Tabela de campos</p></strong>
        <p>Tabela onde são fornecidos os campos dos formulários a preencher</p>
        <p>Ao clicar na linha pretendida o formulário será disponibilizado</p>
        <br />

        <strong><p style={{color: 'red'}}>5 - Campos editaveis</p></strong>
        <p>Campos de formulário a alterar</p>
        <br />

        <strong><p style={{color: 'red'}}>6 - Detalhes</p></strong>
        <p>Ao premir o botão são disponibilizados campos extra que não existem na tabela</p>
        <br />

        <strong><p style={{color: 'red'}}>7 - Guardar</p></strong>
        <p>Botão para guardar as alterações feitas no formulário</p>
        <br />

        <strong><p style={{color: 'red'}}>8 - Fechar</p></strong>
        <p>Botão para fechar o formulário</p>
        <br />
      </section>
      : null

        const style = {
          cursor: 'pointer',
          borderBottom: '2px solid red',
          listStyle: 'none',
          margin: '20px'
        }

    return (
      <div className='main-div'>
        <NavBar />
        <h1><strong>{title}</strong></h1>
        <h4 style={{margin: '0px auto'}}>Funcionalidades e páginas</h4>
        <ul className='mainPage-ul'>
          <li style={style} onClick={this.showPageInfo.bind(null, 'Centro de conhecimento')}>
            Centro de conhecimento
          </li>
          <li style={style} onClick={this.showPageInfo.bind(null, 'dumper')}>
            Extrator de dados
          </li>
          <li style={style} onClick={this.showPageInfo.bind(null, 'navbar')}>
            Barra de navegação
          </li>
          <li style={style} onClick={this.showPageInfo.bind(null, 'KPI´S I&M')}>
            KPI´S I&M
          </li>
          <li style={style} onClick={this.showPageInfo.bind(null, 'listagens')}>
            Listagens
          </li>
          <li style={style} onClick={this.showPageInfo.bind(null, 'formulários')}>
            Formulários
          </li>
        </ul>
        {showPages}
      </div>
    );
  }
}
