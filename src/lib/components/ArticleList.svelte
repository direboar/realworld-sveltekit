<script lang="ts">
	import { enhance } from '$app/forms';
	import type { article } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import ArticleListItem from '$lib/components/ArticleListItem.svelte';

	import { getPageLimit } from '$lib/utils/utils';

	const pageLimit = getPageLimit();

	export let articles: article[];
	export let articlesCount: number;
	export let action: string; //?/displayFeed or ?/displayTag
	export let currentTab: string; //displayFeed,displayTagに指定するhidden parameter。タブ名と同一になる設計としている。
	export let nowLoading: boolean;
	export let pagenation: boolean;
	export let currentPage: number;

	$: totalPage = articlesCount ? Math.ceil(articlesCount / pageLimit) : 0;

	export let updateFormResultPagenation: SubmitFunction;
</script>

{nowLoading}
{#if nowLoading}
	<div class="article-preview">
		<p>Loading Articles...</p>
	</div>
{:else}
	{#each articles as article}
		<ArticleListItem {article} />
	{/each}
	{#if pagenation}
		<div class="article-preview">
			<p>Loading Articles...</p>
		</div>
	{/if}
	<ul class="pagination">
		<form id="button" method="POST" action="?/{action}" use:enhance={updateFormResultPagenation}>
			<input type="hidden" name="value" value={currentTab} />

			{#each Array(totalPage) as _, i}
				<li class="page-item {currentPage === i + 1 ? 'active' : ''}">
					<button class="page-link" name="page" value={i + 1}>{i + 1} </button>
				</li>
			{/each}
		</form>
	</ul>
{/if}
