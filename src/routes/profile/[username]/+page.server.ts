import type { PageServerLoad, Actions } from './$types';
import { error as sveltekiterror } from '@sveltejs/kit';

import * as profilesapi from "$lib/api/profiles"
import * as articleapi from "$lib/api/article"

export const load = (async ({ params, locals }) => {
    const username = params.username
    let profile = await profilesapi.getProfile({ username: username, locals: locals })
    let articles = await articleapi.getArticles({ author: username, locals: locals })

    return {
        ...articles,
        ...profile
    }

}) satisfies PageServerLoad


export const actions = {
    //FIXME rootと同一の処理なので共通化したい。
    displayFeed: async ({ params, request, locals }) => {
        const data = await request.formData()
        const username = params.username

        const value = data.get("value")?.toString()
        const page = data.get("page")?.toString()
        const pageNumber = page ? Number(page) : undefined
        if (value === "My Articles") {
            let articles = await articleapi.getArticles({ page: pageNumber, author: username, locals: locals })
            // console.log(articles)
            return {
                ...articles,
            }
        } else {
            let articles = await articleapi.getArticles({ page: pageNumber, favoritedUsername: username, locals: locals })
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
            response = await profilesapi.unfollow({ username: username, locals: locals })
        } else {
            response = await profilesapi.follow({ username: username, locals: locals })
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

