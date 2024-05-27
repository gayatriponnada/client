import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { resetPasswordSchema } from "$lib/database/schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(resetPasswordSchema)),
	};
};

export const actions = {
	resetPassword: async (event) => {
		const form = await superValidate(event, zod(resetPasswordSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const { email, password, newPassword, confirmPassword } = form.data as {
			email: string;
			password: string;
			newPassword: string;
			confirmPassword: string;
		};
		console.log(form);
		try {
			// fetch (signup) -> use localhost method post content type json
			const response = await fetch("http://localhost:3002/auth/reset-password", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password, newPassword, confirmPassword })
			});
			console.log("Res: ", response);
			if (response.status == 400) {
				const result = await response.json();
				form.errors.password = [result.message as string];
				return fail(400, {
					form
				});
			}
		}
		catch (err) {
			console.log(err);
		}
	}
} satisfies Actions;