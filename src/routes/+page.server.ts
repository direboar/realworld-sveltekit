import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
import { getPageLimit, createHeadersOptions } from '$lib/utils/utils';

const pageLimit = getPageLimit()
const { GET } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });

export const load = (async ({ params }) => {
    let articles = await getArticles({})
    let tags = await getTags({})

    return {
        ...articles,
        tags: tags
    }

}) satisfies PageServerLoad

export const actions = {
    displayTag: async ({ request, locals }) => {
        const data = await request.formData()
        const value = data.get("value")?.toString()
        const page = data.get("page")?.toString()
        const pageNumber = page ? Number(page) : undefined
        let articles = await getArticles({ tag: value, page: pageNumber })
        // console.log(articles)
        return {
            ...articles,
        }
    },
    displayFeed: async ({ request, locals }) => {
        console.log(locals)
        const data = await request.formData()
        const value = data.get("value")?.toString()
        const page = data.get("page")?.toString()
        const pageNumber = page ? Number(page) : undefined
        if (value === "Global Feed") {
            let articles = await getArticles({ page: pageNumber })
            return {
                ...articles,
            }
        } else {
            return {
                articles: [],
                articlesCount: 0,
                page: 1,
            }
        }
    }
} satisfies Actions

const getArticles = (async ({ page, tag }: { page?: number, tag?: string }) => {
    if (!page) page = 1
    const { data, error } = await GET("/articles", {
        params: {
            query: {
                limit: pageLimit,
                tag: tag,
                offset: !page ? undefined : (page - 1) * pageLimit
            }
        },
    })
    if (error) {
        sveltekiterror(500)
    } else {
        return {
            articles: data.articles,
            articlesCount: data.articlesCount,
            page: page
        }
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

