<script lang="ts">
	import { enhance } from '$app/forms';
	import type { comment } from '$lib/types';
	import type { user } from '$lib/types';
	export let comments: comment[] = [];

	import { addComment } from '$lib/store/comments';

	export let user: user;
	let comment = '';

	import type { SubmitFunction } from '@sveltejs/kit';
	const update: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.data && result.data.comment) {
				addComment(result.data.comment);
				comment = '';
			}
		};
	};
</script>

<div>
	<div class="col-xs-12 col-md-8 offset-md-2">
		{#if !!user}
			<div class="card">
				<form id="button" method="POST" action="?/postComment" use:enhance={update}>
					<div class="card-block">
						<textarea
							class="form-control"
							placeholder="Write a comment..."
							rows="3"
							name="comment"
							bind:value={comment}
							required
						/>
					</div>
					<div class="card-footer">
						<img src={user.image} class="comment-author-img" />
						<button class="btn btn-sm btn-primary">Post Comment</button>
					</div>
				</form>
			</div>
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
