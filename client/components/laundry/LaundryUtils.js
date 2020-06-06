import Colors from '../../constants/Colors.js'

export const pluralize = (num, word) => {
    if (num > 1) {
        return `${num} ${word}s`;
    } else {
        return `${num} ${word}`;
    }
};

export const COLORS = {
	success: Colors.success,
	fail: Colors.danger,
};