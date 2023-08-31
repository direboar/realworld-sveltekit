<script lang="ts">
	import type { components } from '$lib/api/apitypes';
	import ProfileIcon from '$lib/components/molecure/ProfileIcon.svelte';
	export let article: components['schemas']['Article'] = {
		//test data.
		slug: '',
		title: 'Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!',
		description:
			'Assumenda molestiae laboriosam enim ipsum quaerat enim officia vel quo. Earum odit rem natus totam atque cumque. Sint dolorem facere non.',
		body: '',
		tagList: ['realworld', 'implementations'],
		createdAt: 'January 20th',
		updatedAt: '',
		favorited: true,
		favoritesCount: 29,
		author: {
			username: 'Eric Simons',
			bio: '',
			following: false,
			image: 'https://api.realworld.io/images/demo-avatar.png'
		}
	};
</script>

<div class="article-preview">
	<div class="article-meta">
		<ProfileIcon profile={article.author} createdAt={article.createdAt} />
		<button class="btn btn-outline-primary btn-sm pull-xs-right">
			<i class="ion-heart" />
			{article.favoritesCount}
		</button>
	</div>
	<a href="/article/{article.slug}" class="preview-link">
		<h1>{article.title}</h1>
		<p>{article.description}</p>
		<span>Read more...</span>
		<ul class="tag-list">
			{#each article.tagList as tag}
				<li class="tag-default tag-pill tag-outline">{tag}</li>
			{/each}
		</ul>
	</a>
</div>
