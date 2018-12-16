export const getStateFromLS = () => {
  try {
    const localState = localStorage.getItem('taskTrackerState');
    if (localState === null) {
      return undefined;
    }
    return JSON.parse(localState);
  } catch (error) {
    return undefined;
  }
};

export const saveStateToLS = (state) => {
  try {
    localStorage.setItem('taskTrackerState', JSON.stringify(state));
  } catch (error) {
    // catch errors here
  }
}
