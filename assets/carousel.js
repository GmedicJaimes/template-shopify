let currentIndex = 0;
const cardsToShow = 4;
const cardWidth = 316; // 300px card + 16px gap

document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('carousel-track');
  const cards = Array.from(track.children);
  const totalCards = cards.length;

  // Clona las primeras y últimas cards
  for (let i = 0; i < cardsToShow; i++) {
    track.appendChild(cards[i].cloneNode(true)); // clones al final
    track.insertBefore(cards[totalCards - 1 - i].cloneNode(true), track.firstChild); // clones al inicio
  }

  // Ajusta el scroll inicial para mostrar las cards originales
  currentIndex = cardsToShow;
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

  window.scrollCategories = function(direction) {
    currentIndex += direction;
    track.style.transition = 'transform 0.3s';
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Cuando termina la transición, si estamos en clones, saltamos sin animación
    track.addEventListener('transitionend', handleTransition, { once: true });
  };

  function handleTransition() {
    const total = track.children.length;
    if (currentIndex >= total - cardsToShow) {
      // Si llegamos a los clones del final, saltamos al original
      track.style.transition = 'none';
      currentIndex = cardsToShow;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    if (currentIndex < cardsToShow) {
      // Si llegamos a los clones del inicio, saltamos al original del final
      track.style.transition = 'none';
      currentIndex = total - cardsToShow * 2;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }
});