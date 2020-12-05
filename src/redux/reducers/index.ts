import { combineReducers } from 'redux';
import UserReducer from './user';
import ReactionReducer from './reaction';

export const rootReducer = combineReducers({
	user: UserReducer,
	config: ReactionReducer
});

export type ReduxRootState = ReturnType<typeof rootReducer>;
