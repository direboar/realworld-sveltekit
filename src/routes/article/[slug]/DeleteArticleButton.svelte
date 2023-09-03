<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	const update: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.status === 204) {
				//204 : no content
				goto('/');
			}
		};
	};
</script>

<form id="buttons" class="nav-link" method="POST" action="?/deleteArticle" use:enhance={update}>
	<button class="btn btn-sm btn-outline-danger" type="submit">
		<i class="ion-trash-a" /> Delete Article
	</button>
</form>
