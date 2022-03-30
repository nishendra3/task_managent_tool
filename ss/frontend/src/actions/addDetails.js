import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { UPDATE_SS, UPDATE_SR, ADD_BUNDLE, GET_BUNDLES, GET_BUNDLE, UPDATE_BUNDLE , GET_VCODES, GET_VNAMES, UPDATE_VCODE, UPDATE_VNAME, UPDATE_BNAME } from './types';
import { updatePart } from './parts';


// UPDATE THE PARTS SELECTOR
export const updateSS = (parts) => {
  return {
    type: UPDATE_SS,
    payload: parts,
  } 
};

// UPDATE THE REASONS SELECTOR
export const updateSR = (parts) => {
  return {
    type: UPDATE_SR,
    payload: parts,
  } 
};

// GET BUNDLES
export const getBundles = () => (dispatch, getState) => {
  axios
    .get('/api/bundles/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_BUNDLES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET BUNDLE
export const getBundle = (id) => (dispatch, getState) => {
  axios
    .get(`/api/bundles/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_BUNDLE,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE BUNDLE
export const deleteBundle = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/bundles/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteLead: 'Bundle Deleted' }));
      dispatch({
        type: DELETE_BUNDLE,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD BUNDLE
export const addBundle = (bundle) => (dispatch, getState) => {
  axios
    .post('/api/bundles/', bundle, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: 'Bundle Added' }));
      dispatch({
        type: ADD_BUNDLE,
        payload: res.data,
      });
      
      // clear parts under proces
      
      res.data.parts.map(i =>  dispatch(updatePart(i,{underProcess:false})));
       
    })
    .catch((err) => {
      dispatch(createMessage({ passwordNotMatch: 'Fields may not be empty' }));
      dispatch(returnErrors(err.response.data, err.response.status))
    });
};

// UPDATE BUNDLES
export const updateBundle = (id,bundle) => (dispatch, getState) => {
  axios
    .patch(`/api/bundles/${id}/`, bundle, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updatePart: 'Action Successfuly Completed' }));
      dispatch({
        type: UPDATE_BUNDLE,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET VCODES
export const getVcodes = () => (dispatch, getState) => {
  axios
    .get('/api/parts/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_VCODES,
        payload: res.data.map((part)=>(part.vendorCode)).filter((x,i,a)=>a.indexOf(x)==i).map((x,i)=> { return {value:x, label:x}}),
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET VNAMES
export const getVnames = () => (dispatch, getState) => {
  axios
    .get('/api/parts/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_VNAMES,
        payload: res.data.map((part)=>(part.vendorName)).filter((x,i,a)=>a.indexOf(x)==i).map((x,i)=> { return {value:x, label:x}}),
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE VCODE
export const updateVcode = (vcode) => (dispatch,getState) => {
  dispatch({
    type: UPDATE_VCODE,
    payload: vcode,
  });
};

//// UPDATE SELECTED VNAME
export const updateVname = (vname) => (dispatch,getState) => {
  dispatch({
    type: UPDATE_VNAME,
    payload: vname,
  });
};

//// UPDATE SELECTED BNAME
export const updateBname = (bname) => (dispatch,getState) => {
  dispatch({
    type: UPDATE_BNAME,
    payload: bname,
  });
};
