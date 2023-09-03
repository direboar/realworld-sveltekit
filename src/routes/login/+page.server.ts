import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
import { fail, redirect } from '@sveltejs/kit';

const { POST } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData()
        const email = data.get("email") as string
        const password = data.get("password") as string

        //TODO メールアドレスのバリデーション
        // if (true) {
        //     return fail(400, { email, missing: true });
        // }

        if (email && password) {
            const response = await createUser({ email: email, password: password })
            if (response.error) {
                return fail(422, { error: response.error })
            } else if (response.user) {
                cookies.set("userinfo", btoa(JSON.stringify(response.user)), { httpOnly: true })
                throw redirect(303, "/")
            } else {
                throw sveltekiterror(500)
            }
        } else {
            throw sveltekiterror(400)
        }
    }
} satisfies Actions

const createUser = (async ({ email, password }: { email: string, password: string }) => {
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

