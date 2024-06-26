document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (productId) {
        try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`);
            const product = await response.json();
            
            const productDetails = document.getElementById('product-details');
            productDetails.innerHTML = `
                <div class="card">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h1 class="card-title">${product.title}</h1>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Price: $${product.price}</p>
                        <p class="card-text">Category: ${product.category}</p>
                        <a href="#" class="btn btn-success">Buy Now</a>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    } else {
        document.getElementById('product-details').textContent = 'Product not found';
    }
});