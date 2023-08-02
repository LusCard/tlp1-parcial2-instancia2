// TODO: Crear modelo de datos de Reserva

"use strict";

const { DataTypes, sequelize } = require("../database/database");

const Reserva = sequelize.define(
  "Reserva",
  {
    moviename: {
        type: DataTypes.STRING(50),
        allowNull: false,},
    moviedate:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    date: { 
        type: DataTypes.DATE 
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Reserva",
    tableName: "reservas",
    underscored: true,
  }
);

Reserva.sync()

module.exports = Reserva;
