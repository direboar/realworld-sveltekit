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
        const username = data.get("username") as string
        const password = data.get("password") as string
        const image = data.get("image") as string
        const email = data.get("email") as string
        const bio = data.get("bio") as string
        if (username && email && image) {
            const response = await updateUser({ username: username, email: email, password: password, image: image, bio: bio, locals: locals })
            if (response.error) {
                return fail(422, { error: response.error })
                // return response
            } else if (response.user) {
                //FIXME :Utilityで共通化
                cookies.set("userinfo", btoa(JSON.stringify(response.user)), { httpOnly: true })
                throw redirect(303, "/")
            } else {
                throw sveltekiterror(500)
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

