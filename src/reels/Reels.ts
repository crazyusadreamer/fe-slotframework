import * as PIXI from 'pixi.js'
import { Layer } from '@pixi/layers'
import StateSignals from '@/states/StateSignals'
import { BaseContainer } from '@helpers/containers/BaseContainer'
import { IReel } from '@helpers/reels/IReel'
import { InitResponse, SpinResponse } from '@types'
import { SpinReel } from '@/reels/reel/SpinReel'
import Facade from '@/Facade'
import Layers from '@/Layers'
import GameSignals from '@/GameSignals'
import { GameSymbol } from '@/reels/symbol/GameSymbol'

export class Reels extends BaseContainer {

    currentReels: IReel[]
    stopData: SpinResponse
    reelsCounter: number
    isSpinning: boolean
    isForcedStop: boolean
    stopTimeouts: any[]
    config: any

    constructor(config: any) {
        super()
        this.config = config

        Layers.symbolsLayer = new Layer()
        Layers.winSymbolsLayer = new Layer()

        StateSignals.initGame.connect(this.onInitgame)
        StateSignals.spinReels.connect(this.onSpinReels)
        StateSignals.respinReels.connect(this.onSpinReels)
        StateSignals.stopReels.connect(this.onStopReels)
        StateSignals.showWays.connect(this.onShowWays)

        GameSignals.forceStopReels.connect(this.onForceStopReels)
        GameSignals.reelStopped.connect(this.onReelStopped)
    }

    private onInitgame = ({reels}: InitResponse): void => {
        this.currentReels = []
        this.stopTimeouts = []
        let xPos: number = 0

        for(let i = 0; i < reels.length; i++) {
            const reel: IReel = new SpinReel<GameSymbol>()
            reel.index = i
            this.currentReels.push(reel)
            this.addChild(reel)
            reel.setConfig(Facade.configs.reelsConfig)
            reel.init()
            reel.initSymbols(reels[i])
            reel.x = xPos
            xPos += this.config.WIDTH
        }
        this.alingToCenter()

        this.interactive = true
        this.on('pointerdown', () => {
            if(!this.isSpinning) {
                GameSignals.spinButtonPressed.emit()
            } else {
                GameSignals.forceStopReels.emit()
            }
        })
        Facade.currentReels = this.currentReels
        this.createMask()
    }

    public onSpinReels = (callback: Function): void => {
        this.stopData = null
        this.reelsCounter = 0
        this.isForcedStop = false
        this.isSpinning = true

        this.stopTimeouts = []
        callback()
        for(let i = 0; i < this.currentReels.length; i++) {
            setTimeout(() => {
                this.currentReels[i].start()
            }, i * 50)
        }
    }

    public onStopReels = (data: SpinResponse): void => {
        this.stopData = data

        if(this.isForcedStop) {
            this.stopReelsImmediately()
        } else {
            this.stoppingReels()
        }
    }

    private stoppingReels(): void {
        const reelsOrder = Facade.configs.reelsConfig.REELS_STOP_ORDER



        for(let i = 0; i < reelsOrder.length; i++) {
            const index: number = reelsOrder[i]
            this.stopTimeouts.push(setTimeout(() => {
                this.currentReels[index].stop(this.stopData.reels[index])
            }, i * this.config.STOP_REELS_DELAY))
        }
    }

    private stopReelsImmediately(): void {
        this.currentReels.forEach((reel: IReel, index: number) => {
            reel.stopImmediately(this.stopData.reels[index])
        })
    }

    protected onForceStopReels = (): void => {
        if(this.isForcedStop) return
        this.isForcedStop = true
        this.stopTimeouts.forEach((timeout) => {
            clearTimeout(timeout)
        })
        if(!this.stopData) return
        this.stopReelsImmediately()
    }

    protected onReelStopped = (reelIndex: number): void => {
        this.reelsCounter++
        if(this.reelsCounter === this.config.TOTAL_REELS) {
            this.isSpinning = false
            GameSignals.allReelsStopped.emit()
        }
    }

    protected onShowWays =(data: any, callback: Function): void => {
        return
        const promises: Promise<any>[] = []

        this.currentReels.forEach((reel: IReel, index: number) => {
            //promises.push(reel.animate(158, 'power2.in'))
        })
        Promise.all(promises).then(() => callback())
    }

    protected createMask(): void {
        const mask: PIXI.Graphics = new PIXI.Graphics()
        mask.beginFill(0xffffff, 0.7)
        mask.drawRect(-this.config.WIDTH / 2, this.config.HEIGHT / 2, 
        this.config.TOTAL_REELS * this.config.WIDTH, 
        this.config.SYMBOLS_PER_REEL * this.config.HEIGHT)
        mask.endFill()
        this.addChild(mask)
        this.mask = mask
    
    }

}