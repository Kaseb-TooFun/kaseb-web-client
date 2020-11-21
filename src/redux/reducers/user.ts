export const SET_USER = 'SET_USER';

export type TUserState = {
	id: number;
	email: string;
	name: string;
};

const INITIAL_STATE: TUserState = {
	id: 0,
	name: '',
	email: ''
};

export default (
	state = INITIAL_STATE,
	action: { type: string; payload: any }
): TUserState => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};
