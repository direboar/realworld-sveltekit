<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import ArticleList from '$lib/components/organisms/ArticleList.svelte';

	import { getPageLimit } from '$lib/utils/utils';

	export let data: PageData;

	const pageLimit = getPageLimit();

	let articles = data.articles;
	let articlesCount = data.articlesCount;
	let tags = data.tags;

	let currentTab = 'Global Feed'; //Your Feed or tags
	let currentPage = 1;
	$: totalPage = articlesCount ? Math.ceil(articlesCount / pageLimit) : 0;

	let nowLoading = false;
	let pagenation = false;

	const updateFormResult: SubmitFunction = () => {
		nowLoading = true;
		return async ({ result, update }) => {
			articles = result.data.articles;
			articlesCount = result.data.articlesCount;
			currentPage = result.data.page;
			nowLoading = false;
		};
	};
	const updateFormResultPagenation: SubmitFunction = () => {
		pagenation = true;
		return async ({ result, update }) => {
			articles = result.data.articles;
			articlesCount = result.data.articlesCount;
			currentPage = result.data.page;
			pagenation = false;
		};
	};
</script>

<div class="home-page">
	<div class="banner">
		<div class="container">
			<h1 class="logo-font">conduit</h1>
			<p>A place to share your knowledge.</p>
		</div>
	</div>

	<div class="container page">
		<div class="row">
			<div class="col-md-9">
				<div class="feed-toggle">
					<form id="button" method="POST" action="?/displayFeed" use:enhance={updateFormResult}>
						<ul class="nav nav-pills outline-active">
							{#if data.user}
								<li class="nav-item">
									<button
										class="nav-link {currentTab === 'Your Feed' ? 'active' : ''}"
										name="value"
										value="Your Feed"
										on:click={() => (currentTab = 'Your Feed')}>Your Feed</button
									>
								</li>
							{/if}
							<li class="nav-item">
								<button
									class="nav-link {currentTab === 'Global Feed' ? 'active' : ''}"
									name="value"
									value="Global Feed"
									on:click={() => (currentTab = 'Global Feed')}>Global Feed</button
								>
							</li>
							{#if !currentTab.endsWith('Feed')}
								<li class="nav-item">
									<div class="nav-link active">{currentTab}</div>
								</li>
							{/if}
						</ul>
					</form>
				</div>
				{#if nowLoading}
					<div class="article-preview">
						<p>Loading Articles...</p>
					</div>
				{:else}
					<ArticleList {articles} />
					{#if pagenation}
						<div class="article-preview">
							<p>Loading Articles...</p>
						</div>
					{/if}
					<ul class="pagination">
						<form
							id="button"
							method="POST"
							action="?/{currentTab.endsWith('Feed') ? 'displayFeed' : 'displayTag'}"
							use:enhance={updateFormResultPagenation}
						>
							<input type="hidden" name="value" value={currentTab} />

							{#each Array(totalPage) as _, i}
								<li class="page-item {currentPage === i + 1 ? 'active' : ''}">
									<button class="page-link" name="page" value={i + 1}>{i + 1} </button>
								</li>
							{/each}
						</form>
					</ul>
				{/if}
			</div>

			<div class="col-md-3">
				<div class="sidebar">
					<div class="sidebar">
						<p>Popular Tags</p>

						<form method="POST" action="?/displayTag" use:enhance={updateFormResult}>
							<div class="tag-list">
								{#each tags as tag}
									<button
										name="value"
										value={tag}
										class="btn-link tag-pill tag-default"
										on:click={() => (currentTab = tag)}>{tag}</button
									>
								{/each}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
