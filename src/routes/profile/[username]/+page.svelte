<script lang="ts">
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	import ArticleList from '$lib/components/ArticleList.svelte';
	import FollowButton from '$lib/components/FollowButton.svelte';

	export let data: PageData;
	import type { article } from '$lib/types';

	let articles: article[] = data.articles;
	let articlesCount: number = data.articlesCount;
	let profile: article['author'] = data.profile;

	let currentTab = 'My Articles'; //Your Feed or tags
	let currentPage = 1;
	let nowLoading = false;
	let pagenation = false;

	const updateFormResult: SubmitFunction = () => {
		nowLoading = true;
		return async ({ result }) => {
			articles = result.data.articles;
			articlesCount = result.data.articlesCount;
			currentPage = result.data.page;
			nowLoading = false;
		};
	};
	const updateFormResultPagenation: SubmitFunction = () => {
		pagenation = true;
		return async ({ result }) => {
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
					{#if !data.user || data.user.username !== profile.username}
						<FollowButton
							{profile}
							on:updateAuthor={(e) => {
								profile = e.detail.author;
							}}
						/>
					{:else}
						<a class="btn btn-sm btn-outline-secondary action-btn" href="/settings">
							<i class="ion-gear-a" />
							&nbsp; Edit Profile Settings
						</a>
					{/if}
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
				<ArticleList
					{articles}
					{articlesCount}
					{currentTab}
					{nowLoading}
					{pagenation}
					{currentPage}
					{updateFormResultPagenation}
					action="displayFeed"
				/>
			</div>
		</div>
	</div>
</div>
