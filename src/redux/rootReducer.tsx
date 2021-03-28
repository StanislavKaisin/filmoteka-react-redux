import { combineReducers } from "redux";
import { loaderReducer } from "./loader/loaderReducer";

export const rootReducer = combineReducers({
  // posts: postsReducer,
  // fetchedPosts: fetchPostsReducer,
  loader: loaderReducer,
  // alert: alertReducer,
});

export type IState = ReturnType<typeof rootReducer>;
