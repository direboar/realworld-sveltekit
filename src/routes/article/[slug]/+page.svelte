<script lang="ts">
	import DeleteArticleButton from '$lib/components/molecure/DeleteArticleButton.svelte';
	import EditArticleButton from '$lib/components/molecure/EditArticleButton.svelte';
	import FaboriteArticleButton from '$lib/components/molecure/FaboriteArticleButton.svelte';
	import FollowButton from '$lib/components/molecure/FollowButton.svelte';
	import ProfileIcon from '$lib/components/molecure/ProfileIcon.svelte';
	import CommentList from '$lib/components/organisms/CommentList.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	let article = data.article;
	let comments = data.comments;

	export let owner = false;
	export let authenticated = false;
</script>

<div class="article-page">
	<div class="banner">
		<div class="container">
			<h1>{article.title}</h1>
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
	</div>

	<div class="container page">
		<div class="row article-content">
			<div class="col-md-12">
				<p>
					Web development technologies have evolved at an incredible clip over the past few years.
				</p>
				<h2 id="introducing-ionic">Introducing RealWorld.</h2>
				<p>It's a great solution for learning how other frameworks work.</p>
				<ul class="tag-list">
					<li class="tag-default tag-pill tag-outline">realworld</li>
					<li class="tag-default tag-pill tag-outline">implementations</li>
				</ul>
			</div>
		</div>

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

		<CommentList {authenticated} {comments} />
	</div>
</div>
