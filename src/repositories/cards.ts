import { eq } from "drizzle-orm";
import db from "../libs/db";
import { Card, cardsTable } from "../data/schema";

const { database } = db;

export default class CardsRepository {
  static async getAllCards(): Promise<Card[]> {
    const cards = await database.select().from(cardsTable);
    return cards;
  }

  static async getCardById(id: number): Promise<Card | null> {
    const [card] = await database
      .select()
      .from(cardsTable)
      .where(eq(cardsTable.id, id));

    if (!card) return null;
    return card;
  }

  static async createCard(newCard: Card): Promise<Card> {
    const { name, ownerID, type } = newCard;
    const [card] = await database
      .insert(cardsTable)
      .values({ name, ownerID, type })
      .returning();

    return card;
  }

  static async updateCard(card: Card): Promise<Card> {
    const [updatedCard] = await database
      .update(cardsTable)
      .set({
        name: card.name,
        ownerID: card.ownerID,
        type: card.type,
      })
      .where(eq(cardsTable.id, card.id))
      .returning();

    return updatedCard;
  }

  static async deleteCard(id: number): Promise<Card | null> {
    const [deletedCard] = await database
      .delete(cardsTable)
      .where(eq(cardsTable.id, id))
      .returning();
    if (!deletedCard) return null;

    return deletedCard;
  }
}
