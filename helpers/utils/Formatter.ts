export function formatToCoins(value: number, currentcyCode: string, fixed: number) {
    return `${currentcyCode} ${Number(value).toFixed(fixed)}`.toUpperCase()
}

export function toMoney(value: number, fixed: number) {
    return `${Number(value).toFixed(fixed)}`
}
