import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_TIMELINES, DELETE_TIMELINE, ADD_TIMELINE, UPDATE_TIMELINE } from './types';

// GET TIMELINES
export const getTimelines = (id) => (dispatch, getState) => {
  axios
    .get(`/api/timelines/?pk=${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TIMELINES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE TIMELINE
export const deleteTimeline = (id) => (dispatch, getState) => {
    axios
      .delete(`/api/timelines/${id}/`, tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage({ deleteLead: 'Timeline Deleted' }));
        dispatch({
          type: DELETE_TIMELINE,
          payload: id,
        });
      })
      .catch((err) =>  dispatch(returnErrors(err.response.data, err.response.status)));
  };

// ADD TIMELINE
export const addTimeline = (timeline) => (dispatch, getState) => {
    axios
      .post('/api/timelines/', timeline, tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage({ addLead: 'Timeline Added' }));
        dispatch({
          type: ADD_TIMELINE,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
  };

// UPDATE TIMELINE
export const updateTimeline = (id,bundle_id,timeline) => (dispatch, getState) => {
  axios
    .put(`/api/timelines/${id}/?pk=${bundle_id}`, timeline, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateTimeline: 'Action Successfuly Completed' }));
      dispatch({
        type: UPDATE_TIMELINE,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};