import { BaseContainer } from '@helpers/containers/BaseContainer'

import { IContainer } from '@helpers/containers/IContainer'
import { BackgroundContainer } from '@/containers/BackgroundContainer'
import { ForegroundContainer } from '@/containers/ForegroundContainer'
import { Reels } from '@/reels/Reels'

import Facade from '@/Facade'

export class MainContainer extends BaseContainer implements IContainer {

    constructor() {
        super()
        this.visible = false
    }

    public build(resolve: Function): void {
        const currentSize = Facade.configs.displayConfig.sizes.desktop

            const backgroundContainer = new BackgroundContainer()
            this.addChild(backgroundContainer)
            backgroundContainer.show() 
             
            const foregroundContainer = new ForegroundContainer()
            foregroundContainer.position.set(currentSize.WORLD_WIDTH / 2 + 70, currentSize.WORLD_HEIGHT / 2 + 170)
            this.addChild(foregroundContainer)
            foregroundContainer.show() 

            const reels = new Reels(Facade.configs.reelsConfig)
            reels.scale.set(0.8)
            reels.alingToCenter()
            reels.position.set(currentSize.WORLD_WIDTH / 2, currentSize.WORLD_HEIGHT / 2)
            this.addChild(reels)
            
            resolve()
    }

    public show(): void {
       this.visible = true
    }

}