import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import { init } from '@helpers/loader/AssetsLoader'
import StateSignals from '../StateSignals'

export class BeforeLoadingState extends BaseState {

    async begin(data?: any) {
        StateSignals.beforeGameLoading.emit()
        await init('./assets/assets.json')
        this.end()
    }

    end = (data?: any) => {
        this.stateMachine.setState(GameStatesEnum.PRELOADING_STATE)
    }

    cleanUp() {
    }
}
