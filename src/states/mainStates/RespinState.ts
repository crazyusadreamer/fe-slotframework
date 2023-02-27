import StateSignals from '@/states/StateSignals'
import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'

export class RespinState extends BaseState {

    begin() {
        StateSignals.respinReels.emit(this.end)
     }
 
     end = (data?: any) => {
         this.stateMachine.setState(GameStatesEnum.GET_RESPIN_RESPONSE_STATE)
     }
 
     cleanUp() {
     }
}
