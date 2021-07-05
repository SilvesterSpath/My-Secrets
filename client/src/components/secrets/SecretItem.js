import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SecretContext from '../../context/secret/secretContext';

const SecretItem = ({ secret }) => {
  const secretContext = useContext(SecretContext);
  const { deleteSecret, setCurrent, clearCurrent } = secretContext;

  const { _id, views, expire, hash, date } = secret;

  const onDelete = () => {
    deleteSecret(_id);
    clearCurrent();
  };

  const createdDate = new Date(date);
  const expireDate = new Date(createdDate.getTime() + expire * 60000);
  const currentDate = new Date();

  const diff = expireDate - currentDate;

  return (
    <div className='card bg-light'>
      {views < 1 || diff <= 0 ? (
        <h3 className='text-primary text-left'>There was a secret... </h3>
      ) : (
        <h3 className='text-primary text-left'>There is a secret... </h3>
      )}

      <ul className='list'>
        {views < 1 ? (
          <li>
            <i className='fas fa-eye'></i> 0 view left
          </li>
        ) : (
          <li>
            <i className='fas fa-eye'></i>
            {' ' + views} view(s) left
          </li>
        )}
        {expire && (
          <li>
            <i className='fas fa-hourglass'> </i>
            <strong> expires: </strong>
            <br /> {' ' + expireDate}
          </li>
        )}
        {/* {hash && <li>hash: {' ' + hash.slice(0, 25)}</li>} */}
      </ul>
      <p>
        {views < 1 || diff <= 0 ? (
          <button className='btn btn-dark btn-sm' disabled>
            Can't View Secret
          </button>
        ) : (
          <button
            className='btn btn-dark btn-sm'
            onClick={() => setCurrent(secret)}
          >
            View Secret
          </button>
        )}

        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

SecretItem.prototype = {
  secret: PropTypes.object.isRequired,
};

export default SecretItem;
