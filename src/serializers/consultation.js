const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const ConsultationSerializer = new JSONAPISerializer('consultations', {
  attributes: [
    'clinic',
    'doctor_name',
    'patient_name',
    'diagnosis',
    'medication',
    'consultation_fee',
    'date',
    'follow_up',
    'createdAt',
    'updatedAt',
  ],
});

module.exports = ConsultationSerializer;
