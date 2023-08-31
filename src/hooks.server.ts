import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    console.log("xx" + new Date())

    let cookies = event.cookies

    console.log(cookies.get("token"))
    event.locals.token = cookies.get("token")

    const response = await resolve(event);
    return response;
}) satisfies Handle;