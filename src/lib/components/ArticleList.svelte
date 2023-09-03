<script lang="ts">
	import type { article } from '$lib/types';
	import ArticleListItem from '$lib/components/ArticleListItem.svelte';
	export let articles: article[] = [];
</script>

{#each articles as article}
	<ArticleListItem {article} />
{/each}
