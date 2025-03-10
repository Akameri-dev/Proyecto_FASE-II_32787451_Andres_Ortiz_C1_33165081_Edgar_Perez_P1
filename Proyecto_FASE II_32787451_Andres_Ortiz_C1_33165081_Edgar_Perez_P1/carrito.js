const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});


const cartInfo = document.querySelector('.cart-products');
const rowProducts = document.querySelector('.row-products');

const productsList = document.querySelector('.container-items');

let allProducts = [];

const valorTotal = document.querySelector('.Total-pagar');

const countProducts = document.querySelector('#contador-productos');

productsList.addEventListener('click', (e) => {

    if (e.target.classList.contains('btn-add-cart')) {
       const product = e.target.parentElement;
       
       const infoProduct = {
         quantity: 1,
         title: product.querySelector('h2').textContent,
         price: product.querySelector('p').textContent
       };

       const exists = allProducts.some(product => product.title === infoProduct.title);
       
         if (exists) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
         });

         allProducts = [...products];
         } else {
            allProducts = [...allProducts, infoProduct];
         }

         showHTML();
    }
});

rowProducts.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('h2').textContent;
        allProducts = allProducts.filter(product => product.title !== title);
    }
    showHTML();
}
);

const showHTML = () => {

    rowProducts.innerHTML = '';
    let Total = 0;
    let totalofProducts = 0;


 allProducts.forEach(product => {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add('cart-product');

    containerProduct.innerHTML = `

    <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <h2 class="titulo-producto-carrito">${product.title}</h2>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" class="icon-close">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
              </svg> 
    `;
      
    rowProducts.appendChild(containerProduct);

    const priceNumber = parseFloat(product.price.replace(/[^0-9.-]+/g,""));
    Total = Total + product.quantity * priceNumber;
    
    totalofProducts = totalofProducts + product.quantity;
    });
    
    valorTotal.innerText = `$${Total.toFixed(2)}`;
    countProducts.innerText = totalofProducts;

 };