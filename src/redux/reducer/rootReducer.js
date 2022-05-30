import { combineReducers } from 'redux';
import { catReducer } from './catReducer';

export const rootReducer = combineReducers({
  app: catReducer,
});
