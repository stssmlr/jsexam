const api = 'https://dummyjson.com/products';
const list = document.querySelector('#products-list');
const loadBtn = document.querySelector('#loadBtn');
// const categoryBtn = document.querySelector('#categoryBtn');

const pagination = {
    skip: 0,
    limit: 4,
    total: null,
    next() {
        this.skip += this.limit;
    }
}

async function loadProducts() {

    const response = await fetch(`${api}?limit=${pagination.limit}&skip=${pagination.skip}`); // GET
    pagination.next();
    list.innerHTML = ""
    console.log("Status: ", response.status);

    const data = await response.json();
    pagination.total = data.total;
    console.log(data);

    for (const i of data.products) {
        list.innerHTML += ` <div class="col">
                                <div class="card h-100" style="width: 18rem;">
                                    <img width="150" src="${i.thumbnail}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${i.title}</h5>
                                        <p class="card-text">${i.price}$ | ${i.category}</p>
                                        <a href="#" class="btn btn-success">Buy</a>
                                        <a href="#" id="addCart" class="btn btn-primary">Add to Cart</a>
                                    </div>
                                </div>
                            </div>`
    }
}

loadProducts();

loadBtn.onclick = () => {
    loadProducts();
}


// ----------------------- CATEGORIES -----------------------


document.addEventListener('DOMContentLoaded', (event) => {
    const items = document.querySelectorAll('.category-link');

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const category = item.textContent.trim().toLowerCase().replace(/ /g, '-');
            window.location.href = `products.html?category=${category}`;
        });
    });
});