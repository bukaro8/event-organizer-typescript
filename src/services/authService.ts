import { checkPassword } from '../plugins/functions/auth';
import { createAccessToken } from '../plugins/functions/jwt';
import simpleUUID from '../plugins/functions/simpleUUID';

import { userByEmail } from './userService';

export const login = async (email: string, password: string) => {
	if (!email || !password) throw new Error('Email or Password invalid');
	const user = await userByEmail(email);
	if (!user) throw new Error('Not user found with that Email');

	//? Test password
	const isPasswordCorrect = await checkPassword(password, user.password);
	if (!isPasswordCorrect) throw new Error('The password is not correct');
	const token = await createAccessToken({ id: user.id });
	const userResponse = {
		id: user.id,
		name: user.name,
		role: user.role,
		picture: user.picture,
	};
	const tokenUser = {
		token: token,
		data: userResponse,
	};
	return tokenUser;
};
