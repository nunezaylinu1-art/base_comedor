// CAMBIAR SECCIONES
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
}


// CARGAR MENÚ
function cargarMenu() {
  fetch('/api/menu')
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById('listaMenu');
      lista.innerHTML = '';

      data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
          <span>${item.detalle} - $${item.precio}</span>
          <button onclick="eliminar(${item.id})">❌</button>
        `;

        lista.appendChild(div);
      });
    });
}

// AGREGAR MENÚ
document.getElementById('formMenu').addEventListener('submit', e => {
  e.preventDefault();

  const nombre = document.getElementById('detalle').value;
  const precio = document.getElementById('precio').value;

  fetch('/api/menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ detalle, precio })
  }).then(() => {
    cargarMenu();
  });
});

// ELIMINAR
function eliminar(id) {
  fetch('/api/menu/' + id, { method: 'DELETE' })
    .then(() => cargarMenu());
}

// INIT
cargarMenu();




//REGISTRO DE USUARIOS
async function registrar(e){
    e.preventDefault();
    const nombre =
        document.getElementById('nombre').value;
    const apellido =
        document.getElementById('apellido').value;
    const documento =
        document.getElementById('documento').value;
    const direccion =
        document.getElementById('direccion').value;
    const telefono =
        document.getElementById('telefono').value;
    const email =
        document.getElementById('email').value;
    const usuario =
        document.getElementById('usuario').value;
    const password =
        document.getElementById('password').value;
     const rol =
        document.getElementById('rol').value;       
    const respuesta = await fetch('/auth/registro_usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            apellido,
            documento,
            direccion,
            telefono,
            email,
            usuario,
            password,
            rol
        })

    });

    const datos = await respuesta.json();

    alert(datos.mensaje);
}



// LOGOUT
function logout() {
  fetch('/api/auth/logout')
    .then(() => window.location.href = '/index.html');
}
