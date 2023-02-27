import GameSignals from '@/GameSignals'
import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import Facade from '@/Facade'

export class IdleState extends BaseState {

    begin() {
        if(Facade.isAuto) {
            this.end()
            return
        }
       GameSignals.spinButtonPressed.connect(this.end)
    }

    end = (data?: any) => {
        this.stateMachine.setState(GameStatesEnum.PRE_SPIN_STATE)
    }

    cleanUp() {
        GameSignals.spinButtonPressed.disconnect(this.end)
    }
}
