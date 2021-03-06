const queueReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WATCHES':
      return action.payload;
    default:
      return state;
  }
};

// watches will be on the redux state at:
// state.queue
export default queueReducer;
