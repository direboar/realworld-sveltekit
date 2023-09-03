import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
const { GET, POST, DELETE, PUT } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });
import { createHeadersOptions, getPageLimit } from '$lib/utils/utils';
import { error as sveltekiterror } from '@sveltejs/kit';

const pageLimit = getPageLimit()

export const getUser = (async (locals: App.Locals) => {
    const { data, error } = await GET("/user", {
        headers: createHeadersOptions(locals)
    })
    return {
        user: data?.user,
        error: error
    }
})
//FIXME userは型を導入する。
export const updateUser = (async ({ username, password, image, email, bio, locals }: { username: string, password?: string, image: string, email: string, bio?: string, locals: App.Locals }) => {
    const { data, error } = await PUT("/user", {
        body: {
            user: {
                username: username,
                password: password,
                image: image,
                email: email,
                bio: bio,
            }
        },
        headers: createHeadersOptions(locals)
    })
    return {
        user: data?.user,
        error: error
    }
})
export const createUser = (async ({ username, email, password }: { username: string, email: string, password: string }) => {
    const { data, error } = await POST("/users", {
        body: {
            user: {
                username: username,
                password: password,
                email: email
            }
        }
    })
    return {
        user: data?.user,
        error: error
    }
})

export const login = (async ({ email, password }: { email: string, password: string }) => {
    const { data, error } = await POST("/users/login", {
        body: {
            user: {
                email: email,
                password: password
            }
        }
    })
    return {
        user: data?.user,
        error: error
    }
})

