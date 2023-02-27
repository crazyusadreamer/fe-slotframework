import GameSignals from '@/GameSignals'
import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import { SpinResponse } from '@types'

export class RecoveryState extends BaseState {

    begin() {
        const lastResponse: SpinResponse = this.model.recoveryData.responses[0]
        this.model.spinResponse = lastResponse
        this.end()
    }

    end = (data?: any) => {
        this.stateMachine.setState(GameStatesEnum.RESPIN_STATE)
        this.model.isRecovering = false
    }

    cleanUp() {
        GameSignals.spinButtonPressed.disconnect(this.end)
    }
}
