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

