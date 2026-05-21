async function registrar(e){

    e.preventDefault();

    const nombre =
        document.getElementById('nombre').value;

    const apellido =
        document.getElementById('apellido').value;

    const email =
        document.getElementById('email').value;

    const usuario =
        document.getElementById('usuario').value;

    const password =
        document.getElementById('password').value;

    const respuesta = await fetch('/auth/registro', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            nombre,
            apellido,
            email,
            usuario,
            password
        })

    });

    const datos = await respuesta.json();

    alert(datos.mensaje);
}