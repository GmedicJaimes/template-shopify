function openCartModal(event) {
  if(event) event.preventDefault();
  document.getElementById('cart-modal').classList.add('open');
  document.getElementById('cart-modal-overlay').classList.add('open');
  updateCartModal();
}
function closeCartModal() {
  document.getElementById('cart-modal').classList.remove('open');
  document.getElementById('cart-modal-overlay').classList.remove('open');
}
document.addEventListener('DOMContentLoaded', function() {
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', openCartModal);
  }
});


document.addEventListener('DOMContentLoaded', function() {
  // Productos hardcodeados (deben coincidir con los del HTML)
  const products = [
    {
      id: 1,
      name: "Crema Facial Hidratante",
      price: 12000,
      image: "producto1.jpg"
    },
    {
      id: 2,
      name: "Sérum Antiedad",
      price: 18500,
      image: "producto2.webp"
    },
    {
      id: 3,
      name: "Gel Limpiador",
      price: 9900,
      image: "producto3.webp"
    },
    {
      id: 4,
      name: "Protector Solar SPF50",
      price: 15000,
      image: "producto4.jpg"
    },
    {
      id: 5,
      name: "Tónico Facial Refrescante",
      price: 8500,
      image: "producto5.jpg"
    }
  ];

  // Manejar clicks en los botones "Add"
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-product'));
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const prod = products.find(p => p.id === id);
      const existing = cart.find(p => p.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ ...prod, qty: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartIcon();
      openCartModal(); // <-- Abre el modal al agregar
    });
  });

  // Actualiza el contador del carrito en el header
  function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((sum, p) => sum + p.qty, 0);
    const sup = document.querySelector('#cart-icon sup');
    if (sup) {
      sup.textContent = count > 0 ? count : '';
    }
  }

  window.updateCartModal = function() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.querySelector('.cart-items');
  const totalContainer = document.querySelector('.cart-total');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = "<p>Tu carrito está vacío.</p>";
    if (totalContainer) totalContainer.innerHTML = "";
    return;
  }
  let html = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    html += `
      <div class="cart-card">
        <img src="/assets/${item.image}" width="60" height="60" style="border-radius:8px;margin-right:10px;">
        <div class="cart-card-info">
          <strong>${item.name}</strong><br>
          Cantidad: ${item.qty}<br>
          <span class="cart-card-price">$${(item.price * item.qty).toLocaleString()}</span>
        </div>
        <button class="remove-from-cart" data-id="${item.id}" style="margin-left:10px;background:#e53935;color:#fff;border:none;border-radius:4px;padding:4px 8px;cursor:pointer;">X</button>
      </div>
    `;
  });
  container.innerHTML = html;
  console.log("Total calculado:", total);
  if (totalContainer) {
    totalContainer.innerHTML = `<p style="font-weight:bold;margin-top:10px;">Total: $${cart.reduce((sum, p) => sum + p.price * p.qty, 0).toLocaleString()}</p>`;
  }

  // ¡ASIGNA AQUÍ los eventos de eliminar!
  document.querySelectorAll('.remove-from-cart').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
        updateCartModal();
      });
    });
  };

  // Inicializa el contador y el modal al cargar
  updateCartIcon();
  updateCartModal();

  //Total: $${cart.reduce((sum, p) => sum + p.price * p.qty, 0).toLocaleString()}
}); 