import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
import { fail, redirect } from '@sveltejs/kit';

const { GET, PUT } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });
import { createHeadersOptions } from '$lib/utils/utils';

export const load = (async ({ params, locals }) => {
    let slug = params.slug
    let article = await getArticle({ slug: slug, locals: locals })

    return {
        article: article?.article
    }
}) satisfies PageServerLoad

const getArticle = (async ({ slug, locals }: { slug: string, locals: App.Locals }) => {
    const { data, error } = await GET("/articles/{slug}", {
        params: {
            path: {
                slug: slug
            }
        },
        headers: createHeadersOptions(locals)
    })
    if (error) {
        sveltekiterror(500)
    } else {
        return {
            article: data.article,
        }
    }
})

export const actions = {
    postArticle: async ({ params, request, locals }) => {
        const slug = params.slug
        const data = await request.formData()
        const title = data.get("title") as string
        const description = data.get("description") as string
        const body = data.get("body") as string

        //FIXME バリデーション

        if (title && description && body) {
            const response = await updateArticle({ slug: slug, title: title, description: description, body: body, locals: locals })
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

const updateArticle = (async ({ slug, title, description, body, locals }: { slug: string, title: string, description: string, body: string, locals: App.Locals }) => {
    const { data, error } = await PUT("/articles/{slug}", {
        params: {
            path: {
                slug: slug
            }
        },
        body: {
            article: {
                title: title,
                description: description,
                body: body,
            }
        },
        headers: createHeadersOptions(locals)
    })
    return {
        article: data?.article,
        error: error
    }
})

