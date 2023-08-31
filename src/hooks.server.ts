import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    console.log("xx" + new Date())

    let cookies = event.cookies
    let userInfo = cookies.get("userinfo")
    console.log(userInfo)

    let user = null
    if (userInfo) {
        user = atob(userInfo)
    }
    console.log(user)
    // console.log(cookies.get(JSON.parse(user)))
    event.locals.user = user

    const response = await resolve(event);
    return response;
}) satisfies Handle;

