<script lang="ts">
	import LoginForm from '$lib/components/form-data/login-form.svelte';
	export let data;
</script>

<svelte:head><title>Login</title></svelte:head>

<LoginForm form={data.form} />
