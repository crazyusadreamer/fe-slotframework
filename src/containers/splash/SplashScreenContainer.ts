import { BaseContainer } from '@helpers/containers/BaseContainer'
import GameSignals from '@/GameSignals'
import * as PIXI from 'pixi.js'
import StateSignals from '@/states/StateSignals'

export class SplashScreenContainer extends BaseContainer {

    constructor() {
        super()
        this.show()
    }

    show() {
        const back = new PIXI.Graphics()
        back.beginFill(0x555dd)
        back.drawRect(0, 0, 2400, 2400)
        back.endFill()
        this.addChild(back)

        StateSignals.beforeGameLoading.connect(() => {
            const button = this.drawButton()
            this.addChild(button)
            button.visible = true

            button.interactive = true
            button.on('pointerdown', () => {
                GameSignals.preloaderPressed.emit()
                this.hide()
            })

            button.position.set(200, 200)
        })
        
        this.visible = true
    }

    hide(): void {
        this.interactive = false
        this.visible = false
    }

    drawButton() {
        const gr = new PIXI.Graphics()
        gr.visible = false
        gr.beginFill(0xdd5533)
        gr.drawRect(0, 0, 100, 40)
        gr.endFill()
        gr.pivot.set(50, 20)
        return gr
    }
}