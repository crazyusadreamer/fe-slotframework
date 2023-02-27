/**
 * All Rights Reserved 2022. madwingames.com

 * Component includes list of instances. 
 * Incapsulates all accesability and functionality like creating, adding, removing.
 */

import * as PIXI from 'pixi.js'
import { ObservablePoint } from 'pixi.js'
import { IFactory } from '@helpers/pool/IFactory'
import { ISymbols } from '@helpers/symbols/ISymbols'
import { SymbolData } from '@types'
import Layers from '@/Layers'

export class Symbols<SymbolClass extends PIXI.Container> implements ISymbols {

    private _symbols: SymbolClass[]
    private _factory: IFactory
    private _container: PIXI.Container
    private _height: number

    constructor(factory: IFactory, container: PIXI.Container, height: number) {
        this.height = height
        this.symbols = []
        this._container = container
        this._factory = factory
    }

    /**
     * Create/get an instance of <SymbolClass> from the pool
     * and adds it on the screen inside <container> 
     * @param data 
     * @returns instance of <SymbolClass>
     */
    createSymbol(data: SymbolData): SymbolClass {
        const symbol: SymbolClass = this._factory.out(data)
        symbol.parentLayer = Layers.symbolsLayer
        this._container.addChild(symbol)
        return symbol
    }

    /**
     * Move the symbol on the top of array and screen
     * @param symbol - instance of SymbolClass
     */
    public symbolOnTop(symbol: SymbolClass): void {
        this.moveOnTop(symbol)
        this.symbols.unshift(symbol)
    }
    

    /**
     * Move the symbol to the bottom of array and screen
     * @param symbol - instance of SymbolClass
     */
    public symbolToBottom(symbol: SymbolClass): void {
        this.moveToBottom(symbol)
        this.symbols.push(symbol)
    }

    /**
     * Move the symbol to the bottom of screen
     * @param symbol - instance of SymbolClass
     */
     public moveOnTop(symbol: SymbolClass): void {
        symbol.y = this.getTopPosition().y - this.height
    }

    /**
     * Move the symbol to the bottom of screen
     * @param symbol - instance of SymbolClass
     */
    public moveToBottom(symbol: SymbolClass): void {
        let height: number = this.bottomSymbol ? this.height : 0
        symbol.y = this.getBottomPosition().y + height   
    }

    /**
     * @returns position of top symbol
     */
    public getTopPosition(): PIXI.ObservablePoint<any> {
        return this.symbols.length > 0 ? this.symbols[0].position : {x: 0, y: 0} as ObservablePoint<any>
    }

     /**
     * @returns position of bottom symbol
     */
    public getBottomPosition(): PIXI.ObservablePoint<any> {
        const length: number = this.symbols.length
        if(length > 0) {
            const bottomSymbol: SymbolClass = this.symbols[length - 1]
            return bottomSymbol.position
        }
        return {x: 0, y: 0} as ObservablePoint<any>
    }

    /**
     * removes all symbols back to the pool
     */
    public removeAllSymbols(): void {
        while(this.total > 0) {
            this._factory.in(this.symbols.pop())
        }
    }

    /**
     * removes all symbols back to the pool
     */
     public removeSymbol(symbol: SymbolClass): boolean {
        const index = this.symbols.indexOf(symbol)
        if(index === -1) return false
        this._factory.in(symbol)
        this.symbols.splice(index, 1)
        return true
    }

    /**
     * removes all symbols back to the pool
     */
     public removeBottomSymbol(): void {
        this._factory.in(this.symbols.pop())
    }

     /**
     * GETTERS AND SETTERS
     */
    
    /**
     * Set accesor to the symbol list
     */
    public set symbols(v : SymbolClass[]) {
        this._symbols = v
    }
    
    /**
     * Get accesor to the symbol list
     */
    public get symbols() : SymbolClass[] {
        return this._symbols
    }

    /**
     * Set accesor to the symbol list
     */
     public set height(v : number) {
        this._height = v
    }
    
    /**
     * Get accesor to the symbol list
     */
    public get height() : number {
        return this._height
    }

    /**
     * Get accesor to the current top symbol
     */
    public get topSymbol() : SymbolClass {
        return this.symbols[0]
    }

    /**
     * Get accesor to the current bottom symbol
     */
    public get bottomSymbol() : SymbolClass | null {
        return this.symbols.length > 0 ? this.symbols[this._symbols.length - 1] : null
    }

    /**
     * Get accesor to ammount on instances in the array
     */
    public get total() : number {
        return this.symbols.length
    }
    
}