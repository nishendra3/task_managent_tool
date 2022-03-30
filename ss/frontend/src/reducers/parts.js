import { GET_PARTS,
        UPDATE_PART, 
        UPDATE_BC, 
        UPDATE_IC, 
        UPDATE_SELECTEDPARTS,
        GET_PROCESSPARTS,
        CLEAR_PPARTS,
        } from '../actions/types.js';

const initialState = {
  parts: [],
  buyerCode:null,
  itemCode:null,
  selectedParts: [],
  processParts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PARTS:
      return {
        ...state,
        parts: action.payload,
      };
    case UPDATE_PART:
      return {
        ...state,
        parts: state.parts.filter((part) => part.id !== action.payload.id),
        parts: [...state.parts, action.payload],
      };
    case UPDATE_BC:
      return {
        ...state,
        buyerCode: action.payload,
        itemCode:null,
        selectedParts:[],
      };
    case UPDATE_IC:
      return {
        ...state,
        itemCode: action.payload,
      };
    case UPDATE_SELECTEDPARTS:
      return {
        ...state,
        selectedParts: action.payload,
      };
    case GET_PROCESSPARTS:
      return {
        ...state,
        processParts: action.payload,
      }

    default:
      return state;
  }
}