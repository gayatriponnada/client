<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	let newThreadTitle = '';
	let threads = [];

	function addThread() {
		if (newThreadTitle.trim() !== '') {
			threads = [...threads, { title: newThreadTitle, posts: [] }];
			newThreadTitle = '';
		}
	}
</script>

<div class="flex gap-2 p-2">
	<Input class="w-1/5" bind:value={newThreadTitle} placeholder="New thread title" />
	<Button on:click={addThread}>Add Thread</Button>
</div>

{#each threads as thread}
	<div class="p-2 m-2 border-2 rounded-md">
		<h2 class="p-2">{thread.title}</h2>
		<ul>
			<li>{thread.posts}</li>
		</ul>
		<Input placeholder="New post" />
	</div>
{/each}
