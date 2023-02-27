import GameSignals from '@/GameSignals'
import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'

export class TotalCountingState extends BaseState {

    begin() {
        this.end()
    }

    end = (data?: any) => {
        this.stateMachine.setState(GameStatesEnum.FINAL_STATE)
    }

    cleanUp() {
    }
}
