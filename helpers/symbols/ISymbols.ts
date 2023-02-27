import * as PIXI from 'pixi.js'
import { SymbolData } from '@types'

export interface ISymbols {
    createSymbol(data: SymbolData): any
    symbolOnTop(symbol: any): void
    symbolToBottom(symbol: any): void
    getTopPosition(): PIXI.ObservablePoint<any>
    getBottomPosition(): PIXI.ObservablePoint<any>
    moveOnTop(symbol: any): void
    moveToBottom(symbol: any): void
    removeAllSymbols(): void
    removeBottomSymbol(): void
    removeSymbol(symbol: any): boolean
    symbols: any[]
    topSymbol: any
    bottomSymbol: any
    total: number
}