import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";

import { getPageLimit, createHeadersOptions } from '$lib/utils/utils';

const { GET } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });
const pageLimit = getPageLimit()

export const load = (async ({ params, locals }) => {
    const username = params.username
    let profile = await getProfile({ username: username, locals: locals })
    let articles = await getArticles({ author: username, locals: locals })

    return {
        ...articles,
        ...profile
    }

}) satisfies PageServerLoad


export const actions = {
    displayFeed: async ({ params, request, locals }) => {
        const data = await request.formData()
        const username = params.username

        const value = data.get("value")?.toString()
        const page = data.get("page")?.toString()
        const pageNumber = page ? Number(page) : undefined
        if (value === "My Articles") {
            let articles = await getArticles({ page: pageNumber, author: username, locals: locals })
            // console.log(articles)
            return {
                ...articles,
            }
        } else {
            let articles = await getArticles({ page: pageNumber, favoritedUsername: username, locals: locals })
            // console.log(articles)
            return {
                ...articles,
            }
        }
    }
} satisfies Actions

const getArticles = (async ({ page, author, favoritedUsername, locals }: { page?: number, author?: string, favoritedUsername?: string, locals: App.Locals }) => {
    if (!page) page = 1
    const { data, error } = await GET("/articles", {
        params: {
            query: {
                limit: pageLimit,
                author: author,
                favorited: favoritedUsername,
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

const getProfile = (async ({ username, locals }: { username: string, locals: App.Locals }) => {
    const { data, error } = await GET("/profiles/{username}", {
        params: {
            path: {
                username: username
            }
        },
        headers: createHeadersOptions(locals)
    })
    if (error) {
        sveltekiterror(500)
    } else {
        return {
            profile: data.profile
        }
    }
})
