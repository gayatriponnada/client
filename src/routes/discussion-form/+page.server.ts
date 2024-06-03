import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { discussionSchema } from "$lib/database/schema";
import { zod } from "sveltekit-superforms/adapters";


export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(discussionSchema)),
	};
};