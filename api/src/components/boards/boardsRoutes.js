import { Router } from 'express';
import {
  newBoard,
  getBoards,
  deleteBoard,
  getBoard,
} from './boardsController';
import { checkToken } from '@middlewares/validators/auth';
import {
  validateNewBoard,
  checkDuplicatedBoardName,
} from '@middlewares/validators/boards';
import handler from '@libs/controllerHandler';

const router = Router();
router.use(checkToken);

router.post('/b/new',
  [
    validateNewBoard,
    checkDuplicatedBoardName,
  ],
  handler(newBoard, (request) => (
    [
      request.body.userID,
      request.body.name,
      request.body.description,
      request.body.isFavorite,
    ]
  )),
);

router.get('/b/all',
  handler(getBoards, (request, response) => (
    [response.locals.user.id, response]
  )),
);

router.delete('/b/:id',
  handler(deleteBoard, (request, response) => (
    [request.params.id, response]
  )),
);

router.get('/b/:id',
  checkToken,
  handler(getBoard, (request, response) => (
    [request.params.id, response]
  )),
);

export default router;