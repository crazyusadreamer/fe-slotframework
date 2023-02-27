import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import { load } from '@helpers/loader/AssetsLoader'
import GameSignals from '@/GameSignals'

export class LoadingState extends BaseState {

    async begin(data?: any) {
        await load('main')
        setTimeout(() => {
            GameSignals.loadingComplete.emit()
            this.end()
        }, 1500)
    }
    

    end = (data?: any) => {
        this.stateMachine.setState(GameStatesEnum.BUILD_GRAPHICS_STATE)
    }

    cleanUp() {
    }
}
