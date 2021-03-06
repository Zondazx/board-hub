import validateRequest from '@utils/schemas/validate';
import logger from '@utils/logging';
import {
  newCardSchema,
  editCardSchema,
} from '@utils/schemas/cardsSchemas';
import { list, card, user } from '@models';

const validateNewCard = (request, response, next) => {
  validateRequest(
    request.body,
    response,
    newCardSchema,
    next,
  );
};

const validateCardUpdate = (request, response, next) => {
  request.body = validateRequest(
    request.body,
    response,
    editCardSchema,
    next,
    true,
  );
};

/**
 * Makes multiple queries to see if the card belongs to the current user.
 *
 * It goes like this:
 * card -> list -> board, in the end, it checks if the user has said board,
 * if he has it, then he can see this card. I'm sure this can be done in a better way.
 */
const checkCardOwner = async (request, response, next) => {
  const userID = response.locals.user.id;
  const cardID = request.params.id;

  try {
    const { list_id } = await card.findByPk(cardID);
    const { board_id } = await list.findByPk(list_id);
    const { userBoards } = await user.findOne({
      where: { id: userID },
      include: 'userBoards',
    });

    const isCardOwner = userBoards.filter(b => b.id === board_id);

    if (isCardOwner.length === 0) {
      return response
        .status(400)
        .json({
          message: 'No tienes permisos en esta carta.',
        });
    }

    next();
  }
  catch (error) {
    logger.error(error.message);
    return response
      .status(500)
      .json({ message: 'Hubo un error de nuestro lado, intenta otra vez.' });
  }
};

export {
  validateNewCard,
  validateCardUpdate,
  checkCardOwner,
};
