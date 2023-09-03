<script lang="ts">
	// import Editor from './Editor.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	import type { article } from '$lib/types';

	export let form: ActionData;
	export let article: article = null; //初期表示
	export let edit: boolean = false; //編集画面の場合はタグの更新を不許可にする

	let tag = '';
	let tags: Set<string> = new Set([]);
	if (article) {
		tags = new Set(article.tagList);
	}

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			tags = new Set([...tags, tag]);
			tag = '';
			e.preventDefault();
		}
	};

	const removeTag = (tag: string) => {
		tags.delete(tag);
		tags = new Set([...tags]);
	};
</script>

<!-- use:enhanceでサーバ側で更新したデータを取得するためには、formの値を直接使用する。（local変数に代入してしまうと追跡できなくなる） -->
<div class="editor-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-10 offset-md-1 col-xs-12">
				<ul class="error-messages">
					{#if form?.error}
						{#each Object.keys(form?.error.errors) as key}
							{#each form?.error.errors[key] as message}
								<li>{key} {message}</li>
							{/each}
						{/each}
					{/if}
				</ul>
				<form id="button" method="POST" action="?/postArticle" use:enhance>
					<fieldset>
						<fieldset class="form-group">
							<input
								type="text"
								class="form-control form-control-lg"
								name="title"
								placeholder="Article Title"
								value={article?.title ?? ''}
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								type="text"
								class="form-control"
								name="description"
								placeholder="What's this article about?"
								value={article?.description ?? ''}
							/>
						</fieldset>
						<fieldset class="form-group">
							<textarea
								class="form-control"
								rows="8"
								name="body"
								placeholder="Write your article (in markdown)"
								value={article?.body ?? ''}
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								type="text"
								class="form-control"
								name="tagList"
								placeholder="Enter tags"
								disabled={edit}
								on:keypress={onKeyPress}
								bind:value={tag}
							/>
							<input type="hidden" name="tags" value={[...tags]} />
							<div class="tag-list">
								{#each tags as tag}
									<button
										type="button"
										class="btn-link tag-default tag-pill"
										disabled={edit}
										on:click={() => {
											removeTag(tag);
										}}
									>
										<i class="ion-close-round" />
										{tag}
									</button>
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
