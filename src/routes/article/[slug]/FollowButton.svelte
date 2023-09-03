<script lang="ts">
	import type { article } from '$lib/types';
	export let profile: article['author'];

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { articleStore, updateAuthor } from '$lib/store/article';
	const update: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.data?.author) {
				updateAuthor(result.data?.author);
			}
		};
	};
</script>

<form
	id="buttons"
	class="nav-link"
	method="POST"
	action="?/{profile.following ? 'unfollow' : 'follow'}&username={profile.username}"
	use:enhance={update}
>
	<button class="btn btn-sm {profile.following ? 'btn-primary' : 'btn-outline-primary'}">
		<i class="ion-heart" />
		&nbsp; {profile.following ? 'UnFollow' : 'Follow'}
		{profile.username}
	</button>
</form>
