import { error as sveltekiterror, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";

import { createHeadersOptions } from "$lib/utils/utils"

const { GET, POST, DELETE } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });

export const load = (async ({ params, locals }) => {
    const slug = params.slug
    // console.log(slug)
    let article = await getArticle({ slug: slug, locals: locals })
    let comments = await getComments({ slug: slug, locals: locals })

    return {
        article: article?.article,
        comments: comments?.comments
    }

}) satisfies PageServerLoad

export const actions = {
    postComment: async ({ params, request, locals }) => {
        const data = await request.formData()
        const slug = params.slug
        const comment = data.get("comment") as string

        //FIXME バリデーション

        if (comment) {
            const response = await postComment({ slug: slug, comment: comment, locals: locals })
            console.log(JSON.stringify(response))
            if (response.error) {
                return response
            } else if (response.article) {
                return response
                // throw redirect(303, `/profile/${locals.user.username}`)
            } else {
                throw sveltekiterror(500)
            }
        } else {
            throw sveltekiterror(400)
        }
    },
    deleteArticle: async ({ params, locals }) => {
        const slug = params.slug
        //FIXME バリデーション

        const response = await deleteArticle({ slug: slug, locals: locals })
        throw redirect(303, `/`)
    }
} satisfies Actions

const getArticle = (async ({ slug, locals }: { slug: string, locals: App.Locals }) => {
    const { data, error } = await GET("/articles/{slug}", {
        params: {
            path: {
                slug: slug
            }
        },
        headers: createHeadersOptions(locals)
    })
    // console.log(data)
    // console.log(error)
    if (error) {
        sveltekiterror(500)
    } else {
        return {
            article: data.article,
        }
    }
})

const getComments = (async ({ slug, locals }: { slug: string, locals: App.Locals }) => {
    const { data, error } = await GET("/articles/{slug}/comments", {
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
            comments: data.comments,
        }
    }
})

const postComment = (async ({ slug, comment, locals }: { slug: string, comment: string, locals: App.Locals }) => {
    const { data, error } = await POST("/articles/{slug}/comments", {
        params: {
            path: {
                slug: slug
            }
        },
        body: {
            comment: {
                body: comment
            }
        },
        headers: createHeadersOptions(locals)
    })
    return {
        article: data?.comment,
        error: error
    }
})

const deleteArticle = (async ({ slug, locals }: { slug: string, locals: App.Locals }) => {
    const { data, error } = await DELETE("/articles/{slug}", {
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
        return
    }
})
