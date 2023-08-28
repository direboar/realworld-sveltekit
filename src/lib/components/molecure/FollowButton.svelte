<script lang="ts">
  export let counter:string|null = null
</script>

<button class="btn btn-sm btn-outline-secondary">
  <i class="ion-plus-round"></i>
  &nbsp; Follow Eric Simons {#if counter !==null }<span class="counter">({counter})</span>{/if}
</button>
