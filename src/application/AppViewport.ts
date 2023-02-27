import * as PIXI from 'pixi.js'
import Facade from '@/Facade'

export const createPIXIApplication = (): PIXI.Application => {
  
  PIXI.settings.TARGET_FPMS = 0.06
  PIXI.settings.UPLOADS_PER_FRAME = 1

  const canvas = document.getElementById("canvas");

  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: false,
    hello: false,
    view: canvas as HTMLCanvasElement,
    clearBeforeRender: true,
    powerPreference: "high-performance"
  })
  return app
}