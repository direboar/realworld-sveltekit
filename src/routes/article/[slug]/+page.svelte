<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import CardAction from './CardAction.svelte';
	import CommentList from './CommentList.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	let article = data.article;
	let comments = data.comments;

	//followやlikeの状態を同じ画面の別の個所で管理している。
	//オブジェクトの引き回しが面倒なため、storeを使用しfollowやlikeをしたらstoreの状態を最新に更新する。
	//なお、状態の参照はpageからpropsで引き渡す。
	import { articleStore } from './articlestore';
	if (article) {
		articleStore.set(article);
	}
	articleStore.subscribe((value) => {
		article = value;
	});

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
