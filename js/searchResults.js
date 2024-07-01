document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');

    if (query) {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
            const data = await response.json();
            const products = data.products;
            
            const searchResults = document.getElementById('search-results');
            searchResults.innerHTML = '';
            
            if (products.length > 0) {
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
                    searchResults.appendChild(productItem);
                });
            } else {
                searchResults.innerHTML = '<p>No products found.</p>';
            }

        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    } else {
        document.getElementById('search-results').innerHTML = '<p>No search query provided.</p>';
    }
});
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}