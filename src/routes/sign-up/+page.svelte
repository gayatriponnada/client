<script lang="ts">
	import Form from '$lib/components/form-data/sign-up-form.svelte';
	export let data;
</script>

<svelte:head>
	<title>SignUp</title></svelte:head
>

<Form data={data.form} />
