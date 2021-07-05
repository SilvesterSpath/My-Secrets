import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, views, expire, hash } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      {views < 1 ? (
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
            <i className='fas fa-hourglass'></i>
            {' ' + expire} minutes left
          </li>
        )}
        {hash && <li>hash: {' ' + hash.slice(0, 25)}</li>}
      </ul>
      <p>
        {views < 1 ? (
          <button
            className='btn btn-dark btn-sm'
            disabled
            onClick={() => setCurrent(contact)}
          >
            View Secret
          </button>
        ) : (
          <button
            className='btn btn-dark btn-sm'
            onClick={() => setCurrent(contact)}
          >
            View Secret
          </button>
        )}

        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
        <button className='btn btn-light btn-sm'>
          <a href={`/${hash}`}>View Secret</a>
        </button>
      </p>
    </div>
  );
};

ContactItem.prototype = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
