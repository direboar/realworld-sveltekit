import { error as sveltekiterror } from '@sveltejs/kit';
import type { Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';

import * as userapi from "$lib/api/user"

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
            const response = await userapi.login({ email: email, password: password })
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

