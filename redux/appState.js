const appState = (state = {}, action) => {
  // console.log(action);
  switch (action.type) {
    case "SET_INCIDENTID": {
      const { incidentId } = action;
      return {
        ...state,
        incidentId
      };
    }
    // case "persist/REHYDRATE": {
    //   const { payload } = action;
    //   console.log(payload);
    //   return { ...state, ...payload.appState };
    // }
    default: {
      return state;
    }
  }
};

export default appState;
