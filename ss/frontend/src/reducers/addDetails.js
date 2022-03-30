import { UPDATE_SS,
          UPDATE_SR,
          GET_BUNDLES,
          GET_BUNDLE,
          DELETE_BUNDLE,
          ADD_BUNDLE,
          UPDATE_BUNDLE,
          GET_VCODES,
          GET_VNAMES,
          UPDATE_VCODE,
          UPDATE_VNAME,
          UPDATE_BNAME,
    } from '../actions/types.js';

const initialState = {
ssParts : null,
sourcingReason: null,
bundles:[],
bundle:[],
vcodes:[],  // list of unique vendor codes
vnames:[],  // list of unique vendor names
vcode:null, // current vendor code selected
vname:null, // current vendor name selected
bname:null,
};

export default function (state = initialState, action) {
switch (action.type) {
case UPDATE_SS:
  return {
    ...state,
    ssParts: action.payload,
  };
case UPDATE_SR:
  return {
    ...state,
    sourcingReason: action.payload,
  }; 
case GET_BUNDLES:
  return {
    ...state,
    bundles: action.payload,
  };
case GET_BUNDLE:
return {
  ...state,
  bundle: action.payload,
};
case DELETE_BUNDLE:
  return {
    ...state,
    bundles: state.bundles.filter((bundle) => bundle.id !== action.payload),
  };
case ADD_BUNDLE:
  return {
    ...state,
    bundles: [...state.bundles, action.payload],
  };
case UPDATE_BUNDLE:
  return {
    ...state,
    bundles: state.bundles.filter((bundle) => bundle.id !== action.payload.id),
    bundles: [...state.bundles, action.payload],
  };

case GET_VCODES:
  return {
    ...state,
    vcodes: action.payload,
  };

case GET_VNAMES:
  return {
    ...state,
    vnames: action.payload,
  };

case UPDATE_VCODE:
  return {
    ...state,
    vcode: action.payload,
  };

case UPDATE_VNAME:
  return {
    ...state,
    vname: action.payload,
  };
case UPDATE_BNAME:
  return {
    ...state,
    bname: action.payload,
  };

default:
  return state;
}
}