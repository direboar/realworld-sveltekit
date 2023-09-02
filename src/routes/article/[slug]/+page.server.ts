import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";

import { createHeadersOptions } from "$lib/utils/utils"

const { GET } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });

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
