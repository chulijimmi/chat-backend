type N = number | boolean | string;
export const isNumber = (n: N): boolean => {
    return !isNaN(parseFloat(n.toString())) && isFinite(Number(n));
};
