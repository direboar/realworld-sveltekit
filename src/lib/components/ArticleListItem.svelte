<script lang="ts">
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';

	import type { article } from '$lib/types';
	export let article: article;
	import { goto } from '$app/navigation';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	const update: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				goto(result.location);
			}
			if (result.status === 200) {
				const pArticle = result.data.article;
				favorited = pArticle.favorited;
				favoritesCount = pArticle.favoritesCount;
			}
		};
	};

	let favorited = article.favorited;
	let favoritesCount = article.favoritesCount;
</script>

<div class="article-preview">
	<div class="article-meta">
		<ProfileIcon profile={article.author} createdAt={article.createdAt} />
		<form
			id="button"
			method="POST"
			action="/article/{article.slug}?/toggleFavolite"
			use:enhance={update}
		>
			<input type="hidden" name="favorited" value={favorited} />
			<button class="btn btn-sm pull-xs-right {favorited ? 'btn-primary' : 'btn-outline-primary'}">
				<i class="ion-heart" />
				{favoritesCount}
			</button>
		</form>
	</div>
	<a href="/article/{article.slug}" class="preview-link">
		<h1>{article.title}</h1>
		<p>{article.description}</p>
		<span>Read more...</span>
		<ul class="tag-list">
			{#each article.tagList as tag}
				<li class="tag-default tag-pill tag-outline">{tag}</li>
			{/each}
		</ul>
	</a>
</div>
