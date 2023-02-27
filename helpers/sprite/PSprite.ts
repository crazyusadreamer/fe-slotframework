import * as PIXI from 'pixi.js'
import { IPoolable } from '../pool/IPoolable'

interface initData {
    texture: PIXI.Texture
}


export class SpriteP extends PIXI.Sprite implements IPoolable {
    constructor(texture: PIXI.Texture) {
        super(texture)
    }

    init(texture: PIXI.Texture) {
        this.texture = texture
    }

    reset() {
        
    }
}