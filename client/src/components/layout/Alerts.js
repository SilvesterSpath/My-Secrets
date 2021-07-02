import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map((i) => (
      <div key={i.id} className={`alert alert-${i.type}`}>
        <i className='fas fa-info-circle'>{i.msg}</i>
      </div>
    ))
  );
};

export default Alerts;
