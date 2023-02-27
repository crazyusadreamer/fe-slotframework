/**
 * All Rights Reserved 2022. madwingames.com
 * 
 * This class responsible only of animate symbols
 * this class cannot create any instance but just manipulate them
 */

import gsap from 'gsap'
import * as PIXI from 'pixi.js'

import { Symbols } from '@helpers/symbols/Symbols'
import { ISymbols } from '@helpers/symbols/ISymbols'
import { symbolPool } from '@/factories/Factory'
import { IReel } from '@helpers/reels/IReel'
import { BaseReel } from '@helpers/reels/BaseReel'
import { SpinResponse } from '@types'
import GameSignals from '@/GameSignals'

export class SpinReel<SymbolClass extends PIXI.Container> extends BaseReel<SymbolClass> implements IReel {

    public symbols: ISymbols
    
    private stopData: number[]
    private isSpinning: boolean
    private topY: number

    /**
     *  PUBLIC IMPLEMENTATION
     */

    public init(symbols?: ISymbols) {
        super.init(symbols)
        this.symbols = symbols || new Symbols(symbolPool, this, this.config.HEIGHT)
    }
    
    /**
      * Adding one instance of reel's symbol
      * @param symbols - array of instances
      * @returns void
      */
    public initSymbols(symbols: number[]): void {
        const newSymbols = this.addAdditionalSymbols(symbols)
        
        for(let i = 0; i < newSymbols.length; i++) {
            const s: SymbolClass = this.symbols.createSymbol(this.getSymbolDataByIndex(newSymbols[i]))
            this.symbols.symbolToBottom(s)         
        }
        this.topY = this.symbols.topSymbol.y
    }

    private addAdditionalSymbols(symbols: number[]): number[] {
        const newSymbols: number[] = [...symbols]
        newSymbols.unshift(10)
        newSymbols.push(10)
        newSymbols.push(10)
        if(symbols.length < 6) newSymbols.unshift(10)
        if(symbols.length === 3) newSymbols.push(10)
        return newSymbols
    }

    /**
     * Adding one instance of reel's symbol
     * @param symbols - array of instances
     * @returns void
     */
    public addSymbols(symbols: number[]):  SymbolClass[] {
        const newSymbols: SymbolClass[] = []
        for(let i = symbols.length - 1; i >= 0; i--) {
            const s: SymbolClass = this.symbols.createSymbol(this.getSymbolDataByIndex(symbols[i]))
            newSymbols.push(s)
            this.symbols.symbolOnTop(s)         
        }
        this.topY = this.symbols.topSymbol.y
        return newSymbols
    }

    public start = (data?: SpinResponse): void => {
        this.isSpinning = true
        this.stopData = null      
        this.animate(0.5, this.config.START_EASING).then(() => {
            this.blur()
        })
    }

    public stop = (symbols: number[]): void => {
        if(!this.isSpinning) return
        const newSymbols = this.addAdditionalSymbols(symbols)

        this.unblur()      
        this.stopData = newSymbols
        gsap.killTweensOf(this.symbols.symbols)
        this.stopping()
    }

    public stopImmediately = (symbols: number[]): void => {
        this.unblur()      
        const newSymbols = this.addAdditionalSymbols(symbols)

        this.stopData = newSymbols
        gsap.killTweensOf(this.symbols.symbols)
        
        if(this.isSpinning) {
            this.symbols.removeAllSymbols()
            this.createNewSymbols()

            const shift = 60
            let dy = this.topY - shift
            this.symbols.symbols.forEach((symbol: SymbolClass) => {
                symbol.y = dy
                dy += this.config.HEIGHT
            })
            this.animateStopping(shift, 0.2, `back.out(4)`)
        } else {
            this.animateStopping(this.topY - this.symbols.topSymbol.y, 0.2, `back.out(0.4)`)
        }
    }
    
    /**
     *  PRIVATE IMPLEMENTATION
     */
    protected createNewSymbols() {
        for(let i = this.stopData.length - 1; i >= 0; i--) {
            const s: SymbolClass = this.symbols.createSymbol(this.getSymbolDataByIndex(this.stopData[i]))
            /* switch (this.stopData[i]) {
                case 9:
                case 10:
                case 11:
                    s.showMystery()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                    break
            } */
            this.symbols.symbolOnTop(s)         
        } 
    }
    
    protected stopping = (): void => {
        this.createNewSymbols()
       this.animateStopping(this.topY - this.symbols.topSymbol.y, 0.4, `back.out(0.9)`)
    }

    protected animateStopping(distance: number, duration: number, ease: string): void {
        this.isSpinning = false
        gsap.to(this.symbols.symbols, {
            duration: duration,
            ease: ease,
            y: `+=${distance}`,
            onComplete: this.onCompleteStopping
        })
    }

    protected onCompleteStopping = (): void => {
        const amount = this.symbols.total - (this.config.SYMBOLS_PER_REEL + 2)
        for(let i = 0; i < amount; i++) {
            this.symbols.removeBottomSymbol()
        }
        GameSignals.reelStopped.emit(this.index)
    }

    /**
     * Basic animation
     * @param duration 
     * @param easing 
     * @returns 
     */
    protected animate = async (duration: number, easing: string = 'none'): Promise<void> => {  
        const d: number = this.config.HEIGHT
        return new Promise((resolve) => {
            gsap.to(this.symbols.symbols, {
                duration: duration,
                ease: easing,
                y: `+=${d}`,
                onComplete: () => {
                    if(this.stopData) {
                        resolve()
                        return
                    }
                    const s: SymbolClass = this.symbols.symbols.pop() as SymbolClass
                    s.visible = true
                    this.symbols.symbolOnTop(s)
                    this.animate(this.config.REGULAR_SPEED)
                    resolve()
                },
            })
        })
    }
    

}