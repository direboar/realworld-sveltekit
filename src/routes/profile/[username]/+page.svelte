<script lang="ts">
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	import ArticleList from '$lib/components/organisms/ArticleList.svelte';
	import { getPageLimit } from '$lib/utils/utils';

	const pageLimit = getPageLimit();

	export let data: PageData;
	let { articles, articlesCount, profile } = { ...data };

	let currentTab = 'My Articles'; //Your Feed or tags
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

<div class="profile-page">
	<div class="user-info">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<img src={profile.image} class="user-img" />
					<h4>{profile.username}</h4>
					<p>{profile.bio ? profile.bio : ''}</p>
					<button class="btn btn-sm btn-outline-secondary action-btn">
						<i class="ion-plus-round" />
						&nbsp; Follow Eric Simons
					</button>
					<button class="btn btn-sm btn-outline-secondary action-btn">
						<i class="ion-gear-a" />
						&nbsp; Edit Profile Settings
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-md-10 offset-md-1">
				<div class="articles-toggle">
					<form id="button" method="POST" action="?/displayFeed" use:enhance={updateFormResult}>
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<button
									class="nav-link {currentTab === 'My Articles' ? 'active' : ''}"
									name="value"
									value="My Articles"
									on:click={() => {
										currentTab = 'My Articles';
									}}>My Articles</button
								>
							</li>
							<li class="nav-item">
								<button
									class="nav-link {currentTab === 'Favorited Articles' ? 'active' : ''}"
									name="value"
									value="Favorited Articles"
									on:click={() => {
										currentTab = 'Favorited Articles';
									}}>Favorited Articles</button
								>
							</li>
						</ul>
					</form>
				</div>

				<ArticleList {articles} />

				<ul class="pagination">
					<form
						id="button"
						method="POST"
						action="?/displayFeed"
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
			</div>
		</div>
	</div>
</div>
