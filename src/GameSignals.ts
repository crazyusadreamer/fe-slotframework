import { Signal } from 'typed-signals'

export default {
  orientationChanged: new Signal<(orientation: string) => void>(),

  loadingComplete: new Signal<() => void>(),
  displayPreloader: new Signal<() => void>(),
  preloaderPressed: new Signal<() => void>(),
  spinButtonPressed: new Signal<() => void>(),
  forceStopReels: new Signal<() => void>(),
  reelStopped: new Signal<(index: number) => void>(),
  allReelsStopped: new Signal<() => void>(),
  bonusCollectComplete: new Signal<() => void>()
};
