import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";

import { environment } from "../../environments/environment";

export interface AppState { }

export const reducers: ActionReducerMap<AppState> = {
  // StoreRouterConnectingModule.forRoot -> stateKey
  router: routerReducer,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log("State before: ", state);
    console.log("Action: ", action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
