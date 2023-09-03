import { writable } from 'svelte/store';
import type { article } from '$lib/types';

const article: article = {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: true,
    favoritesCount: 0,
    author: {
        username: '',
        bio: '',
        following: false,
        image: ''
    }
};

export const articleStore = writable<article>(article);
export const updateAuthor = (author: article["author"]) => {
    articleStore.update((article) => {
        article.author = author
        return article
    })
};
export const updateArticle = (article: article) => {
    articleStore.set(article)
};