import type { components } from '$lib/api/apitypes';

export type user = {
    username: string,
    password: string,
    token: string,
    image: string,
    bio: string
}

export type article = components['schemas']['Article']
export type comment = components['schemas']['Comment']