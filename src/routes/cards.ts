import Router from "express";
import CardsController from "../controllers/cards";
import CardsValidator from "../validators/cards";

const router = Router();
// get all cards
router.get("/", CardsController.getAllCards);
// get card by ID
router.get("/:id", CardsController.getCardByID);
// create new card
router.post("/", CardsValidator.payload, CardsController.createCard);
// update card by ID
router.put("/:id", CardsValidator.payload, CardsController.updateCard);
// delete card by ID
router.delete("/:id", CardsController.deleteCard);

export default router;
