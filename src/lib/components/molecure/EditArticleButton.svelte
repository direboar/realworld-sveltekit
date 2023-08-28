<script lang="ts">
import { goto } from '$app/navigation';
</script>

<button class="btn btn-sm btn-outline-secondary" on:click={()=>goto('/editor')}>
  <i class="ion-edit"></i> Edit Article
</button>
