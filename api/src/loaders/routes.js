import authRoutes from '@components/auth';
import boardsRoutes from '@components/boards';
import cardsRoutes from '@components/cards';
import listsRoutes from '@components/lists';
import userRoutes from '@components/user';

const PREFIX = '/api';
const routes = [
  authRoutes,
  boardsRoutes,
  cardsRoutes,
  listsRoutes,
  userRoutes,
];

const loadRoutes = (app) => (
  routes.forEach(route => app.use(PREFIX, route))
);

export default loadRoutes;
