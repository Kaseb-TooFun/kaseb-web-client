export const SET_CONFIG = 'SET_CONFIG';
export const SET_REACTION_TYPE = 'SET_REACTION_TYPE';
export const SET_REACTION = 'SET_REACTION';
export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const RESET_CONFIG = 'RESET_CONFIG';

export type TReactionConfig = {
	id: string;
	name: string;
	goalType: 'click' | 'page_visit' | 'notify';
	goalLink: '';
	goalSelector: '';
	value: {
		type: 'banner' | 'modal' | 'action';
		data: { [key: string]: number | string | string[] };
	};
};

const INITIAL_STATE: TReactionConfig = {
	id: '',
	name: '',
	goalType: 'notify',
	goalLink: '',
	goalSelector: '',
	value: {
		type: 'banner',
		data: {}
	}
};

export default (
	state = INITIAL_STATE,
	action: { type: string; payload: any }
): TReactionConfig => {
	console.log({ action });
	switch (action.type) {
		case SET_CONFIG:
			return action.payload;

		case UPDATE_CONFIG:
			return {
				...state,
				...action.payload
			};

		case SET_REACTION_TYPE:
			return {
				...state,
				value: {
					...state.value,
					type: action.payload
				}
			};

		case SET_REACTION:
			return {
				...state,
				value: {
					...state.value,
					data: {
						...state.value.data,
						...action.payload
					}
				}
			};

		case RESET_CONFIG:
			return INITIAL_STATE;

		default:
			return state;
	}
};
