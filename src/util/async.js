export const delay = (delay: number) => {
    return new Promise(res => setTimeout(res, delay));
}