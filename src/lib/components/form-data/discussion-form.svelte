<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { discussionSchema, type DiscussionSchema } from '$lib/database/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import CalendarIcon from 'svelte-radix/Calendar.svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	export let data: SuperValidated<Infer<DiscussionSchema>> = $page.data.select;

	const form = superForm(data, {
		validators: zodClient(discussionSchema)
	});

	const { form: formData, enhance } = form;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value: DateValue | undefined = undefined;

	$: selectedType = $formData.type
		? {
				label: $formData.type,
				value: $formData.type
			}
		: undefined;
</script>

<main class="flex justify-center items-center w-screen h-screen">
	<form action="" method="POST" use:enhance class="flex justify-center w-4/5">
		<div class=" w-2/5 border-2 rounded-md">
			<header class="text-center text-3xl font-semibold p-5">Discussion Form</header>
			<Form.Field {form} name="title" class="flex flex-col gap-1 py-2 px-5">
				<Form.Control let:attrs>
					<Form.Label>Title</Form.Label>
					<Input {...attrs} bind:value={$formData.title} type="text" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="time" class="flex flex-col gap-1 py-2 px-5">
				<Form.Control let:attrs>
					<Popover.Root>
						<Popover.Trigger asChild let:builder>
							<Form.Label>Date</Form.Label>
							<Button
								variant="outline"
								class={cn(
									' justify-start text-left font-normal',
									!value && 'text-muted-foreground'
								)}
								builders={[builder]}
							>
								<CalendarIcon class="mr-2 h-4 w-4" />
								{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
							</Button>
						</Popover.Trigger>
						<Popover.Content class="w-auto p-0" align="start">
							<Calendar bind:value />
						</Popover.Content>
					</Popover.Root>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="time" class="flex flex-col gap-1 py-2 px-5">
				<Form.Control let:attrs>
					<Form.Label>Time</Form.Label>
					<Input
						{...attrs}
						class="cursor-pointer"
						bind:value={$formData.time}
						type="time"
						required
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="type" class="flex flex-col gap-1 py-2 px-5">
				<Form.Control let:attrs>
					<Form.Label>Type of Discussion</Form.Label>
					<Select.Root
						selected={selectedType}
						onSelectedChange={(v) => {
							v && ($formData.type = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select a type of discussion" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="Group Discussion" label="Group Discussion" />
							<Select.Item value="Individual Meeting" label="Individual Meeting" />
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.type} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="p-5">
				<Form.Button class="p-5 w-full ">Submit</Form.Button>
			</div>
		</div>
	</form>
</main>
