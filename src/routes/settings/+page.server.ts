import { fail, redirect } from '@sveltejs/kit';
import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions, ActionData } from './$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
import { createHeadersOptions } from '$lib/utils/utils';

const { GET, PUT } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });

export const load = (async ({ locals }) => {
    let user = await getUser(locals)
    return {
        user: user.user
    }

}) satisfies PageServerLoad


export const actions = {
    update: async ({ request, cookies, locals }) => {
        const data = await request.formData()
        console.log(data)
        const username = data.get("username")?.toString()
        const password = data.get("password")?.toString()
        const image = data.get("image")?.toString()
        const email = data.get("email")?.toString()
        const bio = data.get("bio")?.toString()
        if (username && email && image) {
            const response = await updateUser({ username: username, email: email, password: password, image: image, bio: bio, locals: locals })
            if (response.error) {
                return response
            } else if (response.user) {
                //FIXME :Utilityで共通化
                cookies.set("userinfo", btoa(JSON.stringify(response.user)), { httpOnly: true })
                throw redirect(303, "/")
            } else {

            }
        } else {
            throw sveltekiterror(400)
        }

        throw redirect(303, "/profile/username")
    },

    logout: async ({ cookies }) => {
        cookies.delete("userinfo")
        throw redirect(303, "/")
    }
} satisfies Actions

const getUser = (async (locals: App.Locals) => {
    const { data, error } = await GET("/user", {
        headers: createHeadersOptions(locals)
    })
    return {
        user: data?.user,
        error: error
    }
})

//FIXME userは型を導入する。
const updateUser = (async ({ username, password, image, email, bio, locals }: { username: string, password?: string, image: string, email: string, bio?: string, locals: App.Locals }) => {
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

