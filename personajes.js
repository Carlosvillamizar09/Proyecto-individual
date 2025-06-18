document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorPersonajes");
  const modal = document.getElementById("modalPersonaje");
  const modalContenido = document.getElementById("infoPersonaje");
  const cerrarBtn = document.getElementById("cerrarModal");

  const inputBuscador = document.getElementById("buscadorPersonaje");
  const listaSugerencias = document.getElementById("sugerencias");

  let personajesGlobal = [];

  fetch("personajes.json")
    .then(response => response.json())
    .then(personajes => {
      personajesGlobal = personajes;

      personajes.forEach(personaje => {
        const card = document.createElement("div");
        card.className = "tarjeta";

        const imagenRuta = `img/personajes/${personaje.id}.jpg`;

        card.innerHTML = `
          <img src="${imagenRuta}" alt="${personaje.nombre}" onerror="this.src='img/default.jpg'">
          <div class="tarjeta-contenido">
            <h2>${personaje.nombre}</h2>
          </div>
        `;

        card.addEventListener("click", () => mostrarModal(personaje));

        contenedor.appendChild(card);
      });

      // Autocompletado
      inputBuscador.addEventListener("input", () => {
        const texto = inputBuscador.value.toLowerCase();
        listaSugerencias.innerHTML = "";

        if (texto === "") {
          listaSugerencias.classList.add("oculto");
          return;
        }

        const filtrados = personajes.filter(p =>
          p.nombre.toLowerCase().includes(texto)
        );

        filtrados.forEach(p => {
          const item = document.createElement("li");
          item.textContent = p.nombre;
          item.addEventListener("click", () => {
            inputBuscador.value = "";
            listaSugerencias.classList.add("oculto");
            mostrarModal(p);
          });
          listaSugerencias.appendChild(item);
        });

        listaSugerencias.classList.toggle("oculto", filtrados.length === 0);
      });

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".barra-navegacion")) {
          listaSugerencias.classList.add("oculto");
        }
      });
    })
    .catch(error => console.error("Error al cargar los personajes:", error));

  cerrarBtn.addEventListener("click", () => {
    modal.classList.add("oculto");
  });

  function mostrarModal(personaje) {
    const imagenRuta = `img/personajes/${personaje.id}.jpg`;
    modalContenido.innerHTML = `
      <h2>${personaje.nombre}</h2>
      <p><strong>ID:</strong> ${personaje.id}</p>
      <p><strong>Clan:</strong> ${personaje.clan}</p>
      <p><strong>Afiliación:</strong> ${personaje.afiliacion}</p>
      <p><strong>Rango:</strong> ${personaje.rango}</p>
      <p><strong>Jutsu Favorito:</strong> ${personaje.jutsu_favorito}</p>
      <img src="${imagenRuta}" alt="${personaje.nombre}" class="modal-img" onerror="this.src='img/default.jpg'">
    `;
    modal.classList.remove("oculto");
  }
});
