import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, secret, views, expire, hash } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>{secret} </h3>
      <ul className='list'>
        {views && (
          <li>
            <i className='fas fa-eye'></i>
            {' ' + views} views(s) left
          </li>
        )}
        {expire && (
          <li>
            <i className='fas fa-hourglass'></i>
            {' ' + expire} minutes left
          </li>
        )}
        {hash && <li>hash: {' ' + hash.slice(0, 10)}</li>}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.prototype = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
