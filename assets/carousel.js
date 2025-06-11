let currentIndex = 0;
const cardsToShow = 4;
const cardWidth = 316; // 300px card + 16px gap

function scrollCategories(direction) {
  const track = document.getElementById('carousel-track');
  const totalCards = track.children.length;

  currentIndex += direction;

  // Carrusel infinito hacia la derecha
  if (currentIndex > totalCards - cardsToShow) {
    currentIndex = 0;
  }
  // Carrusel infinito hacia la izquierda
  if (currentIndex < 0) {
    currentIndex = totalCards - cardsToShow;
    if (currentIndex < 0) currentIndex = 0; // Por si hay menos de 4 cards
  }

  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

document.addEventListener('DOMContentLoaded', function() {
  scrollCategories(0);
});