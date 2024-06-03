<script lag="ts">
	import DiscussionForm from '$lib/components/form-data/discussion-form.svelte';
	export let data;
</script>

<svelte:head>
	<title>Discussion Form</title>
</svelte:head>
<DiscussionForm data={data.form} />
