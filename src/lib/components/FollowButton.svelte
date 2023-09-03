<script lang="ts">
	import type { article } from '$lib/types';
	export let profile: article['author'];

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// import { updateAuthor } from './articlestore';
	const update: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.data?.author) {
				let pProfile = result.data?.author as article['author'];
				dispatch('updateAuthor', {
					author: pProfile
				});
			}
		};
	};
</script>

<form
	id="buttons"
	class="nav-link"
	method="POST"
	action="/profile/{profile.username}?/toggleFollowing"
	use:enhance={update}
>
	<input type="hidden" name="username" value={profile.username} />
	<input type="hidden" name="following" value={profile.following} />
	<button class="btn btn-sm {profile.following ? 'btn-primary' : 'btn-outline-primary'}">
		<i class="ion-heart" />
		&nbsp; {profile.following ? 'UnFollow' : 'Follow'}
		{profile.username}
	</button>
</form>
