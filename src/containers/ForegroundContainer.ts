import { BaseContainer } from '@helpers/containers/BaseContainer'
import * as PIXI from 'pixi.js'

export class ForegroundContainer extends BaseContainer {

    show() {
        const towerLeft = PIXI.Sprite.from(PIXI.Texture.from('tower'))
        towerLeft.anchor.set(0.5)
        this.addChild(towerLeft)
        towerLeft.position.set(-550, -140)
        
        const towerRight = PIXI.Sprite.from(PIXI.Texture.from('tower'))
        towerRight.anchor.set(0.5)
        this.addChild(towerRight)
        towerRight.position.set(390, -140)
    }
}