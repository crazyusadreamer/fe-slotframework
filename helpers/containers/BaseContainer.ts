import * as PIXI from 'pixi.js'
import { IContainer } from './IContainer'

export class BaseContainer extends PIXI.Container implements IContainer {

    alingToCenter() {
        this.pivot.set(this.width / 2, this.height / 2)
    }
}