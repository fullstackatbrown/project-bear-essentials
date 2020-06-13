export const pluralize = (num, word) => {
    if (num == 1) {
        return `${num} ${word}`;
    } else {
        return `${num} ${word}s`;
    }
};
