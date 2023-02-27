import { Preloader } from '@/containers/preloader/PreloaderContainer'

export const createPreloader = () => {
    const preloader: Preloader = new Preloader()
    preloader.show()
    return preloader
}