<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import CardAction from './CardAction.svelte';
	import CommentList from './CommentList.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	let article = data.article;
	let comments = data.comments;

	import { articleStore } from './articlestore';
	if (article) {
		articleStore.set(article);
	}

	articleStore.subscribe((value) => {
		article = value;
	});

	// import { commentsStore } from './commentsstore';
	// if (comments) {
	// 	commentsStore.set(comments);
	// }
	// commentsStore.subscribe((value) => {
	// 	comments = value;
	// });

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
