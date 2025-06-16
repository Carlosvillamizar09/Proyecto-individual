document.addEventListener("DOMContentLoaded", () => {
    const siguiente = document.querySelector(".contenido");
    const videoTransicion = document.getElementById("videoTransicion");
    const introVideo = document.getElementById("introVideo");

    siguiente.addEventListener("click", () => {
        videoTransicion.style.display = "flex";
        introVideo.currentTime = 0;
        introVideo.muted = false; // Cambia a true si no quieres sonido
        introVideo.play();

        introVideo.addEventListener("ended", () => {
            videoTransicion.style.animation = "fadeOut 1s ease-in-out forwards";
            setTimeout(() => {
                window.location.href = "inicio.html";
            }, 1000); // Espera a que termine el fade antes de redirigir
        });
    });
});
