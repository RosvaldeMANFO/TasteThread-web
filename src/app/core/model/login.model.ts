export interface Token {
	accessToken: string;
	refreshToken?: string;
}

export interface Login {
	token: Token;
	nextLink?: string;
}

export type LoginDTO = {
	email: string;
	password: string;
}