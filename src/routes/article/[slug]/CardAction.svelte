<script lang="ts">
	import DeleteArticleButton from './DeleteArticleButton.svelte';
	import EditArticleButton from '../../../lib/components/molecure/EditArticleButton.svelte';
	import FaboriteArticleButton from './FaboriteArticleButton.svelte';
	import FollowButton from './FollowButton.svelte';
	import ProfileIcon from '$lib/components/molecure/ProfileIcon.svelte';
	import type { article } from '$lib/types';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { articleStore, updateAuthor } from '$lib/store/article';

	export let article: article;
	export let owner: boolean;

	const update: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.data.article) {
				articleStore.set(result.data.article);
			} else if (result.data.author) {
				updateAuthor(result.data.author);
			}
		};
	};
</script>

<div class="article-meta">
	<form id="buttons" method="POST" action="?/" use:enhance={update}>
		<ProfileIcon profile={article?.author} createdAt={article?.createdAt} />
		{#if !owner}
			<FollowButton profile={article?.author} />
		{/if}
		&nbsp;&nbsp;
		<FaboriteArticleButton {article} />
		{#if owner}
			<EditArticleButton />
			<DeleteArticleButton />
		{/if}
	</form>
</div>
