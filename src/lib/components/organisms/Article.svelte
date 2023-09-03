<script lang="ts">
	import type { components } from '$lib/api/apitypes';
	export let article: components['schemas']['Article'] = {
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

<div class="row article-content">
	<div class="col-md-12">
		<p>{article.body}</p>
		<ul class="tag-list">
			{#each article.tagList as tag}
				<li class="tag-default tag-pill tag-outline">{tag}</li>
			{/each}
		</ul>
	</div>
</div>
