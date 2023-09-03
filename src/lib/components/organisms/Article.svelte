<script lang="ts">
	import type { article } from '$lib/types';
	export let article: article;
</script>

<div class="row article-content">
	<div class="col-md-12">
		<p>{article.body}</p>
		<ul class="tag-list">
			{#each article.tagList as tag}
				<li class="tag-default tag-pill tag-outline">{tag}</li>
			{/each}
		</ul>
	</div>
</div>
