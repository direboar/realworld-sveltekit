<script lang="ts">
	import type { components } from '$lib/api/apitypes';
	import ArticleListItem from '$lib/components/ArticleListItem.svelte';
	export let articles: components['schemas']['Article'][] = [
		{
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
		}
	];
</script>

{#each articles as article}
	<ArticleListItem {article} />
{/each}
