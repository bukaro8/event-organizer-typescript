// import app from './app';
import express from 'express';
import { envs } from './plugins/envs/envs.plugin';

export const app = express();
const Server = () => {
	app.listen(envs.PORT, () => {
		console.log(`Server running on port ${envs.PORT}`);
	});
};
export default Server;
