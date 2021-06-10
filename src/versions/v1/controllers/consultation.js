/* eslint-disable camelcase */
const { Op } = require('sequelize');
const Joi = require('joi');
const { Consultation } = require('../../../models');
const { ConsultationSerializer } = require('../../../serializers');
const { isValidDate } = require('../../../utils/helpers/helpers');

class ConsultationController {
  static async getAll(req, res, next) {
    try {
      const {
        from,
        to,
        limit,
        offset,
      } = req.query;

      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (!isValidDate(fromDate) || !isValidDate(toDate)) {
        res.json(ConsultationSerializer.serialize([]));
        return;
      }

      const consultations = await Consultation.findAll({
        where: {
          date: { [Op.between]: [fromDate, toDate] },
        },
        limit: Number(limit) || 10,
        offset: Number(offset) || 0,
      });

      res.json(ConsultationSerializer.serialize(consultations));
    } catch (err) {
      next(err);
    }
  }

  static async createOne(req, res, next) {
    try {
      const {
        clinic,
        doctor_name,
        patient_name,
        diagnosis,
        medication,
        consultation_fee,
        date,
        follow_up,
      } = req.body;

      const schema = Joi.object({
        clinic: Joi.string().required(),
        doctor_name: Joi.string().required(),
        patient_name: Joi.string().required(),
        diagnosis: Joi.string().required(),
        medication: Joi.string().required(),
        consultation_fee: Joi.number().required(),
        date: Joi.date().required(),
        follow_up: Joi.boolean().required(),
      });

      await schema.validateAsync({
        clinic,
        doctor_name,
        patient_name,
        diagnosis,
        medication,
        consultation_fee,
        date,
        follow_up,
      });

      const consultation = await Consultation.create({
        clinic,
        doctor_name,
        patient_name,
        diagnosis,
        medication,
        consultation_fee,
        date,
        follow_up,
      });

      res.status(201);
      res.json(ConsultationSerializer.serialize(consultation));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ConsultationController;
