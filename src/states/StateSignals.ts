import { Signal } from "typed-signals";
import { InitResponse, SpinResponse, WayWin } from '@types'

export default {
  beforeGameLoading: new Signal<() => void>(),
  showGame: new Signal<(callback: Function) => void>(),
  buildGraphics: new Signal<(callback: Function) => void>(),
  preloading: new Signal<(callback: Function) => void>(),
  initGame: new Signal<(data: InitResponse) => void>(),

  fallSymbols: new Signal<() => void>(),
  addNewSymbols: new Signal<(data: SpinResponse, callback: Function) => void>(),

  spinReels: new Signal<(callback: Function) => void>(),
  respinReels: new Signal<(callback: Function) => void>(),
  stopReels: new Signal<(data: SpinResponse) => void>(),
  
  getCloseResponse: new Signal<(callback: Function) => void>(),
  
  showWays: new Signal<(data: WayWin[], callback: Function) => void>(),
  openMystery: new Signal<(bonusData: any, callback: Function) => void>(),
  openWild: new Signal<(data: any, callback: Function) => void>()
};
