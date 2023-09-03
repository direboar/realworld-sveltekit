<script lang="ts">
	import Editor from '../Editor.svelte';
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	export let data: PageData;
</script>

<Editor article={data.article} {form} edit={true} />
