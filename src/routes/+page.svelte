<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let data;
</script>

<div>
	<h1>User Details</h1>
	<pre>{JSON.stringify(data.user)}</pre>
	<form action="?/logout" method="POST">
		<Button type="submit">Logout</Button>
	</form>
</div>
