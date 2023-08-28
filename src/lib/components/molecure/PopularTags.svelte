
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
    <!-- <a href="" class="tag-pill tag-default">javascript</a>
    <a href="" class="tag-pill tag-default">emberjs</a>
    <a href="" class="tag-pill tag-default">angularjs</a>
    <a href="" class="tag-pill tag-default">react</a>
    <a href="" class="tag-pill tag-default">mean</a>
    <a href="" class="tag-pill tag-default">node</a>
    <a href="" class="tag-pill tag-default">rails</a> -->
    </div>
</div>
