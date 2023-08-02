// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

const ctrl = require('../controllers/reserva.controllers');

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
router.get('/editar-reserva/:id', (req, res) => {
    const reservaId = req.params.id;
    res.render("editar", { id: reservaId });
  }
  )

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
router.get('/api/', ctrl.index);
 
//obtener una reserva
router.get("/api/:id", ctrl.show)
// Crear una reserva
router.post('/api/', ctrl.store);
 
// Actualizar una reserva
router.put('/api/:id', ctrl.update);
 
// Eliminar una reserva de forma lógica
router.delete('/api/:id', ctrl.destroy);

 
 module.exports = router;