import * as PIXI from 'pixi.js'
import TickerSignals from './TickerSignals'

const callbacks:  Set<Function> = new Set()

new Map<string, number>()

export const tickerStart = () => {
    PIXI.Ticker.shared.add(() => {
        TickerSignals.TICK.emit()
        callbacks.forEach((callback) => {
            callback()
        })
    })
}

export const addToTicker = (callback: Function): void => {
    callbacks.add(callback)
}

export const removeFromTicker = (callback: Function): boolean => {
    if(!callbacks.has(callback)) return false
    callbacks.delete(callback)
    return true
}