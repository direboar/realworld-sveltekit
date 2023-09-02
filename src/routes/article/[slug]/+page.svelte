<script lang="ts">
	import DeleteArticleButton from './DeleteArticleButton.svelte';
	import EditArticleButton from '../../../lib/components/molecure/EditArticleButton.svelte';
	import FaboriteArticleButton from '$lib/components/molecure/FaboriteArticleButton.svelte';
	import FollowButton from '$lib/components/molecure/FollowButton.svelte';
	import ProfileIcon from '$lib/components/molecure/ProfileIcon.svelte';

	import CommentList from './CommentList.svelte';
	import CardAction from './CardAction.svelte';

	import Article from '$lib/components/organisms/Article.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	let article = data.article;
	let comments = data.comments;

	$: owner = data.user && data.user.username === article?.author.username;
</script>

<div class="article-page">
	<div class="banner">
		<div class="container">
			<h1>{article?.title}</h1>
			<CardAction {article} {owner} />
		</div>
	</div>

	<div class="container page">
		<Article {article} />

		<hr />

		<div class="article-actions">
			<CardAction {article} {owner} />
		</div>

		<CommentList user={data.user} {comments} />
	</div>
</div>
