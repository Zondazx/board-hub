import { user } from '@models';
import { genSalt, hash } from 'bcryptjs';

import getToken from '@utils/getToken';

const createUser = async (fullname, username, password, email, ip) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  await user.create({
    full_name: fullname,
    user_name: username,
    password: hashedPassword,
    email,
    ip_address: ip,
  });

  const token = await getToken(email);

  return token;
};

const getUser = async (email) => {
  const foundUser = await user.findOne({ where: { email } });

  return foundUser;
};

export {
  createUser,
  getUser,
};