import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
import { getPageLimit, createHeadersOptions } from '$lib/utils/utils';

const pageLimit = getPageLimit()
const { GET } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });

export const load = (async ({ params, locals }) => {
    let articles = await getArticles({ locals: locals })
    let tags = await getTags(locals)

    return {
        ...articles,
        tags: tags
    }

}) satisfies PageServerLoad

export const actions = {
    displayTag: async ({ request, locals }) => {
        const data = await request.formData()
        const value = data.get("value") as string
        const page = data.get("page") as string
        const pageNumber = page ? Number(page) : undefined
        let articles = await getArticles({ tag: value, page: pageNumber, locals: locals })
        // console.log(articles)
        return {
            ...articles,
        }
    },
    displayFeed: async ({ request, locals }) => {
        console.log(locals)
        const data = await request.formData()
        const value = data.get("value") as string
        const page = data.get("page") as string
        const pageNumber = page ? Number(page) : undefined
        if (value === "Global Feed") {
            let articles = await getArticles({ page: pageNumber, locals: locals })
            return {
                ...articles,
            }
        } else {
            let articles = await getArticles({ page: pageNumber, author: locals.user.username, locals: locals })
            return {
                ...articles,
            }
        }
    }
} satisfies Actions

const getArticles = (async ({ page, tag, author, locals }: { page?: number, tag?: string, author?: string, locals: App.Locals }) => {
    if (!page) page = 1
    const { data, error } = await GET("/articles", {
        params: {
            query: {
                limit: pageLimit,
                tag: tag,
                author: author,
                offset: !page ? undefined : (page - 1) * pageLimit
            }
        },
        headers: createHeadersOptions(locals)
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

const getTags = (async (locals: App.Locals) => {
    const { data, error } = await GET("/tags", {
        params: {
        },
        headers: createHeadersOptions(locals)
    })
    if (error) {
        sveltekiterror(500)
    } else {
        return data.tags
    }
})

