<script lang="ts">
import ArticleListItem from "$lib/components/molecure/ArticleListItem.svelte"
import PopularTags from "$lib/components/molecure/PopularTags.svelte"

import type { PageData } from './$types';
export let data: PageData;

let authenticatd = false
let articles = data.articles
let tags = data.tags
</script>    
<div class="home-page">
  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            {#if authenticatd}
            <li class="nav-item">
              <a class="nav-link" href="">Your Feed</a>
            </li>
            {/if}
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>

        {#each articles as article}
        <ArticleListItem article={article}/>
        {/each}

        <ul class="pagination">
          <li class="page-item active">
            <a class="page-link" href="">1</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="">2</a>
          </li>
        </ul>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <PopularTags {tags}/>
        </div>
      </div>
    </div>
  </div>
</div>