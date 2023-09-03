import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';

import * as articleapi from "$lib/api/article"

export const load = (async ({ params, locals }) => {
    let slug = params.slug
    let article = await articleapi.getArticle({ slug: slug, locals: locals })

    return {
        article: article?.article
    }
}) satisfies PageServerLoad

export const actions = {
    postArticle: async ({ params, request, locals }) => {
        const slug = params.slug
        const data = await request.formData()
        const title = data.get("title") as string
        const description = data.get("description") as string
        const body = data.get("body") as string

        //FIXME バリデーション

        if (title && description && body) {
            const response = await articleapi.updateArticle({ slug: slug, title: title, description: description, body: body, locals: locals })
            // console.log(JSON.stringify(response))
            if (response.error) {
                return fail(422, {
                    error: response.error
                })
            } else if (response.article) {
                throw redirect(303, `/article/${response.article.slug}`)
                // throw redirect(303, `/profile/${locals.user.username}`)
            } else {
                throw sveltekiterror(500)
            }
        } else {
            throw sveltekiterror(400)
        }
    }
} satisfies Actions

