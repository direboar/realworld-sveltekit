<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign up</h1>
				<p class="text-xs-center">
					<a href="/login">Have an account?</a>
				</p>

				<ul class="error-messages">
					{#if form?.error}
						{#each Object.keys(form?.error.errors) as key}
							{#each form?.error.errors[key] as message}
								<li>{key} {message}</li>
							{/each}
						{/each}
					{/if}
				</ul>

				<form id="button" method="POST" action="?/createUser" use:enhance>
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
