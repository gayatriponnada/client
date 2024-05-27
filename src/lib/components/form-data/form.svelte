<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from '$lib/database/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<main class="flex justify-center items-center w-screen h-screen">
	<form action="?/signUp" method="POST" use:enhance class="flex justify-center w-4/5">
		<div class=" w-2/5 border-2 rounded-md">
			<header class="text-center text-3xl font-semibold p-5">Sign Up</header>
			<Form.Field {form} name="name" class="flex flex-col gap-1 py-2 px-5">
				<Form.Control let:attrs>
					<Form.Label>Username</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email" class="flex flex-col gap-1 py-2 px-5">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password" class="flex flex-col gap-1 py-2 px-5">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} bind:value={$formData.password} type="password" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="confirmPassword" class="flex flex-col gap-1 py-2 px-5">
				<Form.Control let:attrs>
					<Form.Label>Confirm Password</Form.Label>
					<Input {...attrs} bind:value={$formData.confirmPassword} type="password" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="p-5">
				<Form.Button class="p-5 w-full " type="submit">Sign Up</Form.Button>
			</div>
		</div>
	</form>
</main>
