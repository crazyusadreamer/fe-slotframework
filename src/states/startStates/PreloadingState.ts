import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import StateSignals from '../StateSignals'

export class PreloadingState extends BaseState {

    async begin(data?: any) {
        StateSignals.preloading.emit(this.end)
    }
    
    end = (data?: any) => {
        this.stateMachine.setState(GameStatesEnum.LOADING_STATE)
    }

    cleanUp() {
    }
}
