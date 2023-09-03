import type { PageServerLoad, Actions } from '../$types';
import { error as sveltekiterror } from '@sveltejs/kit';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";

import { getPageLimit, createHeadersOptions } from '$lib/utils/utils';

const { GET, POST, DELETE } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });
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
    },
    //いいね、FollowはAPIで実装したほうが良いかも？？
    toggleFollowing: async ({ request, params, locals }) => {
        const slug = params.slug
        //FIXME バリデーション
        const data = await request.formData()
        const username = data.get("username") as string
        const following = data.get("following") as string

        let response = null
        if (following === "true") {
            response = await unfollow({ username: username, locals: locals })
        } else {
            response = await follow({ username: username, locals: locals })
        }
        if (response.error) {
            return response
        } else if (response.author) {
            return response
        } else {
            throw sveltekiterror(500)
        }
    },
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
const follow = (async ({ username, locals }: { username: string, locals: App.Locals }) => {
    const { data, error } = await POST("/profiles/{username}/follow", {
        params: {
            path: {
                username: username
            }
        },
        headers: createHeadersOptions(locals)
    })
    return {
        author: data?.profile,
        error: error
    }
})

const unfollow = (async ({ username, locals }: { username: string, locals: App.Locals }) => {
    const { data, error } = await DELETE("/profiles/{username}/follow", {
        params: {
            path: {
                username: username
            }
        },
        headers: createHeadersOptions(locals)
    })
    return {
        author: data?.profile,
        error: error
    }
})