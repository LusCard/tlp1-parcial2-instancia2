// TODO: Crear controladores para cada una de las rutas de reserva.
const ctrl = {};

// ==========================================
//    Controladores para renderizar vistas
// ==========================================
// Obtener todas las reservas
// Formulario para crear una reserva
// Formulario para editar una reserva




// ==========================================
//     Controladores para CRUD de reservas
// ==========================================

// Obtener todas las reservas
ctrl.index = async (_req, res) => {
    try {
      const reservas = await Reserva.findAll();
      if (!reservas || reservas.length === 0) {
        throw {
          status: 404,
          message: "No hay reservas registrados aún.",
        };
      }
      return res.json(reservas);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || "Error interno del servidor",
      });
    }
  };

// Obtener una reserva
ctrl.show = async (req, res) => {
    const reservaId = req.params.id;
  
    try {
      const reserva = await Reserva.findByPk(reservaId);
  
      if (!reserva) {
        throw {
          status: 404,
          message: "No existe la reserva con el id " + reservaId,
        };
      }
  
      return res.json(reserva);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(error.message || "Error interno del servidor");
    }
  };
  

// Crear una reserva
ctrl.store = async (req, res) => {
    const { fullname, code, date } = req.body;
  
    try {
      const reserva = await Reserva.create({
        fullname,
        code,
        date
      });
  
      console.log(reserva);
  
      if (!reserva) {
        throw {
          status: 400,
          message: "No se pudo crear la reserva.",
        };
      }
  
      return res.json(reserva);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(error.message || "Error interno del servidor");
    }
  };

// Actualizar una reserva
ctrl.update = async (req, res) => {
    const reservaId = req.params.id;
    const { fullname, code, date } = req.body;
    try {
      const reserva = await Reserva.findByPk(reservaId);
      reserva.update({
        fullname,
        code,
        date,
      });
      return res.json(reserva);
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(error.message || "Error interno del servidor");
    }
  };

// Eliminar una reserva de forma lógica
ctrl.destroy = async (req, res) => {
    const reservaId = req.params.id;
    try {
      const reserva = await Reserva.destroy({
        where: {
          id: reservaId
        }
      });
      return res.json({ reserva, message: "Reserva eliminada correctamente." });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json(error.message || "Error interno del servidor");
    }
  };



module.exports = ctrl;