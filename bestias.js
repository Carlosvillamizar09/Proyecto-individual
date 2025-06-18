document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("listaBestias");

  fetch("bestias.json")
    .then(response => response.json())
    .then(bestias => {
      bestias.forEach(bestia => {
        const item = document.createElement("div");
        item.className = "bestia-item";

        item.innerHTML = `
          <img src="img/bestias/${bestia.id}.jpg" alt="${bestia.nombre}" class="bestia-img" onerror="this.src='img/default.jpg'">
          <div class="bestia-info">
            <h2>${bestia.nombre}</h2>
            <p><strong>Colas:</strong> ${bestia.colas}</p>
            <p><strong>Jinchūriki:</strong> ${bestia.jinchuriki}</p>
            <p><strong>Naturaleza de Chakra:</strong> ${bestia.naturaleza}</p>
          </div>
        `;

        item.addEventListener("click", () => {
          const rugido = new Audio(`sonidos/${bestia.id}.mp3`);
          rugido.play();
        });

        contenedor.appendChild(item);
      });
    })
    .catch(error => console.error("Error al cargar las bestias:", error));
});
