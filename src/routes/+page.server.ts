import type { PageServerLoad, Actions } from './$types';

import * as artcielapi from "$lib/api/article"
import * as tagsapi from "$lib/api/tags"

export const load = (async ({ params, locals }) => {
    let articles = await artcielapi.getArticles({ locals: locals })
    let tags = await tagsapi.getTags(locals)

    return {
        ...articles,
        tags: tags
    }

}) satisfies PageServerLoad

export const actions = {
    displayTag: async ({ request, locals }) => {
        const data = await request.formData()
        const value = data.get("value") as string // 取得対象タグ名
        const page = data.get("page") as string
        const pageNumber = page ? Number(page) : undefined
        let articles = await artcielapi.getArticles({ tag: value, page: pageNumber, locals: locals })
        // console.log(articles)
        return {
            ...articles,
        }
    },
    displayFeed: async ({ request, locals }) => {
        const data = await request.formData()
        const value = data.get("value") as string // 取得対象投稿名（GlobalFeed/YourFeed)
        const page = data.get("page") as string
        const pageNumber = page ? Number(page) : undefined
        if (value === "Global Feed") {
            let articles = await artcielapi.getArticles({ page: pageNumber, locals: locals })
            return {
                ...articles,
            }
        } else if (value === "Your Feed") {
            let articles = await artcielapi.getArticles({ page: pageNumber, author: locals.user.username, locals: locals })
            return {
                ...articles,
            }
        }
    }
} satisfies Actions
