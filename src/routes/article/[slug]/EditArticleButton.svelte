<script lang="ts">
	import { goto } from '$app/navigation';
	export let slug: string;
</script>

<button class="btn btn-sm btn-outline-secondary" on:click={() => goto(`/editor/${slug}`)}>
	<i class="ion-edit" /> Edit Article　未実装
</button>
