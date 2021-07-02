import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import bcrypt from 'bcryptjs';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact } = contactContext;

  const [contact, setContact] = useState({
    secret: '',
    hash: '',
    views: '',
    expire: '',
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        secret: '',
        hash: '',
        views: '',
        expire: '',
      });
    }
  }, [contactContext, current]);

  const { secret, views, expire } = contact;

  const onChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const clearData = () => {
    clearCurrent();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (current) {
      updateContact(contact);
    } else {
      const salt = await bcrypt.genSalt(5);
      const hashed = await bcrypt.hash(secret, salt);
      contact.hash = hashed;
      console.log(contact);
      addContact(contact);
    }
    clearData();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>
          {current ? 'Edit Secret' : 'Add Secret'}
        </h2>
        <input
          type='text'
          placeholder='Secret'
          name='secret'
          value={secret}
          onChange={onChange}
        />
        <input
          type='number'
          placeholder='RemainingViews'
          name='views'
          value={views}
          onChange={onChange}
        />
        <input
          type='number'
          placeholder='ExpiresAfterMinutes'
          name='expire'
          value={expire}
          onChange={onChange}
        />

        <div>
          <input
            type='submit'
            value={current ? 'Update Secret' : 'Add Secret'}
            className='btn btn-primary btn-block'
          />
          {current && (
            <div>
              <button className='btn btn-light btn-block' onClick={clearData}>
                Clear
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
