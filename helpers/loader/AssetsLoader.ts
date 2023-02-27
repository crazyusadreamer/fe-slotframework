import * as PIXI from 'pixi.js'


export const init = async(path: string): Promise<void> => {
    return await PIXI.Assets.init({manifest: path})
}

export const load = async (bundleName: string): Promise<any> => {
    return await PIXI.Assets.loadBundle(bundleName)
    
}