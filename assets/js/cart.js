let carrinho = [];
let total = 0;

  function adicionarAoCarrinho(nome, preco, imagem) {
    const itemIndex = carrinho.findIndex(item => item.nome === nome);
    if (itemIndex !== -1) {
      carrinho[itemIndex].quantidade++;
    } else {
      carrinho.push({ nome, preco, quantidade: 1, imagem });
    }
    total += preco;
    atualizarCarrinho();

    // Crie uma notificação
    const notification = document.createElement('div');
    notification.textContent = 'Item adicionado ao carrinho!';
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.right = '10px';
    notification.style.backgroundColor = 'hsl(31, 100%, 70%)';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1000';

    // Adicione a notificação ao corpo da página
    document.body.appendChild(notification);

    // Remova a notificação após 2 segundos
    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
  
  function aumentarQuantidade(index) {
    carrinho[index].quantidade++;
    total += carrinho[index].preco;
    atualizarCarrinho();
  }
  
  function diminuirQuantidade(index) {
    if (carrinho[index].quantidade > 1) {
      carrinho[index].quantidade--;
      total -= carrinho[index].preco;
      atualizarCarrinho();
    }
  }
  
  function removerItem(index) {
    const item = carrinho.splice(index, 1)[0];
    total -= item.preco * item.quantidade;
    atualizarCarrinho();

    if (carrinho.length === 0) {
        const cartPricesDiv = document.getElementById('cart__prices');
        if (cartPricesDiv) {
          cartPricesDiv.remove();
        }
    }
  }

  function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('cart__container');
    carrinhoDiv.innerHTML = '';
    carrinho.forEach((item, index) => {
      const produtoHtml = `
        <article class="cart__card">
          <div class="cart__box">
            <img src="${item.imagem}" alt="" class="cart__img">
          </div>
          <div class="cart__details"> 
            <h3 class="cart__title">${item.nome}</h3>
            <span class="cart__price">R$ ${item.preco}</span>
  
            <div class="cart__amount">
              <div class="cart__amount-content">
                <span class="cart__amount-box">
                  <i class='bx bx-minus' onclick="diminuirQuantidade(${index})"></i>
                </span>
  
                <span class="cart__amount-number">${item.quantidade}</span>
  
                <span class="cart__amount-box">
                  <i class='bx bx-plus' onclick="aumentarQuantidade(${index})"></i>
                </span>
              </div>
  
              <i class='bx bx-trash-alt cart__amount-trash' onclick="removerItem(${index})"></i>
            </div>
          </div>
        </article>
      `;
      carrinhoDiv.innerHTML += produtoHtml;
    });

    const cartPricesDiv = document.getElementById('cart__prices');
  if (cartPricesDiv) {
    cartPricesDiv.innerHTML = `
      <p>Quantidade: ${carrinho.reduce((acc, item) => acc + item.quantidade, 0)}</p>
      <p>Total: R$ ${total.toFixed(2)}</p>
    `;
  } else if (carrinho.length > 0) {
    const cart = document.getElementById('cart');
    const cartPricesHtml = `
      <div class="cart__prices" id="cart__prices">
        <p>Quantidade: ${carrinho.reduce((acc, item) => acc + item.quantidade, 0)}</p>
        <p>Total: R$ ${total.toFixed(2)}</p>
      </div>
    `;
    cart.insertAdjacentHTML('beforeend', cartPricesHtml);
  }
}

function finalizarCompra() {
  alert("Compra finalizada!");
  carrinho = [];
  total = 0;
  atualizarCarrinho();
}
