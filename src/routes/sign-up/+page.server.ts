import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "$lib/database/schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema)),
	};
};

export const actions = {
	signUp: async (event) => {

		console.log("I am coming here.... bro");


		const form = await superValidate(event, zod(formSchema));

		console.log("1");

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		console.log("2");


		const { name, email, password, confirmPassword } = form.data as {
			name: string;
			email: string;
			password: string;
			confirmPassword: string;
		};



		try {
			// fetch (signup) -> use localhost method post content type json
			const response = await event.fetch("http://localhost:3002/auth/sign-up", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password, confirmPassword }),
			});
			console.log("Res: ", response);
			if (response.status == 400) {
				const result = await response.json();
				const erroredForm = form;
				// form.errors.email= [result.message as string];
				erroredForm.errors.email = [result.message as string];
				return fail(400, {
					form: erroredForm
				});
			}
			if (!response.ok) {
				const erroredForm = form;
				erroredForm.errors.email = ['Internal Server Error'];
				return fail(400, {
					form: erroredForm
				});
			}
		}
		catch (err) {
			console.error("Error: ", err);
		}


		throw redirect(302, '/login');

	},
} satisfies Actions;

















//catch block(errors) -> error status -> 400(passwords wont match / password); and 400(user already exists);

//else 201 (user created) -> redirect to login page

// OK -> 200
// Created -> 201


// Redirection -> 301/302

// Bad Request -> 400
// Authorization Error -> 401
// Forbidden -> 403
// Not Found -> 404


// Server Error -> 500 (Internal Server error)