document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedorKekkei");
    const modal = document.getElementById("modalKekkei");
    const info = document.getElementById("infoKekkei");
    const cerrar = document.getElementById("cerrarModal");

    fetch("kekkei.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(kekkei => {
                const item = document.createElement("div");
                item.className = "kekkei-card";
                item.innerHTML = `
          <img src="img/kekkei/${kekkei.imagen}" alt="${kekkei.nombre}" class="kekkei-img">
          <h3>${kekkei.nombre}</h3>
        `;
                item.addEventListener("click", () => {
                    info.innerHTML = `
            <h2>${kekkei.nombre}</h2>
            <p><strong>Clan:</strong> ${kekkei.clan}</p>
            <p>${kekkei.descripcion}</p>
            <img src="img/kekkei/${kekkei.imagen}" alt="${kekkei.nombre}" class="modal-img" />
          `;
                    modal.classList.remove("oculto");
                });
                contenedor.appendChild(item);
            });
        });

    cerrar.addEventListener("click", () => {
        modal.classList.add("oculto");
    });
});
