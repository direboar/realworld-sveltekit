import { error as sveltekiterror } from '@sveltejs/kit';
import type { Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';

import * as userapi from "$lib/api/user"

export const actions = {
    createUser: async ({ request, cookies }) => {
        const data = await request.formData()
        console.log(data)
        const username = data.get("username") as string
        const email = data.get("email") as string
        const password = data.get("password") as string

        //TODO メールアドレスのバリデーション
        // if (true) {
        //     return fail(400, { email, missing: true });
        // }

        if (username && email && password) {
            const response = await userapi.createUser({ username: username, email: email, password: password })
            if (response.error) {
                return fail(422, {
                    error: response.error,
                    username: username,
                    email: email,
                    password: password,
                })
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

