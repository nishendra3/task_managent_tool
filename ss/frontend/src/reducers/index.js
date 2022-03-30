import { combineReducers } from 'redux';
import leads from './leads';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import parts from './parts';
import timelines from './timelines';
import addDetails from './addDetails';
import allParts from './allParts';

export default combineReducers({
  leads,
  errors,
  messages,
  auth,
  parts,
  timelines,
  addDetails,
  allParts,
});