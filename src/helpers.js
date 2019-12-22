export const reversedStr = input => (input.split('').reverse().join(''));

export const uniqueID = (() => {
    let count  = 0;
    return () => {
        count++;
        return count;
    };
})();
