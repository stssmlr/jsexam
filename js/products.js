document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    if (category) {
        document.getElementById('category-title').textContent = `Products in category: ${category}`;
        
        try {
            const response = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await response.json();
            const products = data.products;
            
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; 
            
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'col';
                productItem.innerHTML = `
                    <div class="card h-100" style="width: 18rem;">
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.price}$ | ${product.category}</p>
                            <a href="product.html?id=${product.id}" class="btn btn-success">Info</a>
                            <a href="#" class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</a>
                        </div>
                    </div>
                `;
                productList.appendChild(productItem);
            });

            
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productId = e.target.dataset.id;
                    addToCart(productId);
                });
            });

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    } else {
        document.getElementById('category-title').textContent = 'No category selected';
    }
});

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}