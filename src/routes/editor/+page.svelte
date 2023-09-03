<script lang="ts">
	import Editor from './Editor.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<Editor {form} />
