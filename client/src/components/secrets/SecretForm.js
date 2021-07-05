import React, { useState, useContext, useEffect } from 'react';
import SecretContext from '../../context/secret/secretContext';

/* import bcrypt from 'bcryptjs'; */

const SecretForm = () => {
  const secretContext = useContext(SecretContext);

  const { addSecret, current, clearCurrent, updateSecret } = secretContext;

  const [secret, setSecret] = useState({
    secretText: '',
    hash: '',
    views: '',
    expire: '',
  });

  useEffect(() => {
    if (current !== null) {
      console.log(current.views);

      setSecret(current);
    } else {
      setSecret({
        secretText: '',
        views: '',
        expire: '',
        hash: '',
      });
    }
  }, [secretContext, current]);

  const { secretText, views, expire } = secret;

  const onChange = (event) => {
    setSecret({ ...secret, [event.target.name]: event.target.value });
  };

  const clearData = () => {
    clearCurrent();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (current) {
      updateSecret(secret);
    } else {
      /* const salt = await bcrypt.genSalt(5);
      const hashed = await bcrypt.hash(secretText, salt); */
      secret.hash = 'hashed';
      console.log(secret);
      addSecret(secret);
    }
    clearData();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>
          {current ? 'View/Edit Secret' : 'Add Secret'}
        </h2>
        <input
          type='text'
          placeholder='Secret'
          name='secretText'
          value={secretText}
          onChange={onChange}
        />
        {current ? (
          ''
        ) : (
          <input
            type='number'
            placeholder='RemainingViews'
            name='views'
            value={views}
            onChange={onChange}
          />
        )}
        {current ? (
          ''
        ) : (
          <input
            type='number'
            placeholder='ExpiresAfterMinutes'
            name='expire'
            value={expire}
            onChange={onChange}
          />
        )}

        <div>
          <input
            type='submit'
            value={current ? 'Update/Confirm Secret' : 'Add Secret'}
            className='btn btn-primary btn-block'
          />
        </div>
      </form>
    </div>
  );
};

export default SecretForm;
