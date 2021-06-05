import { IState } from "../rootReducer";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("YOUR_MOVIES_LIBRARY");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(`err`, err);
    return undefined;
  }
};

export const saveState = (state: IState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("YOUR_MOVIES_LIBRARY", serializedState);
  } catch (err) {
    console.log(`err`, err);
  }
};
