import StateSignals from '@/states/StateSignals'
import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import GameSignals from '@/GameSignals'

export class StopState extends BaseState {

    begin() {
        setTimeout(() => {
            GameSignals.allReelsStopped.connect(this.end)
            StateSignals.stopReels.emit(this.model.spinResponse)
        }, 1000)
    }

    end = (data?: any) => {
        this.stateMachine.setState(GameStatesEnum.FINAL_STATE)
    }

    cleanUp() {
        GameSignals.allReelsStopped.disconnect(this.end)
    }
}
