export const pluralize = (num, word) => {
    if (num > 1) {
        return `${num} ${word}s`;
    } else {
        return `${num} ${word}`;
    }
};

export const COLORS = {
	success: "#0F9960",
	fail: "#CC0200",
};