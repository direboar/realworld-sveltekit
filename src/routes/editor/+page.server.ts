import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
import { fail, redirect } from '@sveltejs/kit';

const { POST } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });
import { createHeadersOptions } from '$lib/utils/utils';

// export const load = (async ({ params }) => {
//     let articles = await getArticles({})
//     let tags = await getTags()

//     return {
//         ...articles,
//         tags: tags
//     }

// }) satisfies PageServerLoad

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
            const response = await createArticle({ title: title, description: description, body: body, tagList: tagList, locals: locals })
            console.log(JSON.stringify(response))
            if (response.error) {
                return response
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

const createArticle = (async ({ title, description, body, tagList, locals }: { title: string, description: string, body: string, tagList?: string[], locals: App.Locals }) => {
    const { data, error } = await POST("/articles", {
        body: {
            article: {
                title: title,
                description: description,
                body: body,
                tagList: tagList
            }
        },
        headers: createHeadersOptions(locals)
    })
    return {
        article: data?.article,
        error: error
    }
})

