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

<a href="/profile/eric-simons"><img src={profile.image} /></a>
<div class="info">
	<a href="/profile/eric-simons" class="author"
		>{profile.username}
		<span class="date">January 20th</span>
	</a>
</div>
