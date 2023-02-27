import StateSignals from '@/states/StateSignals'
import { WayWin } from '@types'
import Facade from '@/Facade'
import { GameSymbol } from '@/reels/symbol/GameSymbol'
import { IReel } from '@helpers/reels/IReel'

export class ShowWaysManager {

    constructor() {
        StateSignals.showWays.connect(this.onShowWays)
    }

    onShowWays = (ways: WayWin[], callback: Function) => {
        const left = this.getSymbolsFromWays(ways, 'ltr')
        const right = this.getSymbolsFromWays(ways, 'rtl')

        this.animateSymbols(left.symbols, left.reelIndexes, 'ltr')
        this.animateSymbols(right.symbols, right.reelIndexes, 'rtl')

        setTimeout(() => {
            callback()
        }, 1600)
    }

    animateSymbols(symbols: GameSymbol[], reelIndexes: number[], direction: string): void {
        const reels: IReel[] = Facade.currentReels
        reelIndexes.forEach((index: number) => {
            reels[index].parent.addChild(reels[index])
        })

        if(direction === 'ltr') {
            for (let i = 0; i < symbols.length; i++) {
                setTimeout(() => {
                    symbols[i].winAnimation()            
                }, i * 50)
            }
        } else {
            let j = 0
            for (let i = symbols.length - 1; i >= 0; i--) {
                setTimeout(() => {
                    symbols[i].winAnimation()            
                }, j * 50)
                j++
            }
        }
        

    }

    private getSymbolsFromWays(ways: WayWin[], direction: string): any {
        const reels: IReel[] = Facade.currentReels
        const reelIndexes: number[] = []
        const symbols: GameSymbol[] = []
        const filteredWays = ways.filter(way => way.direction === direction)

        for(let i = 0; i < filteredWays.length; i++) {
            const waysDisplay: any[][] = ways[i].ways_display
            for(let j = 0; j < waysDisplay.length; j++) {
                for(let k = 0; k < waysDisplay[j].length; k++) {
                    const symbol: GameSymbol = reels[j].symbols.symbols[k + 2]
                    if(waysDisplay[j][k] !== '' && symbols.indexOf(symbol) === -1) {
                        if(reelIndexes.indexOf(j) === -1) {
                            reelIndexes.push(j)
                        }
                        symbols.push(symbol)
                    }

                }
            }
        }
        return {symbols, reelIndexes}
    }    
    
    
}