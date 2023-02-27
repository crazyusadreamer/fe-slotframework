import { BaseContainer } from '@helpers/containers/BaseContainer'
import * as PIXI from 'pixi.js'

export class BackgroundContainer extends BaseContainer {

    show() {
        const back = PIXI.Sprite.from(PIXI.Texture.from('gameBackground'))
        this.addChild(back)
    }
}