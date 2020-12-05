import {
	SET_CONFIG,
	UPDATE_CONFIG,
	SET_REACTION,
	SET_REACTION_TYPE,
	RESET_CONFIG
} from 'src/redux/reducers/reaction';

export const updateReaction = (date: { [key: string]: any }) => {
	return { type: SET_REACTION, payload: date };
};

export const setReactionType = (type: 'banner' | 'modal' | 'action') => {
	return { type: SET_REACTION_TYPE, payload: type };
};

export const updateConfig = (
	key: 'id' | 'name' | 'goalType' | 'goalLink' | 'goalSelector',
	value: string
) => {
	return { type: UPDATE_CONFIG, payload: { [key]: value } };
};

export const setConfig = (config: { [key: string]: any }) => {
	return { type: SET_CONFIG, payload: config };
};

export const resetConfig = () => {
	return { type: RESET_CONFIG };
};
