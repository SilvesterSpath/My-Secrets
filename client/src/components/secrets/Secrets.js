import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SecretContext from '../../context/secret/secretContext';
import SecretItem from './SecretItem';
import Spinner from '../layout/Spinner';

const Secrets = () => {
  const secretContext = useContext(SecretContext);

  const { secrets, filtered, getSecrets, loading } = secretContext;

  useEffect(() => {
    getSecrets();
    // eslint-disable-next-line
  }, []);

  if (secrets !== null && secrets.length === 0) {
    return <h4>Please add a Secret</h4>;
  }

  return (
    <Fragment>
      {secrets !== null && !loading ? (
        <TransitionGroup>
          {filtered
            ? filtered.map((i) => (
                <CSSTransition key={i._id} timeout={300} classNames='item'>
                  <SecretItem secret={i} />
                </CSSTransition>
              ))
            : secrets.map((i) => (
                <CSSTransition key={i._id} timeout={300} classNames='item'>
                  <SecretItem secret={i} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Secrets;
