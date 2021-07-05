import React, { useReducer } from 'react';
/* import { v4 as uuid } from 'uuid'; */
import SecretContext from './secretContext';
import SecretReducer from './secretReducer';
import axios from 'axios';
import {
  GET_SECRETS,
  CLEAR_SECRETS,
  ADD_SECRET,
  DELETE_SECRET,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_SECRET,
  FILTER_SECRETS,
  CLEAR_FILTER,
  SECRET_ERROR,
} from '../types';

const SecretState = (props) => {
  const initialState = {
    secrets: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(SecretReducer, initialState);

  // Get secrets
  const getSecrets = async () => {
    try {
      const res = await axios.get('/api/secrets');
      dispatch({
        type: GET_SECRETS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: SECRET_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Add secret
  const addSecret = async (secret) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/secrets', secret, config);
      dispatch({
        type: ADD_SECRET,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: SECRET_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Delete secret
  const deleteSecret = async (id) => {
    try {
      await axios.delete(`/api/secrets/${id}`);

      dispatch({
        type: DELETE_SECRET,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: SECRET_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Update secret
  const updateSecret = async (secret) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/secrets/${secret._id}`, secret, config);
      dispatch({
        type: UPDATE_SECRET,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: SECRET_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Clear secrets
  const clearSecrets = () => {
    dispatch({ type: CLEAR_SECRETS });
  };

  // Set Current secret
  const setCurrent = (secret) => {
    console.log(secret.views);
    if (secret.views === 1) {
      secret.views = secret.views - 2;
    } else {
      secret.views--;
    }

    dispatch({ type: SET_CURRENT, payload: secret });
  };

  // Clear Current secret
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter secrets
  const filterSecrets = (text) => {
    dispatch({ type: FILTER_SECRETS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <SecretContext.Provider
      value={{
        secrets: state.secrets,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getSecrets,
        addSecret,
        deleteSecret,
        clearSecrets,
        setCurrent,
        clearCurrent,
        updateSecret,
        filterSecrets,
        clearFilter,
      }}
    >
      {props.children}
    </SecretContext.Provider>
  );
};

export default SecretState;
