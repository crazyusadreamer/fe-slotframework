import * as PIXI from 'pixi.js'
import {IPoolable} from '@helpers/pool/IPoolable'
import {SpriteP} from '@helpers/sprite/PSprite'
import {BaseSymbol} from '@helpers/reelSymbol/BaseSymbol'
import { spritePPool } from '@/factories/Factory'
import { SymbolData } from '@types'
import gsap from 'gsap'


export class GameSymbol extends BaseSymbol implements IPoolable {
    
    protected mysterySprite: SpriteP
    protected mysteryContainer: PIXI.Container

    constructor(data: SymbolData) {
        super(data)
        this.mysteryContainer = new PIXI.Container()
        this.addChild(this.mysteryContainer)
        this.createMystery()
    }

    public winAnimation(): void {
        this.parent.addChild(this)
        gsap.to(this.scale, {duration: 0.3, x: 1.6, y: 1.6, onComplete: () => {
            gsap.to(this.scale, {duration: 0.7, x: 1, y: 1})
        }})
    }

    createMystery() {
        const texture: PIXI.Texture = PIXI.Texture.from('bonus/mystery')
        this.mysterySprite = spritePPool.out(texture)
        this.mysterySprite.anchor.set(0.5)
        this.mysteryContainer.addChild(this.mysterySprite)
        this.mysterySprite.visible = false
        this.mysterySprite.alpha = 0
    }

    showMystery() {
        this.mysterySprite.visible = true
        this.mysterySprite.alpha = 1
    }

    async hideMystery(): Promise<void> {
        return new Promise((resolve) => {
            gsap.to(this.mysterySprite, {duration: 1, alpha: 0, onComplete: () => {
                resolve()
            }})
        })
    }

} 