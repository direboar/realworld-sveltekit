<script lang="ts">
	import type { components } from '$lib/api/apitypes';
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
		favoritesCount: 11,
		author: {
			username: 'Eric xxx',
			bio: 'bio',
			following: true,
			image: 'https://api.realworld.io/images/demo-avatar.png'
		}
	};
</script>

<button
	class="btn btn-sm {article.favorited ? 'btn-primary' : 'btn-outline-primary'}"
	formaction="?/{article.favorited ? 'deleteFavolite' : 'addFavolite'}"
>
	<i class="ion-heart" />
	&nbsp; {article.favorited ? 'Unfavorite' : 'Favorite'} Post
	<span class="counter">({article.favoritesCount})</span>
</button>
