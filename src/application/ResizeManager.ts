import Facade from '@/Facade'
import * as PIXI from 'pixi.js'
import Platform from '@helpers/utils/Platform'
import GameSignals from '@/GameSignals'
import Config from '@/Config'

export class ResizeManager {
    private orientation: string = ''
    private currentSize: any

    gameRatio: number
    gameScale: number
    shiftX: number
    shiftY: number
    safeZone: PIXI.Rectangle
    stageWidth: number
    stageHeight: number

    static center: any

    constructor() {
        this.currentSize = Config.displays.sizes.landscape

        window.addEventListener('resize', () => {
            this.onResize()
        })

        this.onResize()
    }

    onResize() {
        this.checkOrientation()

        const size = this.innerSize()
        let finalInnerWidth = size.width
        let finalInnerHeight = size.height

        Facade.app.view.style.width = finalInnerWidth + 'px'
        Facade.app.view.style.height = finalInnerHeight + 'px'

        const scaleRatio = Platform.isMobile() ? 2 : 1

        finalInnerWidth *= scaleRatio
        finalInnerHeight *= scaleRatio

        Facade.app.renderer.resize(finalInnerWidth, finalInnerHeight)

        const scale = Math.min(finalInnerWidth / this.safeZone.width, finalInnerHeight / this.safeZone.height)
        Facade.scale = scale
        Facade.app.stage.scale.set(scale, scale)

        this.gameScale = scale

        Facade.app.stage.x = (finalInnerWidth - this.safeZone.width * scale) / 2 - this.safeZone.left * scale
        Facade.app.stage.y = (finalInnerHeight - this.safeZone.height * scale) / 2 - this.safeZone.top * scale
    }

    checkOrientation() {
        this.calculateCurrentSize()

        this.shiftX = (Facade.currentSize.WORLD_WIDTH - Facade.currentSize.SAFE_WIDTH) / 2
        this.shiftY = (Facade.currentSize.WORLD_HEIGHT - Facade.currentSize.SAFE_HEIGHT) / 2
        this.safeZone = new PIXI.Rectangle(this.shiftX, this.shiftY, Facade.currentSize.SAFE_WIDTH, Facade.currentSize.SAFE_HEIGHT)
        this.gameRatio = Facade.currentSize.WORLD_WIDTH / Facade.currentSize.WORLD_HEIGHT
    }

    calculateCurrentSize() {
        let orientation = ''
        const size = this.innerSize()
        this.stageWidth = size.width
        this.stageHeight = size.height

        const displayConfig = Config.displays

        if (this.stageWidth <= this.stageHeight && (Platform.isIPhone() || Platform.isAndroid())) {
            orientation = 'portrait'
            Facade.currentSize = displayConfig.sizes.portrait
        } else {
            if (Platform.isIPhone() || Platform.isAndroid()) {
                orientation = 'landscape'
                Facade.currentSize = displayConfig.sizes.landscape
            } else {
                orientation = 'desktop'
                Facade.currentSize = displayConfig.sizes.desktop
            }
        }


        if (!Platform.isIPhone() && Platform.isIOs()) {
            orientation = 'desktop'
            Facade.currentSize = displayConfig.sizes.desktop
        }


        ResizeManager.center = { x: Facade.currentSize.WORLD_WIDTH / 2, y: Facade.currentSize.WORLD_HEIGHT / 2 }
        if (orientation != this.orientation) {
            this.orientation = orientation

            Facade.orientation = this.orientation
        }
        GameSignals.orientationChanged.emit(this.orientation)
    }

    innerSize() {
        let stageWidth = document.documentElement.clientWidth
        let stageHeight = document.documentElement.clientHeight

        if (Platform.isIPhone() && Platform.isIOs()) {
            document.getElementsByTagName('html')[0].style.height = '100vh'
            document.getElementsByTagName('html')[0].style.minHeight = '100vh'
            setTimeout(function () {
                document.getElementsByTagName('html')[0].style.height = '100%'
                document.getElementsByTagName('html')[0].style.minHeight = '100%'
            }, 400)
        }
        return {
            width: stageWidth,
            height: stageHeight,
            ratio: stageWidth / stageHeight,
        }
    }

}