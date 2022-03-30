import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_PARTS, UPDATE_BC, UPDATE_IC, UPDATE_SELECTEDPARTS, UPDATE_PART, GET_PROCESSPARTS} from './types';


// GET PARTS
export const getParts = () => (dispatch, getState) => {
  axios
    .get('/api/parts/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_PARTS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE PARTS
export const updatePart = (id,part) => (dispatch, getState) => {
  axios
    .patch(`/api/parts/${id}/`, part, tokenConfig(getState))
    .then((res) => {
      // dispatch(createMessage({ updatePart: 'Action Successfuly Completed' }));
      dispatch({
        type: UPDATE_PART,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE SELECTED BUYERCODE
export const updateBC = (part) => (dispatch,getState) => {
  dispatch({
    type: UPDATE_BC,
    payload: part,
  });
};

export const updateIC = (part) => {
  return {
    type: UPDATE_IC,
    payload: part,
  } 
};

// UPDATE SELECTED BUYERCODE
export const updateSParts = (buyerCode, itemCodes) => (dispatch,getState) => {
  let sparts = ((buyerCode==null || itemCodes==null)?[]:
              itemCodes.map(itemCode=>
              getState().parts.parts
              .filter((part)=>part.buyerCode==buyerCode)
              .filter((part)=>part.itemCode==itemCode)
              ))
  
  dispatch({
    type: UPDATE_SELECTEDPARTS,
    payload: sparts,
  })
};

// GET PARTS
export const getPParts = () => (dispatch, getState) => {
  axios
    .get('/api/parts/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_PROCESSPARTS,
        payload: res.data.filter(p=>p.underProcess !== false),
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
 
