import { writable, type Writable } from 'svelte/store';
import type { article } from '$lib/types';
import { setContext, getContext } from 'svelte';


//sveltekitでstoreを使用する場合、storeをcontextに格納しないと複数リクエスト間で共有されてしまう。
//@see https://kit.svelte.jp/docs/state-management#using-stores-with-context
//@see https://github.com/sveltejs/kit/discussions/4339

//またstoreへの書き込みを非同期で行う場合、書き込み前に同期的にstoreを取得しておかないとエラーとなる。
//@see https://github.com/sveltejs/kit/issues/2381

export class ArticleStore {
    private writable: Writable<article>

    constructor(writable: Writable<article>) {
        this.writable = writable
    }

    static createStore = (article: article) => {
        const articleStore = writable<article>(article);
        setContext("articleStore", articleStore)
        return new ArticleStore(articleStore)
    }

    static getStore = () => {
        const articleStore = getContext<Writable<article>>("articleStore")
        return new ArticleStore(articleStore)
    }

    getWritable = () => {
        return this.writable;
    }
    updateAuthor = (author: article["author"]) => {
        this.writable.update((article) => {
            article.author = author
            return article
        })
    }
    updateArticle = (article: article) => {
        this.writable.set(article)
    };
}

// export const createStore = (article: article) => {
//     const articleStore = writable<article>(article);
//     setContext("articleStore", articleStore)
//     return articleStore
// }

// export const getStore = () => {
//     return getContext<Writable<article>>("articleStore")
// };

// export const updateAuthor = (author: article["author"]) => {
//     getStore().update((article) => {
//         article.author = author
//         return article
//     })
// };

// export const updateArticle = (article: article) => {
//     getStore().set(article)
// };

// // export const articleStore = writable<article>(article);

// // export const updateAuthor = (author: article["author"]) => {
// //     articleStore.update((article) => {
// //         article.author = author
// //         return article
// //     })
// // };
// // export const updateArticle = (article: article) => {
// //     articleStore.set(article)
// // };