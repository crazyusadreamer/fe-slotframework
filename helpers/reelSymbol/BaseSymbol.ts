import * as PIXI from 'pixi.js'
import {IPoolable} from '@helpers/pool/IPoolable'
import {SpriteP} from '@helpers/sprite/PSprite'
import { spritePPool } from '@/factories/Factory'
import { SymbolData } from '@types'


export class BaseSymbol extends PIXI.Container implements IPoolable {
    
    protected sprite: SpriteP
    protected sprContainer: PIXI.Container

    constructor(data: SymbolData) {
        super()
        this.sprContainer = new PIXI.Container()
        this.addChild(this.sprContainer)
        this.init(data)
    }
    
    public init(data: SymbolData): void {
        const texture: PIXI.Texture = PIXI.Texture.from(data.name)
        this.sprite = spritePPool.out(texture)
        this.sprite.anchor.set(0.5)
        this.sprContainer.addChild(this.sprite)
        
    }

    public reset(): void {
        this.removeChild(this.sprite)
        spritePPool.in(this.sprite)
    }

    hide() {
        this.visible = false
    }

    show() {
        this.visible = true
    }

} 