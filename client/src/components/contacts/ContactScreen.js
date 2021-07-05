import React, { useContext, useEffect, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner';

const ContactScreen = ({ match }) => {
  const contactContext = useContext(ContactContext);

  const { contacts, getContacts, loading } = contactContext;

  const contactHash = match.params.hash;
  console.log(contactHash);

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  const reduceViews = (contact) => {
    contact.views--;
    console.log('views: ', contact.views);
  };

  let actualSecret;

  if (contacts !== null) {
    actualSecret = contacts.filter((i) => i.hash === contactHash);
    reduceViews(actualSecret[0]);
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <div>
          <h1>This</h1>
          <h1>{actualSecret[0].secret}</h1>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default ContactScreen;
