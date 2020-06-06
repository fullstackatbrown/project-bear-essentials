export const pluralize = (num, word) => {
    if (num > 1) {
        return `${num} ${word}s`;
    } else {
        return `${num} ${word}`;
    }
};