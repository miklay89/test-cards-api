import Joi from "joi";
import Boom from "@hapi/boom";
import { RequestHandler } from "express";

export default class CardsValidator {
  static payload: RequestHandler = (req, res, next) => {
    const schema = Joi.object({
      id: Joi.number().optional(),
      name: Joi.string().max(32).required(),
      ownerID: Joi.number().required(),
      type: Joi.string()
        .required()
        .valid("Gold", "Silver", "Iron", "Composite"),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw Boom.badRequest(value.error?.message);
      next();
    } catch (err) {
      next(err);
    }
  };
}
