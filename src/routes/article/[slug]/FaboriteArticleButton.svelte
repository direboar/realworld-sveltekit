<script lang="ts">
	import type { article } from '$lib/types';
	export let article: article;

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { ArticleStore } from './articlestore';

	const store = ArticleStore.getStore();

	const update: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.data?.article) {
				console.log(result.data.article);
				store.updateArticle(result.data?.article);
			}
		};
	};
</script>

<form id="buttons" class="nav-link" method="POST" action="?/toggleFavolite" use:enhance={update}>
	<input type="hidden" name="favorited" value={article.favorited} />
	<button class="btn btn-sm {article.favorited ? 'btn-primary' : 'btn-outline-primary'}">
		<i class="ion-heart" />
		&nbsp; {article.favorited ? 'Unfavorite' : 'Favorite'} Post
		<span class="counter">({article.favoritesCount})</span>
	</button>
</form>
