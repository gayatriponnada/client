<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { loginSchema, type LoginSchema } from '$lib/database/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { goto } from '$app/navigation';
	export let data: SuperValidated<Infer<LoginSchema>>;
	const form = superForm(data, {
		validators: zodClient(loginSchema),
		onResult: async ({ result }) => {
			if (result.type == 'success') {
				toast.success('Login successful');
				await goto('/');
			}
		}
	});
	export { data as form };
	const { form: formData, enhance } = form;
</script>

<main class="flex justify-center items-center w-screen h-screen">
	<form action="?/login" method="POST" use:enhance class="flex justify-center w-4/5">
		<div class=" w-2/5 border-2 rounded-md">
			<header class="text-center text-3xl font-semibold p-5">Login</header>
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
			<div class="p-5">
				<Form.Button class="p-5 w-full">Login</Form.Button>
			</div>
		</div>
	</form>
</main>
