<script lang="ts">
	import Form from '$lib/components/form-data/form.svelte';
	export let data;
</script>

<svelte:head>
	<title>SignUp</title></svelte:head
>

<Form data={data.form} />
