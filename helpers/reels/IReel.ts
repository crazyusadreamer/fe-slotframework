import * as PIXI from 'pixi.js'
import { SymbolData } from '@types'
import { ISymbols } from '@helpers/symbols/ISymbols'

export interface IReel extends PIXI.DisplayObject {

    init(symbols?: ISymbols): void
    initSymbols(symbols: number[]): void
    addSymbols(symbols: any[]):  any[]
    start():void
    stop(data: number[], isQuickStop?: boolean): void
    stopImmediately(data: number[]): void
    setConfig(config: any): void
    getSymbolDataByIndex(index: number): SymbolData
    index: number
    symbols: ISymbols
}