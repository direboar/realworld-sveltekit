import { error as sveltekiterror, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';
import * as articleapi from "$lib/api/article"

export const load = (async ({ params, locals }) => {
    const slug = params.slug
    // console.log(slug)
    let article = await articleapi.getArticle({ slug: slug, locals: locals })
    let comments = await articleapi.getComments({ slug: slug, locals: locals })

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
            const response = await articleapi.postComment({ slug: slug, comment: comment, locals: locals })
            if (response.error) {
                return response
            } else if (response.comment) {
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

        const response = await articleapi.deleteArticle({ slug: slug, locals: locals })
        // throw redirect(303, `/`)
    },

    //いいね、FollowはAPIで実装したほうが良いかも？？
    toggleFavolite: async ({ request, params, locals }) => {
        const slug = params.slug
        //FIXME バリデーション
        const data = await request.formData()
        const favorited = data.get("favorited") as string
        console.log(slug)
        console.log(favorited)

        let response = null
        if (favorited === "true") {
            response = await articleapi.deleteFavolite({ slug: slug, locals: locals })
        } else {
            response = await articleapi.addFavolite({ slug: slug, locals: locals })
        }
        if (response.error) {
            return response
        } else if (response.article) {
            return response
        } else {
            throw sveltekiterror(500)
        }
    },

} satisfies Actions

