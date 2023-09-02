import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";

import { getPageLimit } from '$lib/utils/utils';

const { GET } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });
const pageLimit = getPageLimit()

export const load = (async ({ params }) => {
    const username = params.username
    let profile = await getProfile({ username: username })
    let articles = await getArticles({ author: username })

    return {
        ...articles,
        ...profile
    }

}) satisfies PageServerLoad

const getArticles = (async ({ page, author, favoritedUsername }: { page?: number, author?: string, favoritedUsername?: string }) => {
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

const getProfile = (async ({ username }: { username: string }) => {
    const { data, error } = await GET("/profiles/{username}", {
        params: {
            path: {
                username: username
            }
        },
    })
    if (error) {
        sveltekiterror(500)
    } else {
        return {
            profile: data.profile
        }
    }
})

export const actions = {
    displayFeed: async ({ params, request }) => {
        const data = await request.formData()
        const username = params.username

        const value = data.get("value")?.toString()
        const page = data.get("page")?.toString()
        const pageNumber = page ? Number(page) : undefined
        if (value === "My Articles") {
            let articles = await getArticles({ page: pageNumber, author: username })
            // console.log(articles)
            return {
                ...articles,
            }
        } else {
            let articles = await getArticles({ page: pageNumber, favoritedUsername: username })
            // console.log(articles)
            return {
                ...articles,
            }
        }
    }
} satisfies Actions
