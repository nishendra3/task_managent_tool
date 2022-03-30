import { GET_TIMELINES, DELETE_TIMELINE, ADD_TIMELINE, CLEAR_TIMELINES, UPDATE_TIMELINE } from '../actions/types.js';

const initialState = {
  timelines: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TIMELINES:
      return {
        ...state,
        timelines: action.payload,
      };
    case DELETE_TIMELINE:
      return {
        ...state,
        timelines: state.timelines.filter((timeline) => timeline.id !== action.payload),
      };
    case ADD_TIMELINE:
      return {
        ...state,
        timelines: [...state.timelines, action.payload],
      };
    case CLEAR_TIMELINES:
      return {
        ...state,
        timelines: [],
      };
    case UPDATE_TIMELINE:
      return {
        ...state,
        timelines: state.timelines.filter((timeline) => timeline.id !== action.payload.id),
        timelines: [...state.timelines, action.payload],
      };
    default:
      return state;
  }
}