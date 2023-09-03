import { fail, redirect } from '@sveltejs/kit';
import { error as sveltekiterror } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

import * as userapi from "$lib/api/user"

export const load = (async ({ locals }) => {
    let user = await userapi.getUser(locals)
    return {
        user: user.user
    }

}) satisfies PageServerLoad


export const actions = {
    update: async ({ request, cookies, locals }) => {
        const data = await request.formData()
        const username = data.get("username") as string
        const password = data.get("password") as string
        const image = data.get("image") as string
        const email = data.get("email") as string
        const bio = data.get("bio") as string
        if (username && email && image) {
            const response = await userapi.updateUser({ username: username, email: email, password: password, image: image, bio: bio, locals: locals })
            if (response.error) {
                return fail(422, { error: response.error })
            } else if (response.user) {
                //FIXME :Utilityで共通化
                cookies.set("userinfo", btoa(JSON.stringify(response.user)), { httpOnly: true })
                throw redirect(303, `/profile/${username}`)
            } else {
                throw sveltekiterror(500)
            }
        } else {
            throw sveltekiterror(400)
        }
    },

    logout: async ({ cookies }) => {
        cookies.delete("userinfo")
        throw redirect(303, "/")
    }
} satisfies Actions
