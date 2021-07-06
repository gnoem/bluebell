<script lang="ts">
	import "./App.css";
	import { CreateList, Lists } from "./components";
	import { Homepage } from "./layouts";

	let page = 'new';

	const navigate = (pageName: string): void => {
		page = pageName;
	}
</script>

<Homepage {navigate}>
	{#if page === 'lists'}
		<Lists />
	{:else if page === 'new'}
		<CreateList />
	{/if}
</Homepage>