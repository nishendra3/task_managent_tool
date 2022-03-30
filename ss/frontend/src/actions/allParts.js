import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_ALLBUNDLES, GET_ALLTIMES , GET_ALLPARTS, MERGE_DATA} from './types';

// UPDATE THE PARTS SELECTOR
// GET BUNDLES
export const getAllParts = () => (dispatch, getState) => {
    // get the parts that are under timeline processing - 
    let tmpdata = [];
    axios
      .get('/api/tbundles/', tokenConfig(getState))
      .then((res1) => {
        dispatch({
          type: GET_ALLBUNDLES,
          payload: res1.data,
        });
        
        tmpdata = res1.data;
      })
      .then(()=>{
        tmpdata.map((b,i)=>{
          axios
              .get(`/api/timelines/?pk=${b.id}`, tokenConfig(getState))
              .then((res2) => {
              dispatch({
                  type: GET_ALLTIMES,
                  payload: res2.data,
              });
              })
              .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
      });
      
      })
      .then(()=>{
        tmpdata.map(b=>{
          // get the parts that are a part of the provided bnudle id
          axios
              .get(`/api/bparts/?pk=${b.id}`, tokenConfig(getState))
              .then((res3) => {
              dispatch({
                  type: GET_ALLPARTS,
                  payload: res3.data,
              });
              
              })
              .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
      })
      })
      .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
  };

export const mergeParts = () => (dispatch, getState) => {
  dispatch({
      type: MERGE_DATA,
  });
}  