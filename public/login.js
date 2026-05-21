async function login(){

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const respuesta = await fetch('/auth/login', {

        method:'POST',

        headers:{
            'Content-Type':'application/json'
        },

        body: JSON.stringify({
            usuario,
            password
        })
    });

    const datos = await respuesta.json();

    const mensaje = document.getElementById('mensaje');

    if(datos.success){
        window.location.href = 'dashboard.html';
    }
    else{
        mensaje.style.color = 'red';
        mensaje.innerHTML = datos.mensaje;
    }
}