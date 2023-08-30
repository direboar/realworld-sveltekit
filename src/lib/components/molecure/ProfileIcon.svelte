<script lang="ts">
	import type { components } from '$lib/api/apitypes';
	import { formatDate } from '$lib/utils/utils';
	export let profile: components['schemas']['Profile'] = {
		//test data.
		username: 'Eric Simons',
		bio: 'xxx',
		following: false,
		image: 'https://api.realworld.io/images/demo-avatar.png'
	};
	export let createdAt: string = 'xxx';
</script>

<a href="/profile/eric-simons"><img src={profile.image} /></a>
<div class="info">
	<a href="/profile/{profile.username}" class="author"
		>{profile.username}
		<span class="date">{formatDate(createdAt)}</span>
	</a>
</div>
