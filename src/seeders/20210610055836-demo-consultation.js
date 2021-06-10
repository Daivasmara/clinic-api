'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Consultations', [{
      clinic: 'Health Clinic',
      doctor_name: 'Dr. Chan Tai Man',
      patient_name: 'Jim Chau',
      diagnosis: 'Headaches',
      medication: 'Neurontin',
      consultation_fee: 210,
      date: '2021-01-01 15:20:23',
      follow_up: false,
    }, {
      clinic: 'Green Clinic',
      doctor_name: 'Dr. John Doe',
      patient_name: 'Micael Kann',
      diagnosis: 'Fever',
      medication: 'Paracetamol',
      consultation_fee: 1000,
      date: '2021-05-06 10:00:00',
      follow_up: true,
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Consultations', null, {});
  }
};
