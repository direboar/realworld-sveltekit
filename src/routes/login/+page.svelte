<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
	let { error } = { ...form };
</script>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign in</h1>
				<p class="text-xs-center">
					<a href="/register">Need an account?</a>
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

				<form id="button" method="POST" action="?/login">
					<fieldset class="form-group">
						<input
							class="form-control form-control-lg"
							type="text"
							name="email"
							placeholder="Email"
						/>
					</fieldset>
					<fieldset class="form-group">
						<input
							class="form-control form-control-lg"
							type="password"
							name="password"
							placeholder="Password"
						/>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
				</form>
			</div>
		</div>
	</div>
</div>
