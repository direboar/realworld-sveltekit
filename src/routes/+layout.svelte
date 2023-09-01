<script lang="ts">
	import Header from '$lib/components/organisms/Header.svelte';
	import Footer from '$lib/components/organisms/Footer.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<meta charset="utf-8" />
	<title>Conduit</title>
	<!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
	<link
		href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
		rel="stylesheet"
		type="text/css"
	/>
	<link
		href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
		rel="stylesheet"
		type="text/css"
	/>
	<!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
	<link rel="stylesheet" href="//demo.productionready.io/main.css" />
</svelte:head>

<Header authenticated={!!data.user} username={data.user?.username} />
<slot />
<Footer />
