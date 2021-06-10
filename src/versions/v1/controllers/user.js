/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const joi = require('joi');
const joiPhoneNumber = require('joi-phone-number');
const { User } = require('../../../models');
const { UserSerializer } = require('../../../serializers');

const Joi = joi.extend(joiPhoneNumber);

class UserController {
  static async signUp(req, res, next) {
    try {
      const {
        email,
        password,
        confirm_password,
        phone_number,
        address,
      } = req.body;

      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).required(),
        confirm_password: Joi.ref('password'),
        phone_number: Joi.string().phoneNumber().required(),
        address: Joi.string().required(),
      }).with('password', 'confirm_password');

      await schema.validateAsync({
        email,
        password,
        confirm_password,
        phone_number,
        address,
      });

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await User.create({
        email,
        password: hashedPassword,
        phone_number,
        address,
      });

      res.status(201);
      res.json(UserSerializer.serialize(user));
    } catch (err) {
      next(err);
    }
  }

  static async signIn(req, res, next) {
    try {
      const {
        email,
        password,
      } = req.body;

      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });

      await schema.validateAsync({ email, password });

      const userFromDB = await User.findOne({ where: { email } });

      if (!userFromDB) {
        res.status(401);
        throw new Error("User doesn't exist");
      }

      const validPassword = await bcrypt.compare(password, userFromDB.password);

      if (!validPassword) {
        res.status(401);
        throw new Error('Invalid password');
      }

      const user = {
        id: userFromDB.id,
        email: userFromDB.email,
        phone_number: userFromDB.phone_number,
        address: userFromDB.address,
      };

      const { SECRET_KEY } = process.env;
      const token = jwt.sign(user, SECRET_KEY);

      res.json(UserSerializer.serialize({ ...user, token }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
