import { PUBLIC_AUTHENTICATED, PUBLIC_PAGELIMIT } from '$env/static/public';
export const isAuthenticated = () => {
    return PUBLIC_AUTHENTICATED.toLowerCase() === 'true';
}

export const getPageLimit = () => {
    return Number(PUBLIC_PAGELIMIT)
}

export const formatDate = (date: string) => {
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}