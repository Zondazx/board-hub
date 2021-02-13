import React from 'react';

import { signupSchema } from '../libs/validation/auth';

import AuthForm from '../components/AuthForm';

const Signup = () => {
  return (
    <AuthForm 
      route='signup' 
      validationSchema={signupSchema} 
    />
  );
};

export default Signup;