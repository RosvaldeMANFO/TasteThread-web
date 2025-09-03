export interface RequestResult<T> {
	status: string;
	data?: T | null;
	message?: string | null;
	httpStatus: number;
}

export function formatResult<T>(result: Promise<T>, httpStatus: number): Promise<RequestResult<T>> {
	return result
		.then((data) => ({ status: 'success', data, error: null, httpStatus }))
		.catch((err) => ({ status: 'error', data: null, error: err?.message ?? String(err), httpStatus }));
}
