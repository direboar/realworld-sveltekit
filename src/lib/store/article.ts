import { writable, type Writable } from 'svelte/store';
import type { article } from '$lib/types';
import { setContext, getContext } from 'svelte';

// const article: article = {
//     slug: '',
//     title: '',
//     description: '',
//     body: '',
//     tagList: [],
//     createdAt: '',
//     updatedAt: '',
//     favorited: true,
//     favoritesCount: 0,
//     author: {
//         username: '',
//         bio: '',
//         following: false,
//         image: ''
//     }
// };

export const createStore = (article: article) => {
    const articleStore = writable<article>(article);
    setContext("articleStore", articleStore)
}

export const readStore = () => {
    return getContext<Writable<article>>("articleStore")
};

export const updateAuthor = (author: article["author"]) => {
    const articleStore = getContext<Writable<article>>("articleStore")
    readStore().update((article) => {
        article.author = author
        return article
    })
};

