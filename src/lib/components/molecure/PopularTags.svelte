
<script lang="ts">
    import type {components} from "$lib/api/apitypes"
    //testdata
    export let tags : string[] = ["programming","javascript"]
</script>

<div class="sidebar">
    <p>Popular Tags</p>

    <div class="tag-list">
    {#each tags as tag}
    <a href="" class="tag-pill tag-default">{tag}</a>
    {/each}
    </div>
</div>
