import {
  createBoard,
  getUserBoards,
  getFavorites,
  deleteUserBoard,
  getSingleBoard,
  toggleFavorite,
} from './boardService';

const newBoard = async (userID, name, description, isFavorite) => {
  const board = await createBoard(userID, name, description, isFavorite);

  return {
    message: 'Tablero creado exitosamente.',
    board,
  };
};

const getBoards = async (userID, response) => {
  const boards = await getUserBoards(userID);

  if (!boards) {
    response.status(404);
    return {};
  }

  return boards;
};

const getFavoriteBoards = async (userID, response) => {
  const boards = await getFavorites(userID);

  if (!boards) {
    response.status(404);
    return {};
  }

  return boards;
};

const toggleFavoriteBoard = async (userID, boardID, response) => {
  const { is_favorite } = await getSingleBoard(boardID);
  const updatedStatus = await toggleFavorite(is_favorite, userID, boardID);

  if (updatedStatus) {
    return {
      message: 'Marcado como favorito.',
    };
  }
  else {
    return {
      message: 'Se ha removido de tus favoritos.',
    };
  }
};

const deleteBoard = async (boardID, response) => {
  const board = await getSingleBoard(boardID);

  if (!board) {
    response.status(404);
    return { message: 'El tablero que intentas eliminar no existe.' };
  }

  await deleteUserBoard(boardID);

  return {
    message: 'Tablero eliminado satisfactoriamente.',
  };
};

const getBoard = async (boardID, response) => {
  const board = await getSingleBoard(boardID);

  if (!board) {
    response.status(404);
    return { message: 'El tablero solicitado no existe.' };
  }

  return board;
};

export {
  newBoard,
  getBoards,
  getFavoriteBoards,
  toggleFavoriteBoard,
  deleteBoard,
  getBoard,
};