<script lang="ts">
	import type { components } from '$lib/api/apitypes';
	export let profile: components['schemas']['Profile'] = {
		//test data.
		username: 'Eric Simons',
		bio: 'xxx',
		following: false,
		image: 'https://api.realworld.io/images/demo-avatar.png'
	};
</script>

<button
	class="btn btn-sm {profile.following ? 'btn-primary' : 'btn-outline-primary'}"
	formaction="?/{profile.following ? 'unfollow' : 'follow'}&username={profile.username}"
>
	<i class="ion-heart" />
	&nbsp; {profile.following ? 'UnFollow' : 'Follow'}
	{profile.username}
</button>
