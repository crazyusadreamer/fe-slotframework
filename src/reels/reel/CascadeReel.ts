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
 import { IReel } from '@helpers/reels/IReel'
 import { baseSymbolPool } from '@/factories/Factory'
 import { BaseReel } from '@helpers/reels/BaseReel'
 import { ISpinResponse } from '@helpers/backend/interfaces'
 import Facade from '@/Facade'

 export class CascadeReel<SymbolClass extends PIXI.Container> extends BaseReel<SymbolClass> implements IReel {
 
     public symbols: ISymbols
     private stopData: number[]

     /**
      *  PUBLIC IMPLEMENTATION
      */
 
    public init(symbols?: ISymbols) {
        super.init(symbols)
        this.symbols = symbols || new Symbols(baseSymbolPool, this)
    }
     
     /**
      * Adding one instance of reel's symbol
      * @param symbols - array of instances
      * @returns void
      */
    public initSymbols(symbols: number[]): void {
        for(let i = 0; i < symbols.length; i++) {
            const s: SymbolClass = this.symbols.createSymbol(this.getSymbolDataByIndex(symbols[i]))
            this.symbols.symbolToBottom(s)         
        }
    }

     /**
      * Adding one instance of reel's symbol
      * @param symbols - array of instances
      * @returns void
      */
    public addSymbols(symbols: number[]): SymbolClass[] {
        const newSymbols: SymbolClass[] = []
        for(let i = symbols.length - 1; i >= 0; i--) {
            const s: SymbolClass = this.symbols.createSymbol(this.getSymbolDataByIndex(symbols[i]))
            newSymbols.push(s)
            this.symbols.symbolOnTop(s)         
        }
        return newSymbols
    }

    public start = (): void => {
        const symbols = [...this.symbols.symbols]
        const d = this.symbols.total * this.config.HEIGHT
        
        this.animateSymbols(d, symbols, 'power2.in').then((symbols: any[]) => {
            symbols.forEach((symbol) => {
                this.symbols.removeSymbol(symbol)
            })
        })
    }

    public stop = async (symbols: number[], isQuickStop: boolean = false): Promise<void> => {
        const newSymbols: SymbolClass[] = []
        let dy: number = -300
        for(let i = symbols.length - 1; i >= 0; i--) {
            const s = this.symbols.createSymbol(this.getSymbolDataByIndex(symbols[i]))
            s.y = dy
            dy -= this.config.HEIGHT
            newSymbols.push(s)
        }
        const d = newSymbols.length * this.config.HEIGHT
        await this.animateSymbols(1100, newSymbols, 'power2.in')
        this.symbols.symbols = [...newSymbols]
    }

    protected animateSymbols = async (distance: number, symbols: SymbolClass[], easing: string = 'none'): Promise<any> => {     
        return new Promise((resolve) => {
            const duration: number = distance / this.config.SPEED
            gsap.to(symbols, {duration: duration, y: `+=${distance}`, ease: easing, 
            stagger: {amount: 0.2, from:'end'}, onComplete: () => {
                resolve(symbols)
            }})
        })    
    }

    protected animate = async (distance: number, easing: string = 'none'): Promise<any> => {     
        return this.animateSymbols(distance, this.symbols.symbols, easing)
    }



 }