import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";

const { GET } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });

export const load = (async ({ params }) => {
    const slug = params.slug
    // console.log(slug)
    let article = await getArticle({ slug: slug })
    let comments = await getComments({ slug: slug })

    return {
        article: article?.article,
        comments: comments?.comments
    }

}) satisfies PageServerLoad

const getArticle = (async ({ slug }: { slug: string }) => {
    const { data, error } = await GET("/articles/{slug}", {
        params: {
            path: {
                slug: slug
            }
        }
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

const getComments = (async ({ slug }: { slug: string }) => {
    const { data, error } = await GET("/articles/{slug}/comments", {
        params: {
            path: {
                slug: slug
            }
        }
    })
    if (error) {
        sveltekiterror(500)
    } else {
        return {
            comments: data.comments,
        }
    }
})
