import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import Facade from '@/Facade'
import BackendSignals from '@backend/BackendSignals'

export class CloseState extends BaseState {

    begin() {
        BackendSignals.getClose.emit({session: this.model.initResponse.session}, this.end)
    }

    end = (data?: any) => {
        this.stateMachine.setState(GameStatesEnum.IDLE_STATE)
    }

    cleanUp() {
    }
}
