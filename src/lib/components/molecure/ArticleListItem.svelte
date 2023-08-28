
<script lang="ts">
    import type {components} from "$lib/api/apitypes"
    export let article : components["schemas"]["Article"] = {
        //test data.
        author : {
            username : "Eric Simons",
            bio : "",
            following : false,
            image : "https://api.realworld.io/images/demo-avatar.png"
        },
        createdAt : "January 20th",
        favoritesCount : 29,
        tagList : ["realworld","implementations"],
        title : "Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!",
        description : "Assumenda molestiae laboriosam enim ipsum quaerat enim officia vel quo. Earum odit rem natus totam atque cumque. Sint dolorem facere non."
    }
</script>

<div class="article-preview">
    <div class="article-meta">
    <a href="/profile/eric-simons"><img src="{article.author.image}" /></a>
    <div class="info">
        <a href="/profile/eric-simons" class="author">{article.author.username}</a>
        <span class="date">{article.createdAt}</span>
    </div>
    <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {article.favoritesCount}
    </button>
    </div>
    <a href="/article/how-to-build-webapps-that-scale" class="preview-link">
    <h1>{article.title}</h1>
    <p>{article.description}</p>
    <span>Read more...</span>
    <ul class="tag-list">
        {#each article.tagList as tag}
        <li class="tag-default tag-pill tag-outline">{tag}</li>
        {/each}
    </ul>
    </a>
</div>
