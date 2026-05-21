const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('../db/connection');


// =========================
// REGISTRO DE USUARIOS
// =========================
router.post('/registro_usuario', async (req, res) => {

    const {
            nombre,
            apellido,
            documento,
            direccion,
            telefono,
            email,
            usuario,
            password,
            rol
    } = req.body;

    try {

        const passwordHash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuarios(
                nombre_usr,
                apellido_usr,
                documento_usr,
                direccion_usr,
                telefono_usr,
                email_usr,
                usuario_usr,
                password_usr,
                rol_usr
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        connection.query(
            sql,
            [nombre, apellido, documento, direccion, telefono ,email, usuario, passwordHash,             documento,
            rol],
            (error, resultado) => {

                if (error) {

                    console.log(error);
                    return res.json({
                        success: false,
                        mensaje: 'Error al registrar usuario'
                    });
                }

                res.json({
                    success: true,
                    mensaje: 'Usuario registrado correctamente'
                });

            }
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            mensaje: 'Error servidor'
        });
    }

});





// =========================
// REGISTRO USUARIO
// =========================
router.post('/registro', async (req, res) => {

    const {
        nombre,
        apellido,
        email,
        usuario,
        password
    } = req.body;

    try {

        const passwordHash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuarios(
                nombre_usr,
                apellido_usr,
                email_usr,
                usuario_usr,
                password_usr
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        connection.query(
            sql,
            [nombre, apellido, email, usuario, passwordHash],
            (error, resultado) => {

                if (error) {

                    console.log(error);
                    return res.json({
                        success: false,
                        mensaje: 'Error al registrar usuario'
                    });
                }

                res.json({
                    success: true,
                    mensaje: 'Usuario registrado correctamente'
                });

            }
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            mensaje: 'Error servidor'
        });
    }

});


// =========================
// LOGIN
// =========================
router.post('/login', (req, res) => {

    const { usuario, password } = req.body;

    const sql = `
        SELECT *
        FROM usuarios
        WHERE usuario_usr = ?
    `;

    connection.query(sql, [usuario], async (error, resultados) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                mensaje: 'Error servidor'
            });
        }

        if (resultados.length === 0) {

            return res.json({
                success: false,
                mensaje: 'Usuario no encontrado'
            });
        }

        const usuarioDB = resultados[0];
        const passwordCorrecta = await bcrypt.compare(
    password,
    usuarioDB.password_usr
);

        if (passwordCorrecta) {

            res.json({
                success: true,
                mensaje: 'Login correcto'
            });

        } else {

            res.json({
                success: false,
                mensaje: 'Contraseña incorrecta'
            });
        }

    });

});










// EXPORTAR RUTAS
module.exports = router;