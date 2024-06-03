<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { forumSchema, type ForumSchema } from '$lib/database/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Label from '../ui/label/label.svelte';

	let editor: any;

	export let toolbarOptions = [
		[
			{
				bold: {
					title: 'Bold'
				}
			},
			'italic',
			'underline',
			'strike'
		], // toggled buttons
		['blockquote', 'code-block'],
		[{ header: 1 }, { header: 2 }], // custom button values
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
		[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
		[{ direction: 'rtl' }], // text direction
		[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		[{ font: [] }],
		[{ align: [] }],
		['clean'], // remove formatting button
		['link', 'image']
	];

	onMount(async () => {
		const { default: Quill } = await import('quill');

		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
	});

	export let data: SuperValidated<Infer<ForumSchema>> = $page.data.checkboxSingle;

	const form = superForm(data, {
		validators: zodClient(forumSchema)
	});

	const { form: formData, enhance } = form;
</script>

<main class=" w-screen h-screen">
	<h2 class="text-3xl p-5">New Forum</h2>
	<form action="" method="POST" use:enhance class="">
		<div class="  border-2 rounded-md flex flex-col gap-2 m-5">
			<h2 class="text-3xl p-2">New Forum Details</h2>
			<Form.Field {form} name="title" class="flex flex-col gap-1 py-2 px-5">
				<Form.Control let:attrs>
					<Form.Label>Title</Form.Label>
					<Input {...attrs} class="w-1/3" bind:value={$formData.title} type="email" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field
				{form}
				name="create"
				class="flex flex-row items-start space-x-3 space-y-0 w-1/3 pl-4"
			>
				<Form.Control let:attrs>
					<Checkbox {...attrs} bind:checked={$formData.create} />
					<div class="space-y-1 leading-none">
						<Form.Label class="font-normal"
							>Create a new topic in this forum using same title</Form.Label
						>
					</div>
					<input name={attrs.name} value={$formData.create} hidden />
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="description" class="flex flex-col gap-1 py-2 px-5">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>
					<div>
						<div class="h-full w-full" bind:this={editor} />
					</div>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Label class="py-2 px-5">Options</Label>
			<Form.Field
				{form}
				name="allow"
				class="flex flex-row items-start space-x-3 space-y-0 w-1/3 pl-4"
			>
				<Form.Control let:attrs>
					<Checkbox {...attrs} bind:checked={$formData.allow} />
					<div class="space-y-1 leading-none">
						<Form.Label class="font-normal">Allow anonymous posts</Form.Label>
					</div>
					<input name={attrs.name} value={$formData.allow} hidden />
				</Form.Control>
			</Form.Field>
			<Form.Field
				{form}
				name="display"
				class="flex flex-row items-start space-x-3 space-y-0 w-1/3 pl-4"
			>
				<Form.Control let:attrs>
					<Checkbox {...attrs} bind:checked={$formData.display} />
					<div class="space-y-1 leading-none">
						<Form.Label class="font-normal">Display forum description in topics</Form.Label>
					</div>
					<input name={attrs.name} value={$formData.display} hidden />
				</Form.Control>
			</Form.Field>
			<Form.Field
				{form}
				name="topic"
				class="flex flex-row items-start space-x-3 space-y-0 w-2/5 pl-4"
			>
				<Form.Control let:attrs>
					<Checkbox {...attrs} bind:checked={$formData.topic} />
					<div class="space-y-1 leading-none">
						<Form.Label class="font-normal"
							>A modetator must approve individual post before they dispaly forum</Form.Label
						>
					</div>
					<input name={attrs.name} value={$formData.topic} hidden />
				</Form.Control>
			</Form.Field>

			<div class="p-5">
				<Form.Button class="p-5">Save and Add Topic</Form.Button>
				<Form.Button class="p-5">Save</Form.Button>
				<Form.Button class="p-5">Cancel</Form.Button>
			</div>
		</div>
	</form>
</main>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
