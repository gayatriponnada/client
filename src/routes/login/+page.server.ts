import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { loginSchema } from "$lib/database/schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginSchema)),
	};
};
export const actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const { email, password } = form.data as {
			email: string;
			password: string;
		};
		console.log(form);
		try {
			const response = await fetch("http://localhost:3002/auth/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password })
			});
			console.log("Res: ", response);
			if (response.status == 400) {
				const result = await response.json();
				form.errors.password = [result.message as string];
				return fail(400, {
					form
				});
			}
			if (response.status == 201) {
				const result = await response.json();
				form.message = [result.message as string];
				console.log(form.message);
			}
		}
		catch (err) {
			console.log(err);
		}
	}
} satisfies Actions;