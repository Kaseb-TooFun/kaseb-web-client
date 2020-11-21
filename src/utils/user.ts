import localforage from 'localforage';

export const readUserToken = () => {
	return localforage.getItem<string | null>('userToken');
};

export const saveUserToken = (token: string) => {
	return localforage.setItem('userToken', token);
};
