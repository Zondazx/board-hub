import validate from '@libs/schemas/validate';
import {
  signupSchema,
  signinSchema,
} from '@libs/schemas/authSchemas';
import logger from '@libs/logging/logger';

import dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { user } from '@models';

dotenv.config();

const validateSignup = (request, response, next) => {
  const { value, error } = validate(signupSchema, request.body);

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');

    response.status(400).json({ message: errors });
    logger.error(errors);
  }
  else {
    request.body = value;
    next();
  }
};

const validateSignin = (request, response, next) => {
  const { value, error } = validate(signinSchema, request.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    const errors = error.details.map(({ message }) => message).join(', ');

    response.status(400).json({ message: errors });
    logger.error(errors);
  }
  else {
    request.body = value;
    next();
  }
};

const checkDuplicatedUser = async (request, response, next) => {
  const { username, email } = request.body;

  try {
    const emailAlreadyExists = await user.findOne({ where: { email } });

    if (emailAlreadyExists) {
      response
        .status(400)
        .json({
          message: 'That email is already taken.',
        });
    }

    const usernameAlreadyExists = await user.findOne({ where: { user_name: username } });

    if (usernameAlreadyExists) {
      response
        .status(400)
        .json({
          message: 'That username is already taken.',
        });
    }
    next();

  }
  catch (error) {
    response.status(500).json({ message: 'Oops, an error occured in our side, try again.' });
    logger.error(error.message);
  }
};

const checkToken = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  const SECRET = process.env.JWT_SECRET;

  try {
    if (!authHeader && !authHeader.startsWith('Bearer ')) {
      response.status(401).json({ message: 'Invalid token.' });
    }

    const token = authHeader.split(' ')[1];
    const { email } = verify(token, SECRET);

    const tokenOwner = await user.findOne({ where: { email } });

    if (!tokenOwner) {
      response
        .status(404)
        .json({
          message: 'The provided token is not associated to an existing account.',
        });
    }

    next();
  }
  catch (error) {
    response
      .status(500)
      .json({
        message: 'Huh, an error happened on our side, try again.',
      });
  }
};

export {
  validateSignin,
  validateSignup,
  checkDuplicatedUser,
  checkToken,
};