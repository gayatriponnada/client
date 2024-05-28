import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(301, '/login');
	}
	return {
		user: locals.user,
	};
};


export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('COOKIE', {
			path: '/'
		});
		redirect(301, '/login');
	}
};