'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Consultations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clinic: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      doctor_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      patient_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      diagnosis: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      medication: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      consultation_fee: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      follow_up: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Consultations');
  }
};
