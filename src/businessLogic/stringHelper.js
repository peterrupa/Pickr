export function truncate(text, maxLength) {
    if(text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
    }
    else return text;
}