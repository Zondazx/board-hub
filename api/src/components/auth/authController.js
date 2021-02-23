import { createUser, getUser } from './authService';
import { compare } from 'bcryptjs';

import getToken from '@utils/getToken';

const signup = async (data, ip) => {
  const {
    fullname,
    username,
    password,
    email,
  } = data;

  const userToken = await createUser(fullname, username, password, email, ip);

  return userToken;
};

const signin = async (email, password, response) => {
  const user = await getUser(email);

  if (!user) {
    response.status(404);
    return { message: 'No existe un usuario con ese email.' };
  }

  const passwordsMatch = await compare(password, user.password);

  if (passwordsMatch) {
    const token = await getToken(email);

    return token;
  }
  else {
    response.status(400);
    return { message: 'Contraseña incorrecta.' };
  }
};

/**
 * TODO: This now needs to include a new field, "role".
 */
const getMe = async ({ id, full_name, user_name, email }) => {
  const user = {
    id,
    fullname: full_name,
    username: user_name,
    email,
  };

  return user;
};

export {
  signup,
  signin,
  getMe,
};