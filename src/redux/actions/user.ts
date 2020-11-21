import { SET_USER, TUserState } from 'src/redux/reducers/user';
import Api from 'src/api/index';

export const getUser = (cb?: (user: TUserState | null) => void) => (
	dispatch: ({ type, payload }: { type: string; payload: any }) => void
) => {
	Api.auth
		.verify()
		.then(({ status, data }: { status: number; data: any }) => {
			if (status == 200) {
				dispatch({
					type: SET_USER,
					payload: data
				});
				cb?.(data);
			} else {
				cb?.(null);
			}
		});
};

export const setUser = (user: TUserState) => {
	return { type: SET_USER, payload: user };
};
