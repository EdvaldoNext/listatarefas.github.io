let contador = 0;
const input = document.getElementById('inputTarefa');
const btnAdd = document.getElementById('btn-add');
const main = document.getElementById('arealista');

// Adiciona evento de click ao botão
btnAdd.addEventListener('click', addTarefa);

// Função para adicionar tarefa
function addTarefa() {
  const valorInput = input.value.trim();
  
  if (valorInput) {
    ++contador;
    const itemNovo = `
      <div id="${contador}" class="item">
        <div class="item-icone" onclick="marcarTarefa(${contador})">
          <i id="icone_${contador}" class="mdi mdi-circle-outline"></i>
        </div>
        <div class="item-nome" onclick="marcarTarefa(${contador})">${valorInput}</div>
        <div class="item-botao">
          <button data-id="${contador}" class="delete" onclick="deletar(${contador})">
            <i class="mdi mdi-delete"></i> Deletar
          </button>
        </div>
      </div>
    `;
    main.innerHTML += itemNovo;
    input.value = "";
    input.focus();
  }
}

// Função para deletar tarefa
function deletar(id) {
  const tarefa = document.getElementById(id);
  tarefa.remove();
}

// Função para marcar tarefa
function marcarTarefa(id) {
  const item = document.getElementById(id);
  const icone = document.getElementById('icone_' + id);
  
  if (!item.classList.contains('clicado')) {
    item.classList.add('clicado');
    icone.classList.remove('mdi-circle-outline');
    icone.classList.add('mdi-check-circle');

    item.parentNode.appendChild(item);

  } else {
    item.classList.remove('clicado');
    icone.classList.add('mdi-circle-outline');
    icone.classList.remove('mdi-check-circle');
  }
}

// Adiciona evento de keyup ao input
input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTarefa();
  }
});


//      codigo para nao se perder os dados durante a atualização do navegador


function salvarTarefas() {
  const tarefas = [];
  const itens = document.querySelectorAll('.item');
  itens.forEach((item) => {
    tarefas.push(item.children[1].innerText);
  });
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Salvar compras
function salvarCompras() {
  const compras = [];
  const listaCompras = document.getElementById('listaCompras');
  const itens = listaCompras.children;
  for (let i = 0; i < itens.length; i++) {
    const produto = itens[i].children[0].innerText.split(' - ')[0];
    const quantidade = itens[i].children[0].innerText.split(' - ')[1].split(' x ')[0];
    const valor = itens[i].children[0].innerText.split(' = ')[1].replace('R$', '');
    compras.push({ produto, quantidade, valor });
  }
  localStorage.setItem('compras', JSON.stringify(compras));
  localStorage.setItem('total', total);
}

// Carregar tarefas
function carregarTarefas() {
  const dadosSalvos = localStorage.getItem('tarefas');
  if (dadosSalvos) {
    const tarefasSalvas = JSON.parse(dadosSalvos);
    tarefasSalvas.forEach((tarefa, index) => {
      const itemNovo = `
        <div id="${index+1}" class="item">
          <div class="item-icone" onclick="marcarTarefa(${index+1})">
            <i id="icone_${index+1}" class="mdi mdi-circle-outline"></i>
          </div>
          <div class="item-nome" onclick="marcarTarefa(${index+1})">${tarefa}</div>
          <div class="item-botao">
            <button data-id="${index+1}" class="delete" onclick="deletar(${index+1})">
              <i class="mdi mdi-delete"></i> Deletar
            </button>
          </div>
        </div>
      `;
      document.getElementById('arealista').innerHTML += itemNovo;
    });
  }
}

// Carregar compras
function carregarCompras() {
  const comprasSalvas = localStorage.getItem('compras');
  if (comprasSalvas) {
    const comprasSalvasJSON = JSON.parse(comprasSalvas);
    comprasSalvasJSON.forEach((compra, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${compra.produto} - ${compra.quantidade} x R$${compra.valor.toFixed(2)} = R$${(compra.quantidade * compra.valor).toFixed(2)}
        <button class="remover" onclick="removerProduto(this)">Remover</button>
      `;
      document.getElementById('listaCompras').appendChild(li);
    });
    total = parseFloat(localStorage.getItem('total'));
    document.getElementById('total').innerText = total.toFixed(2);
  }
}

// Chamadas
carregarTarefas();
carregarCompras();

// Salvar dados após adicionar/deletar tarefa ou produto
document.addEventListener('DOMContentLoaded', () => {
  const btnAdd = document.getElementById('btn-add');
  btnAdd.addEventListener('click', salvarTarefas);

  const removerButtons = document.querySelectorAll('.remover');
  removerButtons.forEach((button) => {
    button.addEventListener('click', salvarCompras);
  });

  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', salvarTarefas);
  });

  const adicionarProdutoButton = document.getElementById('adicionar-produto');
  adicionarProdutoButton.addEventListener('click', salvarCompras);
});



