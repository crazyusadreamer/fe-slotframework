import * as PIXI from 'pixi.js'
import { ModelData } from '@/model/ModelData'
import { ModelState } from '@/model/ModelState'
import { Utilities } from '@helpers/utils/Utilities'
import { createPIXIApplication } from '@/application/AppViewport'
import { MainContainer } from '@/containers/MainContainer'
import { PreloaderContainer } from '@/containers/preloader/PreloaderContainer'
import { SplashScreenContainer } from '@/containers/splash/SplashScreenContainer'
import { MainManager } from '@/managers/MainManager'

import Facade from '@/Facade'
import Config from '@/Config'
import StateSignals from '@/states/StateSignals'
import { ResizeManager } from '@/application/ResizeManager'
import { load } from '@helpers/loader/AssetsLoader'

export class Application {
  loader: any
  preloader: PreloaderContainer
  splashScreen: SplashScreenContainer
  mainContainer: MainContainer
  isSplashScreen: boolean = false

  public constructor() {

    StateSignals.preloading.connect(this.onPreloading)
    StateSignals.beforeGameLoading.connect(this.onBeforeGameLoading)
    StateSignals.buildGraphics.connect(this.onBuildGraphics)
    StateSignals.showGame.connect(this.onShowGame)
    new MainManager()

    class Model {
      init() {
        throw new Error('Method not implemented.')
      }
    }

    Utilities.applyMixins(Model, [ModelData, ModelState])
    const model = new Model()
    model.init()
  }

  onPreloading = async (callback: Function) => {
    Facade.configs = await load('configs')
    await load('preloader')
    callback()
  }

  onBeforeGameLoading = () => {
      Facade.app = createPIXIApplication()
      new ResizeManager()
      const currentSize = Config.displays.sizes.desktop

      this.preloader = new PreloaderContainer()
      Facade.app.stage.addChild(this.preloader)
      this.preloader.alingToCenter()
      this.preloader.position.set(currentSize.WORLD_WIDTH / 2, currentSize.WORLD_HEIGHT / 2)
  }

  onBuildGraphics = (callback: Function) => {
    this.mainContainer = new MainContainer()
    this.mainContainer.build(callback)
    Facade.app.stage.addChild(this.mainContainer)
  }

  onShowGame = (callback: Function) => {
    Facade.app.stage.removeChild(this.preloader)
    this.preloader.destroy()
    this.preloader = null

    if(this.isSplashScreen) {
      this.showSplashScreen()
    } else {
    this.mainContainer.show()
    }

    callback()
  }
  
  showSplashScreen() {
    const currentSize = Config.displays.sizes.desktop
    this.splashScreen = new SplashScreenContainer()
    Facade.app.stage.addChild(this.splashScreen)
    this.splashScreen.alingToCenter()
    this.splashScreen.position.set(currentSize.WORLD_WIDTH / 2, currentSize.WORLD_HEIGHT / 2)
  }


}
