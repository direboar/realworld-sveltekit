import createClient from "openapi-fetch";
import type { paths } from "$lib/api/apitypes";
const { GET } = createClient<paths>({ baseUrl: "https://api.realworld.io/api" });
import { createHeadersOptions, getPageLimit } from '$lib/utils/utils';
import { error as sveltekiterror } from '@sveltejs/kit';

const pageLimit = getPageLimit()

export const getTags = (async (locals: App.Locals) => {
    const { data, error } = await GET("/tags", {
        params: {
        },
        headers: createHeadersOptions(locals)
    })
    if (error) {
        //errorの発生は通常あり得ないので、500扱いとする
        sveltekiterror(500)
    } else {
        return data.tags
    }
})
