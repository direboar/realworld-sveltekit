<script lang="ts">
	export let authenticated = false;
</script>

<nav class="navbar navbar-light">
	<div class="container">
		<a class="navbar-brand" href="/">conduit</a>
		<ul class="nav navbar-nav pull-xs-right">
			{#if authenticated}
				<li class="nav-item">
					<!-- Add "active" class when you're on that page" -->
					<a class="nav-link active" href="/">Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/editor"> <i class="ion-compose" />&nbsp;New Article </a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/settings"> <i class="ion-gear-a" />&nbsp;Settings </a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/profile/eric-simons">
						<img src="" class="user-pic" />
						Eric Simons
					</a>
				</li>
			{:else}
				<li class="nav-item">
					<!-- Add "active" class when you're on that page" -->
					<a class="nav-link active" href="/">Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/login">Sign in</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/register">Sign up</a>
				</li>
			{/if}
		</ul>
	</div>
</nav>
