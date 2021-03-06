import { Router } from 'express';
import {
  newCard,
  deleteCard,
  getCard,
  putCard,
  changeCurrentList,
  putVerticalOrder,
} from './cardsController';
import { checkToken } from '@middlewares/validators/auth';
import { validateNewCard, checkCardOwner } from '@middlewares/validators/cards';
import handler from '@utils/controllerHandler';
import { validateCardUpdate } from '@middlewares/validators/cards';

const router = Router();
const ROUTE_PREFIX = '/cards';

router.use(checkToken);

router.post(`${ROUTE_PREFIX}/new`,
  validateNewCard,
  handler(newCard, (request) => (
    [request.body.title, request.body.listId]
  )),
);

router.delete(`${ROUTE_PREFIX}/:id`,
  checkCardOwner,
  handler(deleteCard, (request, response) => (
    [request.params.id, response]
  )),
);

router.get(`${ROUTE_PREFIX}/:id`,
  checkCardOwner,
  handler(getCard, (request, response) => (
    [request.params.id, response]
  )),
);

router.put(`${ROUTE_PREFIX}/:id`,
  [checkCardOwner, validateCardUpdate],
  handler(putCard, (request, response) => (
    [{
      id: request.params.id,
      title: request.body.title,
      duedate: request.body.duedate,
      completed: request.body.completed,
      content: request.body.content,
    }]
  )),
);

router.put(`${ROUTE_PREFIX}/:id/update-list`,
  checkCardOwner,
  handler(changeCurrentList, (request) => (
    [
      request.body.id,
      request.body.destinationListId,
      request.body.sourceListCards,
      request.body.destinationListCards,
    ]
  )),
);

router.put(`${ROUTE_PREFIX}/:id/order`,
  checkCardOwner,
  handler(putVerticalOrder, (request) => (
    [request.body.cards]
  )),
);

export default router;
