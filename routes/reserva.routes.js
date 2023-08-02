// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

const router = require('express').Router();


// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Vista para todas las reservas
router.get('/', (_req, res) => {
    res.render("index"); })


// Formulario para crear una reserva
router.get('/nueva-reserva', (_req, res) => {
    res.render("nuevo");
  })

// Formulario para editar una reserva
router.get('/editar-reserva/:id', )

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
router.get('/api/',);
 
// Crear una reserva
router.post('/api/',);
 
// Actualizar una reserva
router.put('/api/:id',);
 
// Eliminar una reserva de forma lógica
router.delete('/api/:id',);

 
 module.exports = router;