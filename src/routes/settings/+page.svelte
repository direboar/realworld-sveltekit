<script lang="ts">
	import type { PageData, ActionData } from './$types';
	export let data: PageData;

	export let form: ActionData;
	let { error } = { ...form };
</script>

<div class="settings-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Your Settings</h1>

				<!-- FIXME サーバのエラーメッセージがいまいち。。。-->
				<ul class="error-messages">
					{#if error}
						<li>{error}</li>
					{/if}
				</ul>

				<form id="update" method="POST" action="?/update">
					<fieldset>
						<fieldset class="form-group">
							<input
								class="form-control"
								type="text"
								name="image"
								required
								value={data.user?.image}
								placeholder="URL of profile picture"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="text"
								name="username"
								required
								value={data.user?.username}
								placeholder="Your Name"
							/>
						</fieldset>
						<fieldset class="form-group">
							<textarea
								class="form-control form-control-lg"
								rows="8"
								name="bio"
								value={data.user?.bio}
								placeholder="Short bio about you"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								name="email"
								required
								value={data.user?.email}
								type="text"
								placeholder="Email"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								name="password"
								type="password"
								placeholder="New Password"
							/>
						</fieldset>
						<button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
					</fieldset>
				</form>
				<hr />
				<form id="button" method="POST" action="?/logout">
					<button class="btn btn-outline-danger">Or click here to logout.</button>
				</form>
			</div>
		</div>
	</div>
</div>
