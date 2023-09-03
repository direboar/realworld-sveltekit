<script lang="ts">
	import DeleteArticleButton from './DeleteArticleButton.svelte';
	import EditArticleButton from './EditArticleButton.svelte';
	import FaboriteArticleButton from './FaboriteArticleButton.svelte';
	import FollowButton from './FollowButton.svelte';
	import ProfileIcon from '$lib/components/molecure/ProfileIcon.svelte';
	import type { article } from '$lib/types';

	export let article: article;
	export let owner: boolean;
</script>

<div class="article-meta">
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
</div>
