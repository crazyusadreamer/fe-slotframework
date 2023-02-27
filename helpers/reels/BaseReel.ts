/**
 * All Rights Reserved 2022. madwingames.com
 * 
 * This class responsible only of animate symbols
 * this class cannot create any instance but just manipulate them
 */

import * as PIXI from 'pixi.js'

import { ISymbols } from '@helpers/symbols/ISymbols'
import { IReel } from '@helpers/reels/IReel'
import { SymbolData } from '@types'

export class BaseReel<SymbolClass extends PIXI.Container> extends PIXI.Container implements IReel {

    public index: number
    public symbols: ISymbols
    public config: any
    private verticalBlurFilter: any

    /**
     *  PUBLIC IMPLEMENTATION
     */

    public init(symbols?: ISymbols) {
        this.verticalBlurFilter = new PIXI.filters.BlurFilterPass(false, 5, 4)
    }

    initSymbols(symbols: number[]): void{}

    /**
     * Adding one instance of reel's symbol
     * @param symbols - array of instances
     * @returns void
     */
    public addSymbols(symbols: number[]): SymbolClass[] {
        return 
    }

    public start = (): void => {
    }

    public stop = (data: number[], isQuickStop: boolean = false): void => {
    }

    stopImmediately(data: number[]): void{}

    public setConfig(config: any): void {
        this.config = config
    }

    public getSymbolDataByIndex(id: number): SymbolData {
        return {
            id: id,
            name: this.config.indexes[id]
        }
    }


    public blur(): void {
        this.filters = [this.verticalBlurFilter]
    }
    
    public unblur(): void {
        this.filters = null
    }


}