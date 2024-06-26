document.addEventListener('DOMContentLoaded', async () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    
    let total = 0;

    for (let productId of cart) {
        try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`);
            const product = await response.json();
            
            const cartItem = document.createElement('div');
            cartItem.className = 'col';
            cartItem.innerHTML = `
                <div class="card h-100" style="width: 18rem;">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.price}$ | ${product.category}</p>
                        <button class="btn btn-danger remove-from-cart" data-id="${product.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += product.price;

        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    cartTotalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });
});

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}