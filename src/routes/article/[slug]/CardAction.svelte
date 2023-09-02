<script lang="ts">
	import DeleteArticleButton from './DeleteArticleButton.svelte';
	import EditArticleButton from '../../../lib/components/molecure/EditArticleButton.svelte';
	import FaboriteArticleButton from '$lib/components/molecure/FaboriteArticleButton.svelte';
	import FollowButton from '$lib/components/molecure/FollowButton.svelte';
	import ProfileIcon from '$lib/components/molecure/ProfileIcon.svelte';
	import type { article, user } from '$lib/types';
	export let article: article;
	export let owner: boolean;
</script>

<div class="article-meta">
	<form id="buttons" method="POST" action="?/">
		<ProfileIcon profile={article?.author} createdAt={article?.createdAt} />
		<FollowButton profile={article?.author} />
		&nbsp;&nbsp;
		<FaboriteArticleButton {article} />
		{#if owner}
			<EditArticleButton />
			<DeleteArticleButton />
		{/if}
	</form>
</div>
