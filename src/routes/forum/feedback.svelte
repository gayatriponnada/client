<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import ForumForm from '$lib/components/form-data/forum-form.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Button } from '$lib/components/ui/button';
	import Close from './close.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	function closeFeedback() {
		dispatch('close');
	}
</script>

<main
	class="flex justify-center items-center w-screen h-screen bg-primary bg-opacity-70 inset-0 z-10 fixed"
>
	<div class="w-2/6 flex justify-center flex-col border-2 rounded-md">
		<div class="flex justify-between">
			<header class="text-center text-3xl font-semibold p-5 text-secondary">Feedback</header>
			<button class="flex items-center p-5" on:click={closeFeedback}><Close /></button>
		</div>
		<div class="flex flex-col gap-1 py-2 px-5">
			<Label for="email" class="text-secondary">Email</Label>
			<Input type="email" id="email" name="email" class="rounded-md p-2" />
		</div>
		<div class="flex flex-col gap-1 py-2 px-5">
			<Label for="feedback" class="text-secondary">Feedback</Label>
			<textarea id="feedback" name="feedback" class="border-2 rounded-md p-2 outline-none"
			></textarea>
		</div>
		<div class="p-5">
			<Button class="p-5 w-full">Submit</Button>
		</div>
	</div>
</main>
