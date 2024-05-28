
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { getUserInformation } from '$lib/server/info';

export const handle = async function ({ event, resolve }) {
	const token = event.cookies.get("COOKIE");
	if (token) {
		try {
			event.locals.user = await getUserInformation(token);
		} catch (err) {
			console.error(err);
		}
	}
	const response = await resolve(event);
	return response;
} satisfies Handle;

export const handleFetch = (({ fetch, request, event }) => {
	if (request.url.startsWith("http://localhost:3002")) {
		const token = event.cookies.get("COOKIE");
		request.headers.set('Authorization', `Bearer ${token}`);
	}
	return fetch(request);
}) satisfies HandleFetch;

export const handleError = (async ({ error }) => {
	console.error(error);
}) satisfies HandleServerError;