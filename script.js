let botoes = document.querySelectorAll(".fase");
let itens = document.querySelectorAll(".item");
let celulares = document.querySelectorAll(".celular");
let money = 3200;
let saldo_restante = 0;
let valor_celular = 0;
let valor_investido = 0;
let saldo_em_conta = document.querySelector(".saldo_em_conta");
let celularComprado = null;
let investimentosFeitos = [];

function selecionar(clicado) {
  botoes.forEach(botao => botao.classList.remove("active")); 
  clicado.classList.add("active"); 
  
  let index_fase = clicado.dataset.index;
  itens.forEach(item => item.classList.remove("active")); 
  itens[index_fase].classList.add("active"); 
}

function confirmarEscolha() {
  celulares.forEach(celular => {
    celular.style.visibility = "hidden";
  });

  let escolha = document.getElementById("escolha_celular");
  let optionSelecionada = escolha.options[escolha.selectedIndex];
  let index_celular = optionSelecionada.dataset.index;

  if (index_celular) {
    celulares[index_celular].style.visibility = "visible";
  }

  let resultado = document.getElementById("resultado_escolha");
  ;

  if (index_celular == 0) {
  valor_celular = 3899;
  celularComprado = { nome: "REDMAGIC 10 Air", valor: valor_celular };
} else if (index_celular == 1) {
  valor_celular = 1862.10;
  celularComprado = { nome: "iPhone 11 Usado", valor: valor_celular };
} else if (index_celular == 2) {
  valor_celular = 1300;
  celularComprado = { nome: "Redmi 13C", valor: valor_celular };
} else if (index_celular == 3) {
  valor_celular = 699.99;
  celularComprado = { nome: "Samsung A06", valor: valor_celular };
} else {
    celulares.forEach(celular => {
      celular.style.visibility = "visible";
    });
    return;
  }

  let local_result = document.getElementById("local_result");
  saldo_restante = money - valor_celular;
  local_result.innerText = saldo_restante;
  resultado.style.display = "block";

  if (index_celular == 100) {
    resultado.style.display = "none";
  }
}

document.querySelectorAll(".investimento_item button").forEach(botao => {
  botao.addEventListener("click", function () {
    let index_investimento = parseInt(this.dataset.index);
    let informacoes_investimentos = document.querySelectorAll(".interface_investimento_item");

    informacoes_investimentos.forEach(investimento => {
      investimento.classList.remove("informar");
    });

    informacoes_investimentos[index_investimento].classList.add("informar");
    saldo_em_conta.innerText = saldo_restante;
  });
});

function fecharInformacoes() {
  document.querySelectorAll(".interface_investimento_item").forEach(item => {
    item.classList.remove("informar");
  });
}

function confirmar_investimento(event) {
  const botao = event.target;
  const bloco = botao.closest(".interface_investimento_item");

  const input = bloco.querySelector(".valor_a_investir");
  const valor_a_investir = parseFloat(input.value);
  const resposta = bloco.querySelector(".mensagem_resultado");
  const saldoSpan = bloco.querySelector(".saldo_em_conta");

  if (isNaN(valor_a_investir) || valor_a_investir <= 0) {
    resposta.innerText = "Digite um valor válido para investir.";
    return;
  }

  if (valor_a_investir > saldo_restante) {
    resposta.innerText = "Investimento cancelado. Saldo insuficiente.";
    return;
  }

  const nome_investimento = bloco.querySelector(".sobre h1")?.innerText || "Investimento";

  investimentosFeitos.push({
    nome: nome_investimento,
    valor: valor_a_investir
  });

  saldo_restante -= valor_a_investir;
  valor_investido += valor_a_investir;

  saldoSpan.innerText = saldo_restante.toFixed(2);

  bloco.querySelector(".investir").style.display = "none";
  botao.style.display = "none";

  resposta.innerText = "Investimento efetuado com sucesso!";
}


// Função que gera o extrato de gastos
function gerarExtrato() {
  const lista = document.getElementById("lista_gastos_real");
  const totalText = document.getElementById("total_gastos_real");
  lista.innerHTML = "";

  let total = 0;

  if (celularComprado) {
    const li = document.createElement("li");
    li.textContent = `Celular: ${celularComprado.nome} - R$ ${celularComprado.valor.toFixed(2)}`;
    lista.appendChild(li);
    total += celularComprado.valor;
  }

  investimentosFeitos.forEach(inv => {
    const li = document.createElement("li");
    li.textContent = `Investimento: ${inv.nome} - R$ ${inv.valor.toFixed(2)}`;
    lista.appendChild(li);
    total += inv.valor;
  });

  if (total === 0) {
    const li = document.createElement("li");
    li.textContent = "Nenhuma transação registrada.";
    lista.appendChild(li);
  }

  totalText.textContent = `Total Gasto: R$ ${total.toFixed(2)}`;
}

// Função que gera a conclusão do planejamento financeiro
function gerarConclusao() {
  let texto = "";

  if (valor_celular >= 3000) {
    texto += "Você optou por um celular caro, o que compromete uma grande parte do seu orçamento. ";
  } else if (valor_celular >= 1500) {
    texto += "Você escolheu um celular de valor mediano, equilibrando custo e qualidade. ";
  } else {
    texto += "Você fez uma escolha econômica de celular, mantendo mais recursos disponíveis. ";
  }

  if (valor_investido > 0) {
    texto += "Você realizou investimentos, o que demonstra um bom planejamento financeiro. ";
  } else {
    texto += "Nenhum valor foi investido, o que pode ser um risco em situações inesperadas. ";
  }

  if (saldo_restante < 200) {
    texto += "Seu saldo final está muito baixo. Cuidado para não ficar sem recursos antes do próximo recebimento.";
  } else if (saldo_restante >= 200 && saldo_restante <= 1000) {
    texto += "Você manteve um saldo razoável em conta, o que pode ajudar em emergências.";
  } else {
    texto += "Você conseguiu manter um bom saldo final, mostrando controle e inteligência financeira.";
  }

  document.getElementById("texto_conclusao").innerText = texto;
}

// Muda o tema da página
document.getElementById("toggleTema").addEventListener("click", function () {
    document.body.classList.toggle("tema-claro");

    
    const btn = document.getElementById("toggleTema");
    if (document.body.classList.contains("tema-claro")) {
        btn.innerText = "🌞 Tema";
    } else {
        btn.innerText = "🌙 Tema";
    }
});

document.querySelectorAll(".confirmar_investimento").forEach(botao => {
  botao.addEventListener("click", confirmar_investimento);
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".confirmar_investimento").forEach(botao => {
    botao.addEventListener("click", confirmar_investimento);
  });
});
