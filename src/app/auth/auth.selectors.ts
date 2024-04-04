import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

// memoized function, keeps chace of previous execution and runs only if input changes
export const isLoggedIn = createSelector(
	selectAuthState,
	// if user -> true if !user -> false
	(auth) => !!auth.user
);

export const isLoggedOut = createSelector(
	isLoggedIn,
	(loggedIn) => !loggedIn
);
