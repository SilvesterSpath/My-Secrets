import React, { useContext, useEffect } from 'react';
import Secrets from '../secrets/Secrets';
import SecretForm from '../secrets/SecretForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <SecretForm />
      </div>
      <div>
        <Secrets />
      </div>
    </div>
  );
};

export default Home;
