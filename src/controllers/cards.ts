/* eslint-disable no-restricted-globals */
import { RequestHandler } from "express";
import Boom from "@hapi/boom";
import CardsRepository from "../repositories/cards";
import { Card } from "../entities/card";
import {
  CreateCardRequest,
  TypedResponse,
  UpdateCardRequest,
} from "../types/types";

export default class CardsController {
  static getAllCards: RequestHandler = async (
    req,
    res: TypedResponse<Card[]>,
    next,
  ) => {
    try {
      const cards = await CardsRepository.getAllCards();

      res.status(200).json(cards);
    } catch (e) {
      next(e);
    }
  };

  static getCardByID: RequestHandler = async (
    req,
    res: TypedResponse<Card>,
    next,
  ) => {
    try {
      const { id } = req.params;
      if (isNaN(+id)) throw Boom.badRequest("id in url should be a number");

      const card = await CardsRepository.getCardById(Number(id));
      if (!card) throw Boom.notFound();

      res.status(200).json(card);
    } catch (e) {
      next(e);
    }
  };

  static createCard: RequestHandler = async (
    req: CreateCardRequest,
    res: TypedResponse<Card>,
    next,
  ) => {
    try {
      const { id, name, ownerID, type } = req.body;

      if (id) {
        const cardExistInDb = await CardsRepository.getCardById(Number(id));
        if (cardExistInDb) throw Boom.badRequest("card exist");
      }

      const newCard = new Card(id ? Number(id) : 0, name, ownerID, type);
      const savedCard = await CardsRepository.createCard(newCard);

      res.status(200).json(savedCard);
    } catch (e) {
      next(e);
    }
  };

  static updateCard: RequestHandler = async (
    req: UpdateCardRequest,
    res: TypedResponse<Card>,
    next,
  ) => {
    try {
      const idParam = req.params.id;
      if (isNaN(+idParam))
        throw Boom.badRequest("id in url should be a number");

      const { id, name, ownerID, type } = req.body;

      const newCard = new Card(
        id ? Number(id) : Number(idParam),
        name,
        ownerID,
        type,
      );

      const cardExistInDb = await CardsRepository.getCardById(
        Number(newCard.id),
      );
      if (!cardExistInDb) throw Boom.badRequest("card isn't exist");

      await CardsRepository.updateCard(newCard);

      res.status(200).json(newCard);
    } catch (e) {
      next(e);
    }
  };

  static deleteCard: RequestHandler = async (
    req,
    res: TypedResponse<Card>,
    next,
  ) => {
    try {
      const { id } = req.params;

      const deletedCard = await CardsRepository.deleteCard(Number(id));
      if (!deletedCard) throw Boom.badRequest("card isn't exist");

      res.status(200).json(deletedCard);
    } catch (e) {
      next(e);
    }
  };
}
