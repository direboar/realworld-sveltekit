<script lang="ts">
	import DeleteArticleButton from '$lib/components/molecure/DeleteArticleButton.svelte';
	import EditArticleButton from '$lib/components/molecure/EditArticleButton.svelte';
	import FaboriteArticleButton from '$lib/components/molecure/FaboriteArticleButton.svelte';
	import FollowButton from '$lib/components/molecure/FollowButton.svelte';
	import ProfileIcon from '$lib/components/molecure/ProfileIcon.svelte';

	import CommentList from '$lib/components/organisms/CommentList.svelte';
	import Article from '$lib/components/organisms/Article.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	let article = data.article;
	let comments = data.comments;

	export let owner = false;
</script>

<div class="article-page">
	<div class="banner">
		<div class="container">
			<h1>{article?.title}</h1>
			<div class="article-meta">
				<ProfileIcon profile={article?.author} createdAt={article?.createdAt} />
				<FollowButton profile={article?.author} />
				&nbsp;&nbsp;
				<FaboriteArticleButton {article} />
				{#if owner}
					<EditArticleButton />
					<DeleteArticleButton />
				{/if}
			</div>
		</div>
	</div>

	<div class="container page">
		<Article {article} />

		<hr />

		<div class="article-actions">
			<div class="article-meta">
				<ProfileIcon profile={article.author} />
				<FollowButton profile={article.author} />
				&nbsp;&nbsp;
				<FaboriteArticleButton {article} />
				{#if owner}
					<EditArticleButton />
					<DeleteArticleButton />
				{/if}
			</div>
		</div>

		<CommentList authenticated={!!data.user} {comments} />
	</div>
</div>
