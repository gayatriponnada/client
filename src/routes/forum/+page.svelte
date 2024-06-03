<script lag="ts">
	import ForumForm from '$lib/components/form-data/forum-form.svelte';
	export let data;
</script>

<svelte:head>
	<title>New Forum</title>
</svelte:head>
<ForumForm data={data.form} />
