<script lang="ts">
	import type { components } from '$lib/api/apitypes';
	export let comments: components['schemas']['Comment'][] = [
		{
			id: 0,
			createdAt: '2023-08-29T16:39:40.358Z',
			updatedAt: '2023-08-29T16:39:40.358Z',
			author: {
				username: 'string',
				bio: 'string',
				image: 'string',
				following: true
			},
			body: 'xxx'
		}
	];
	export let authenticated = false;
</script>

<div>
	<div class="col-xs-12 col-md-8 offset-md-2">
		{#if authenticated}
			<form class="card comment-form">
				<div class="card-block">
					<textarea class="form-control" placeholder="Write a comment..." rows="3" />
				</div>
				<div class="card-footer">
					<img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
					<button class="btn btn-sm btn-primary">Post Comment</button>
				</div>
			</form>
		{/if}

		{#each comments as comment}
			<div class="card">
				<div class="card-block">
					<p class="card-text" />
					{comment.body}
				</div>
				<div class="card-footer">
					<a href="/profile/author" class="comment-author">
						<img src={comment.author.image} class="comment-author-img" />
					</a>
					&nbsp;
					<a href="/profile/jacob-schmidt" class="comment-author">{comment.author.username}</a>
					<span class="date-posted">{comment.createdAt}</span>
				</div>
			</div>
		{/each}
	</div>
</div>
