import { PUBLIC_PAGELIMIT } from '$env/static/public';

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

export const createHeadersOptions = (locals?: App.Locals): any => {
    let user = locals?.user
    if (user) {
        return {
            "Authorization": `Token ${user.token}`
        }
    } else {
        return {}
    }
}