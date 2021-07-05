import {
  ADD_SECRET,
  DELETE_SECRET,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_SECRET,
  FILTER_SECRETS,
  CLEAR_FILTER,
  SECRET_ERROR,
  GET_SECRETS,
  CLEAR_SECRETS,
} from '../types';

const secretReducer = (state, action) => {
  switch (action.type) {
    case GET_SECRETS:
      return {
        ...state,
        secrets: action.payload,
        loading: false,
      };
    case ADD_SECRET:
      return {
        ...state,
        secrets: [action.payload, ...state.secrets],
        loading: false,
      };
    case SECRET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_SECRET:
      return {
        ...state,
        secrets: state.secrets.map((i) =>
          i._id === action.payload._id ? action.payload : i
        ),
        loading: false,
      };
    case DELETE_SECRET:
      return {
        ...state,
        secrets: state.secrets.filter((i) => i._id !== action.payload),
        loading: false,
      };
    case CLEAR_SECRETS:
      return {
        ...state,
        secrets: null,
        current: null,
        filtered: null,
        error: null,
      };
    case FILTER_SECRETS:
      return {
        ...state,
        filtered: state.secrets.filter((i) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return i.name.match(regex) || i.email.match(regex);
        }),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        SECRETs: state.secrets.map((i) =>
          i._id === action.payload._id ? action.payload : i
        ),
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    default:
      return state;
  }
};

export default secretReducer;
