import { z } from "zod";
const isEmailAlreadyRegistered = async (email: string) => {
	const registeredEmails = ['test@example.com', 'user@example.com'];
	return registeredEmails.includes(email);
};


export const formSchema = z.object({

	name: z.string()
		.min(2, 'Username must be at least 2 characters')
		.max(50, 'Username must be at most 50 characters')
		.regex(/^[A-Z]/, 'Username must start with an uppercase letter'),
	email: z.string().email('Invalid email format').refine(
		async (email) => !(await isEmailAlreadyRegistered(email)),
		{
			message: 'Email is already registered',
		}
	),
	password: z
		.string()
		.regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
			message:
				"Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
		}),
	confirmPassword: z
		.string()
		.regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
			message:
				"Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
		}),

}).refine(data => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
	path: ['confirmPassword'],
});
export type FormSchema = typeof formSchema;


export const loginSchema = z.object({

	email: z.string().email('Invalid email format').refine(
		async (email) => !(await isEmailAlreadyRegistered(email)),
		{
			message: 'Email is already registered',
		}
	),
	password: z
		.string()
		.regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
			message:
				"Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
		}),
});
export type LoginSchema = typeof loginSchema;

export const resetPasswordSchema = z.object({

	email: z.string().email('Invalid email format').refine(
		async (email) => !(await isEmailAlreadyRegistered(email)),
		{
			message: 'Email is already registered',
		}
	),

	password: z
		.string()
		.regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
			message:
				"Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
		}),
	newPassword: z
		.string()
		.regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
			message:
				"Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
		}),
	confirmPassword: z
		.string()
		.regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
			message:
				"Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
		}),

}).refine(data => data.newPassword === data.confirmPassword, {
	message: 'Passwords do not match',
	path: ['confirmPassword'],
});
export type ResetPasswordSchema = typeof resetPasswordSchema;

export const discussionSchema = z.object({
	title: z.string()
		.min(2, 'Title must be at least 2 characters')
		.max(50, 'Title must be at most 50 characters'),
	date: z.string({ required_error: "Please enter a date of discussion" }),
	time: z.string({ required_error: "Please enter a of discussion" }),
	type: z
		.string({ required_error: "Please select an type of discussion" })

});
export type DiscussionSchema = typeof discussionSchema;

export const forumSchema = z.object({
	title: z.string()
		.min(2, 'Title must be at least 2 characters')
		.max(50, 'Title must be at most 50 characters'),
	create: z.boolean().default(false),
	display: z.boolean().default(false),
	allow: z.boolean().default(false),
	topic: z.boolean().default(false),
	description: z.string()
});
export type ForumSchema = typeof forumSchema;
