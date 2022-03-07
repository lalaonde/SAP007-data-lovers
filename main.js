import {
  filtroGenero,
  statusFilter,
  speciesFilter,
  orderAlfaFilter,
  calcularPorcentagem,
  searchName,
} from "./data.js";

import dados from "./data/rickandmorty/rickandmorty.js";

function printarCards(dados) {
  document.getElementById("container-dos-cards").innerHTML = dados //innerHTML para escrever o resultado no doc hmtl. Adiciona html (as tags abaixo) e texto.
    .map(
      (item) => ` 
   
      <div class="card-info">
        <img src="${item.image}">
        <div class="info-lista">
            <p class="p-lista"><strong>Nome: </strong>${item.name}</p><br>
            <p class="p-lista"><strong>Gênero: </strong>${item.gender}</p><br>      
            <p class="p-lista"><strong>Status: </strong>${item.status}</p><br>
            <p class="p-lista"><strong>Espécie: </strong>${item.species}</p><br>
            <p class="p-lista"><strong>Origem: </strong>${item.origin.name}</p><br>
            <p class="p-lista"><strong>Localização: </strong>${item.location.name}</p><br>
            <p class="p-lista"><strong>Aparece em: </strong>${item.episode.length} episódios</p><br>
        </div> 
     </div>
    
  `
    )
    .join("");
}

printarCards(dados.results);

///// PEGANDO OS SELETORES
const selecaoGenero = document.getElementById("gender-filter");
const statusSelect = document.getElementById("status-filter");
const speciesSelect = document.getElementById("species-filter");
const orderSelectAz = document.getElementById("alfa-order-filter");
const texto = document.getElementById("porcentagem-filtro");
const buscaNomePersonagem = document.getElementById("text-search");

///// FUNÇOES
function mostrarPorcentagem(dados) {
  texto.innerHTML = `Essa categoria representa ${dados}`;
}

function imprimirFiltroGenero(e) {
  const resultadoGenero = filtroGenero(dados.results, e.target.value); 
  //e.target.value -> esse evento vai atrás do "alvo" selecionado no input do select
  const porcentagemText = `${calcularPorcentagem(
    dados.results.length,
    resultadoGenero.length
  )}% dos personagens`;
  mostrarPorcentagem(porcentagemText);
  return printarCards(resultadoGenero);
}
selecaoGenero.addEventListener("change", imprimirFiltroGenero);
/* ESCUTADOR DEVOLVE O RESULTADO DA FUNCAO PARA O SELETOR e quem faz aparecer na tela é o "change"
"change" -> esse evento aplica alguma mudança após selecionar um valor no select e 
devolve para a tela essa mudança */

function printStatusFilter(e) {
  const statusResult = statusFilter(dados.results, e.target.value);
  const porcentagemText = `${calcularPorcentagem(
    dados.results.length,
    statusResult.length
  )}% dos personagens`;
  mostrarPorcentagem(porcentagemText);
  return printarCards(statusResult);
}
statusSelect.addEventListener("change", printStatusFilter);

function printSpeciesFilter(e) {
  const speciesResult = speciesFilter(dados.results, e.target.value);
  const porcentagemText = `${calcularPorcentagem(
    dados.results.length,
    speciesResult.length
  )}% dos personagens`;
  mostrarPorcentagem(porcentagemText);
  return printarCards(speciesResult);
}
speciesSelect.addEventListener("change", printSpeciesFilter);

function printOrderFilterAz(e) {
  const order = orderAlfaFilter(dados.results, e.target.value);
  return printarCards(order);
}
orderSelectAz.addEventListener("change", printOrderFilterAz);

// BUSCAR NOMES PERSONAGENS
function buscarNomePersonagens(e) {
  const nomePersonagens = searchName(dados.results, e.target.value);
  return printarCards(nomePersonagens);
}
buscaNomePersonagem.addEventListener("keyup", buscarNomePersonagens); 
// keyup pega o valor de cada tecla que o usuário clicar

/* esse arquivo é o DOM - está em interação com o htlm

- e.target.value = ele quem vai buscar os valores alvos definidos no selector pelo user
- vai atrás do valor inserido e retorna o próprio elemento que disparou o evento

- addEventListener = O método addEventListener anexa um manipulador de eventos 
(event handler) a um elemento. No caso, ele vai anexar a função “imprimirFiltroGenero” 
à constante “selecaoGenero”, que é um elemento HTML (getElementoById).
- aqui o "escutador / listener" vai chamar a função "imprimirFiltroGenero" sempre que houver
a "seleçãoGenero" (que recebe um valor html - quando o user manipular o filtro do genero)
*/
