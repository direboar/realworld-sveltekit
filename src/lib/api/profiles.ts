import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
const { GET, POST, DELETE } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });
import { createHeadersOptions, getPageLimit } from '$lib/utils/utils';
import { error as sveltekiterror } from '@sveltejs/kit';

export const getProfile = (async ({ username, locals }: { username: string, locals: App.Locals }) => {
    const { data, error } = await GET("/profiles/{username}", {
        params: {
            path: {
                username: username
            }
        },
        headers: createHeadersOptions(locals)
    })
    if (error) {
        //errorの発生は通常あり得ないので、500扱いとする
        sveltekiterror(500)
    } else {
        return {
            profile: data.profile
        }
    }
})
export const follow = (async ({ username, locals }: { username: string, locals: App.Locals }) => {
    const { data, error } = await POST("/profiles/{username}/follow", {
        params: {
            path: {
                username: username
            }
        },
        headers: createHeadersOptions(locals)
    })
    return {
        author: data?.profile,
        error: error
    }
})

export const unfollow = (async ({ username, locals }: { username: string, locals: App.Locals }) => {
    const { data, error } = await DELETE("/profiles/{username}/follow", {
        params: {
            path: {
                username: username
            }
        },
        headers: createHeadersOptions(locals)
    })
    return {
        author: data?.profile,
        error: error
    }
})