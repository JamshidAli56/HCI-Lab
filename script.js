// Mobile Navigation Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.nav-buttons').classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Newsletter Form Submission
document.querySelector('.newsletter form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    alert(`Thanks for subscribing with ${email}! We'll keep you updated.`);
    this.reset();
});

// Removed Task Manager Functionality

// Add to Cart Functionality
let cart = [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = cart.length;
}

function showCartStatus(message) {
    let cartStatus = document.getElementById('cart-status');
    if (!cartStatus) {
        cartStatus = document.createElement('div');
        cartStatus.id = 'cart-status';
        cartStatus.style.position = 'fixed';
        cartStatus.style.top = '80px';
        cartStatus.style.right = '20px';
        cartStatus.style.background = '#4CAF50';
        cartStatus.style.color = '#fff';
        cartStatus.style.padding = '12px 20px';
        cartStatus.style.borderRadius = '6px';
        cartStatus.style.zIndex = '2000';
        cartStatus.setAttribute('role', 'status');
        document.body.appendChild(cartStatus);
    }
    cartStatus.textContent = message;
    cartStatus.style.display = 'block';
    setTimeout(() => { cartStatus.style.display = 'none'; }, 1800);
}

document.querySelectorAll('.btn-add-to-cart').forEach((btn) => {
    btn.addEventListener('click', function() {
        const productCard = btn.closest('.product-card');
        const name = productCard.querySelector('h3').textContent;
        const price = productCard.querySelector('p').textContent;
        cart.push({ name, price });
        updateCartCount();
        showCartStatus(`${name} added to cart!`);
    });
});

// Cart Modal Functionality
function renderCartModal() {
    let modal = document.getElementById('cart-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.right = '0';
        modal.style.width = '320px';
        modal.style.height = '100%';
        modal.style.background = '#fff';
        modal.style.boxShadow = '-2px 0 12px rgba(0,0,0,0.15)';
        modal.style.zIndex = '3000';
        modal.style.padding = '30px 20px 20px 20px';
        modal.style.overflowY = 'auto';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.transition = 'right 0.3s';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `<h2 style='margin-bottom:18px; color:#4CAF50;'>Your Cart</h2>`;
    if (cart.length === 0) {
        modal.innerHTML += `<p>Your cart is empty.</p>`;
    } else {
        modal.innerHTML += '<ul id="cart-list" style="list-style:none; padding:0;">' +
            cart.map((item, i) => `<li style='margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;'>${item.name} <span>${item.price}</span> <button aria-label='Remove from cart' style='background:#FF9800; color:#fff; border:none; border-radius:3px; padding:2px 8px; margin-left:10px; cursor:pointer;' onclick='removeFromCart(${i})'>Remove</button></li>`).join('') +
            '</ul>';
        // Calculate and show total
        const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.]/g, '')), 0);
        modal.innerHTML += `<div style='margin-top:15px; font-weight:bold; font-size:1.1rem;'>Total: $${total.toFixed(2)}</div>`;
    }
    modal.innerHTML += `<button id='close-cart-modal' style='margin-top:20px; background:#4CAF50; color:#fff; border:none; border-radius:5px; padding:10px 20px; cursor:pointer;'>Close</button>`;
    document.getElementById('close-cart-modal').onclick = () => { modal.style.display = 'none'; };
    modal.style.display = 'flex';
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCartModal();
};

document.getElementById('cart-icon').addEventListener('click', renderCartModal);

// Category filter functionality
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});