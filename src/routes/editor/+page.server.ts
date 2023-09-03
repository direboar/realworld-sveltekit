import { error as sveltekiterror } from '@sveltejs/kit';
import type { Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';

import * as articleapi from "$lib/api/article"

export const actions = {
    postArticle: async ({ request, cookies, locals }) => {
        const data = await request.formData()
        const title = data.get("title") as string
        const description = data.get("description") as string
        const body = data.get("body") as string
        const tags = data.get("tags") as string

        let tagList = tags.split(",")

        //FIXME バリデーション

        if (title && description && body) {
            const response = await articleapi.createArticle({ title: title, description: description, body: body, tagList: tagList, locals: locals })
            if (response.error) {
                return fail(422, {
                    error: response.error
                })
            } else if (response.article) {
                throw redirect(303, `/article/${response.article.slug}`)
            } else {
                throw sveltekiterror(500)
            }
        } else {
            throw sveltekiterror(400)
        }
    }
} satisfies Actions

