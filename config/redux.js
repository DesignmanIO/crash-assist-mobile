const appState = (state = {}, action) => {
  switch (action.type) {
    case 'SET_INCIDENTID': {
      const {incidentId} = action;
      return {
        ...state,
        incidentId,
      }
    }
    default: {
      return state;
    }
  };
};

export {appState};
