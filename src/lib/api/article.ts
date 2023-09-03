import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
const { GET, POST, DELETE, PUT } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });
import { createHeadersOptions, getPageLimit } from '$lib/utils/utils';
import { error as sveltekiterror } from '@sveltejs/kit';

const pageLimit = getPageLimit()

export const getArticles = (async ({ page, author, favoritedUsername, locals }: { page?: number, author?: string, favoritedUsername?: string, locals: App.Locals }) => {
    if (!page) page = 1
    const { data, error } = await GET("/articles", {
        params: {
            query: {
                limit: pageLimit,
                author: author,
                favorited: favoritedUsername,
                offset: !page ? undefined : (page - 1) * pageLimit
            }
        },
        headers: createHeadersOptions(locals)
    })
    if (error) {
        sveltekiterror(500)
    } else {
        return {
            articles: data.articles,
            articlesCount: data.articlesCount,
            page: page
        }
    }
})

export const getArticle = (async ({ slug, locals }: { slug: string, locals: App.Locals }) => {
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


export const createArticle = (async ({ title, description, body, tagList, locals }: { title: string, description: string, body: string, tagList?: string[], locals: App.Locals }) => {
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

export const updateArticle = (async ({ slug, title, description, body, locals }: { slug: string, title: string, description: string, body: string, locals: App.Locals }) => {
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

export const getComments = (async ({ slug, locals }: { slug: string, locals: App.Locals }) => {
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

export const postComment = (async ({ slug, comment, locals }: { slug: string, comment: string, locals: App.Locals }) => {
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
        comment: data?.comment,
        error: error
    }
})

export const deleteArticle = (async ({ slug, locals }: { slug: string, locals: App.Locals }) => {
    const { error } = await DELETE("/articles/{slug}", {
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

export const addFavolite = (async ({ slug, locals }: { slug: string, locals: App.Locals }) => {
    const { data, error } = await POST("/articles/{slug}/favorite", {
        params: {
            path: {
                slug: slug
            }
        },
        headers: createHeadersOptions(locals)
    })
    return {
        article: data?.article,
        error: error
    }
})

export const deleteFavolite = (async ({ slug, locals }: { slug: string, locals: App.Locals }) => {
    const { data, error } = await DELETE("/articles/{slug}/favorite", {
        params: {
            path: {
                slug: slug
            }
        },
        headers: createHeadersOptions(locals)
    })
    return {
        article: data?.article,
        error: error
    }
})

