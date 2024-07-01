document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    console.log('Search form:', searchForm);
    console.log('Search input:', searchInput);

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    } else {
        console.error('Search form or input not found');
    }
});

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}