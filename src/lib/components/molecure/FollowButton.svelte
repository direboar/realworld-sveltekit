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

<button class="btn btn-sm btn-outline-secondary">
	<i class="ion-plus-round" />
	&nbsp; Follow {profile.username}
</button>
<!-- <button class="btn btn-sm btn-outline-secondary">
  <i class="ion-plus-round"></i>
  &nbsp; Follow Eric Simons {#if counter !==null }<span class="counter">({counter})</span>{/if}
</button> -->
