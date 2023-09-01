import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    console.log("xx" + new Date())

    let cookies = event.cookies
    let userInfo = cookies.get("userinfo")

    let user = null
    if (userInfo) {
        user = JSON.parse(atob(userInfo))
    }
    // console.log(user)
    event.locals.user = user

    const response = await resolve(event);
    return response;
}) satisfies Handle;

