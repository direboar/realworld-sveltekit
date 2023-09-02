<script lang="ts">
	// import Editor from './Editor.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
	let { error, article } = { ...form };

	let tag = '';
	let tags: Set<string> = new Set([]);
	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			tags = new Set([...tags, tag]);
			e.preventDefault();
		}
	};
</script>

<div class="editor-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-10 offset-md-1 col-xs-12">
				<ul class="error-messages">
					{#if error}
						{#each Object.keys(error.errors) as key}
							{#each error.errors[key] as message}
								<li>{key} {message}</li>
							{/each}
						{/each}
					{/if}
				</ul>

				<form id="button" method="POST" action="?/postArticle">
					<fieldset>
						<fieldset class="form-group">
							<input
								type="text"
								class="form-control form-control-lg"
								name="title"
								placeholder="Article Title"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								type="text"
								class="form-control"
								name="description"
								placeholder="What's this article about?"
							/>
						</fieldset>
						<fieldset class="form-group">
							<textarea
								class="form-control"
								rows="8"
								name="body"
								placeholder="Write your article (in markdown)"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								type="text"
								class="form-control"
								name="tagList"
								placeholder="Enter tags"
								on:keypress={onKeyPress}
								bind:value={tag}
							/>
							<input type="hidden" name="tags" value={[...tags]} />
							<div class="tag-list">
								{#each tags as tag}
									<span class="tag-default tag-pill">
										<i class="ion-close-round" />
										{tag}
									</span>
								{/each}
							</div>
						</fieldset>
						<button class="btn btn-lg pull-xs-right btn-primary"> Publish Article </button>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>
