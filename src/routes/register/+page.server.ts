import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
import { fail, redirect } from '@sveltejs/kit';

const { POST } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });

// export const load = (async ({ params }) => {
//     let articles = await getArticles({})
//     let tags = await getTags()

//     return {
//         ...articles,
//         tags: tags
//     }

// }) satisfies PageServerLoad

export const actions = {
    createUser: async ({ request, cookies }) => {
        const data = await request.formData()
        console.log(data)
        const username = data.get("username")?.toString()
        const email = data.get("email")?.toString()
        const password = data.get("password")?.toString()

        //TODO メールアドレスのバリデーション
        // if (true) {
        //     return fail(400, { email, missing: true });
        // }

        if (username && email && password) {
            const response = await createUser({ username: username, email: email, password: password })
            if (response.error) {
                return response
            } else if (response.user) {
                console.log("redirect")
                cookies.set("token", response.user.token, { httpOnly: true })
                throw redirect(303, "/")
            } else {

            }
        } else {
            throw sveltekiterror(400)
        }
    }
} satisfies Actions

const createUser = (async ({ username, email, password }: { username: string, email: string, password: string }) => {
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
    // if (error) {
    //     return { user: data.user }
    // } else {
    //     console.log("data:" + JSON.stringify(data))
    //     return { user: data.user }
    // }
})

