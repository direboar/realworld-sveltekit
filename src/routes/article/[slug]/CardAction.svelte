<script lang="ts">
	import DeleteArticleButton from './DeleteArticleButton.svelte';
	import EditArticleButton from './EditArticleButton.svelte';
	import FaboriteArticleButton from './FaboriteArticleButton.svelte';
	import FollowButton from '$lib/components/FollowButton.svelte';
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';
	import type { article } from '$lib/types';

	import { ArticleStore } from './articlestore';

	export let article: article;
	export let owner: boolean;
	const store = ArticleStore.getStore();
</script>

<div class="article-meta">
	<ProfileIcon profile={article?.author} createdAt={article?.createdAt} />
	{#if !owner}
		<FollowButton
			profile={article?.author}
			on:updateAuthor={(e) => {
				store.updateAuthor(e.detail.author);
			}}
		/>
	{/if}
	&nbsp;&nbsp;
	<FaboriteArticleButton {article} />
	{#if owner}
		<EditArticleButton slug={article.slug} />
		<DeleteArticleButton />
	{/if}
</div>
