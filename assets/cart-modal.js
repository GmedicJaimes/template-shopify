function openCartModal(event) {
  if(event) event.preventDefault();
  document.getElementById('cart-modal').classList.add('open');
  document.getElementById('cart-modal-overlay').classList.add('open');
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