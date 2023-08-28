import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
import ArticleListItem from '$lib/components/molecure/ArticleListItem.svelte';

const { GET } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });

export const load = (async () => {
    let article = await getArticle()
    let tags = await getTags()

    return {
        articles: article,
        tags: tags
    }

}) satisfies PageServerLoad

const getArticle = (async () => {
    const { data, error } = await GET("/articles", {
        params: {
            query: {
                limit: 20,
            }
        },
    })
    if (error) {
        sveltekiterror(500)
    } else {
        return data.articles
    }
})

const getTags = (async () => {
    const { data, error } = await GET("/tags", {
        params: {
        },
    })
    if (error) {
        sveltekiterror(500)
    } else {
        return data.tags
    }
})

