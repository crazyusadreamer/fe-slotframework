import StateSignals from '@/states/StateSignals'
import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'

export class SpinState extends BaseState {

    begin() {
       StateSignals.spinReels.emit(this.end)
    }

    end = (data?: any) => {
        
        this.stateMachine.setState(GameStatesEnum.GET_SPIN_RESPONSE_STATE)
    }

    cleanUp() {
    }
}
