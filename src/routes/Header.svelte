<script lang="ts">
	import { page } from '$app/stores';
	import type { user } from '$lib/types';
	export let user: user | null = null;

	$: active = (path: string) => {
		return $page.url.pathname.startsWith(path);
	};
</script>

<nav class="navbar navbar-light">
	<div class="container">
		<a class="navbar-brand" href="/">conduit</a>
		<ul class="nav navbar-nav pull-xs-right">
			<li class="nav-item">
				<a class="nav-link {$page.url.pathname === '/' ? 'active' : ''}" href="/">Home</a>
			</li>
			{#if user}
				<li class="nav-item">
					<a class="nav-link {active('/editor') ? 'active' : ''}" href="/editor">
						<i class="ion-compose" />&nbsp;New Article
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {active('/settings') ? 'active' : ''}" href="/settings">
						<i class="ion-gear-a" />&nbsp;Settings
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {active('/profile') ? 'active' : ''}" href="/profile/{user.username}">
						<img src={user.image} class="user-pic" />
						{user.username}
					</a>
				</li>
			{:else}
				<li class="nav-item">
					<a class="nav-link {active('/login') ? 'active' : ''}" href="/login">Sign in</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {active('/register') ? 'active' : ''}" href="/register">Sign up</a>
				</li>
			{/if}
		</ul>
	</div>
</nav>
