<script lang="ts">
	import ResetPasswordForm from '$lib/components/form-data/reset-password-form.svelte';
	export let data;
</script>

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<ResetPasswordForm data={data.form} />
