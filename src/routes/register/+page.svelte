<script lang="ts">
	import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let form: ActionData;
	let { user, error } = { ...form };

	// import { enhance } from '$app/forms';

	// import ArticleList from '$lib/components/organisms/ArticleList.svelte';
	// import { isAuthenticated, getPageLimit } from '$lib/utils/utils';

	// const pageLimit = getPageLimit();

	// export let data: PageData;
	// let { articles, articlesCount, profile } = { ...data };

	// let currentTab = 'My Articles'; //Your Feed or tags
	// let currentPage = 1;
	// $: totalPage = articlesCount ? Math.ceil(articlesCount / pageLimit) : 0;

	// let nowLoading = false;
	// let pagenation = false;

	// const updateFormResult: SubmitFunction = () => {
	// 	nowLoading = true;
	// 	return async ({ result, update }) => {
	// 		articles = result.data.articles;
	// 		articlesCount = result.data.articlesCount;
	// 		currentPage = result.data.page;
	// 		nowLoading = false;
	// 	};
	// };
	// const updateFormResultPagenation: SubmitFunction = () => {
	// 	pagenation = true;
	// 	return async ({ result, update }) => {
	// 		articles = result.data.articles;
	// 		articlesCount = result.data.articlesCount;
	// 		currentPage = result.data.page;
	// 		pagenation = false;
	// 	};
	// };
</script>

<!-- {JSON.stringify(error)}
{JSON.stringify(user)}
{JSON.stringify(error?.errors)} -->
<!-- {JSON.stringify(Object.keys(error?.errors))} -->
<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign up</h1>
				<p class="text-xs-center">
					<a href="/login">Have an account?</a>
				</p>

				<ul class="error-messages">
					{#if error}
						{#each Object.keys(error.errors) as key}
							{#each error.errors[key] as message}
								<li>{key} {message}</li>
							{/each}
						{/each}
					{/if}
				</ul>

				<form id="button" method="POST" action="?/createUser">
					<fieldset class="form-group">
						<input
							class="form-control form-control-lg"
							type="text"
							name="username"
							placeholder="Username"
							required
						/>
					</fieldset>
					<fieldset class="form-group">
						<input
							class="form-control form-control-lg"
							type="text"
							name="email"
							placeholder="Email"
							required
						/>
					</fieldset>
					<fieldset class="form-group">
						<input
							class="form-control form-control-lg"
							type="password"
							name="password"
							placeholder="Password"
							required
						/>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
				</form>
			</div>
		</div>
	</div>
</div>
