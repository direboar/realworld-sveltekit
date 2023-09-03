<script lang="ts">
	import type { article } from '$lib/types';
	import { formatDate } from '$lib/utils/utils';

	export let profile: article['author'];
	export let createdAt: string;
</script>

<a href="/profile/{profile.username}"><img src={profile.image} /></a>
<div class="info">
	<a href="/profile/{profile.username}" class="author"
		>{profile.username}
		<span class="date">{formatDate(createdAt)}</span>
	</a>
</div>
