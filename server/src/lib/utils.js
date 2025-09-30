export function isValidAmount(value) {
    return typeof value === "number" && Number.isFinite(value) && Math.abs(value) > 0;
}