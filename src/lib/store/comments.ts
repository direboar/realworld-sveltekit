import { writable } from 'svelte/store';
import type { comment } from '$lib/types';

export const commentsStore = writable<comment[]>([]);

export const addComment = (comment: comment) => {
    console.log("xxx")
    commentsStore.update((comments) => {
        console.log(comment)
        console.log("xxx")
        console.log(comments)
        comments.push(comment)
        return comments
    })
};