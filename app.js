var mysql = require("mysql");

// Cargar menú dinámico
const menuContainer = document.getElementById('menu');

if (menuContainer) {
  fetch('/api/menu')
    .then(res => res.json())
    .then(data => {
      data.forEach((item, i) => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
          <h3>${item.nombre}</h3>
          <p>$${item.precio}</p>
        `;

        menuContainer.appendChild(div);

        // animación delay
        setTimeout(() => {
          div.classList.add('show');
        }, i * 200);
      });
    });
}  

const toggle = document.getElementById('toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Cambio de logo al hacer scroll (efecto pro)
const logo = document.getElementById('logo');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    logo.src = "./public/img/logo-rojo.png";
  } else {
    logo.src = ".public/img/logo-blanco.png";
  }
});