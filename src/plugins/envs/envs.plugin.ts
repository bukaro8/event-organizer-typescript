import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
	SCHOOL_EMAIL: env.get('SCHOOL_EMAIL').required().asString(),
	PORT: env.get('PORT').required().asPortNumber(),
	NODE_ENV: env.get('NODE_ENV').default('development').asString(),
	SECRET_KEY: env.get('SECRET_KEY').required().asString(),

	MAILER_EMAIL: env.get('MAILER_EMAIL').required().asString(),
	MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
};
