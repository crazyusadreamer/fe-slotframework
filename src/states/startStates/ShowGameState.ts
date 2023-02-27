import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import StateSignals from '@/states/StateSignals'

export class ShowGameState extends BaseState {

  begin() {
    StateSignals.showGame.emit(this.end)
  }

  end = (data?: any) => {
    let nextState: string = GameStatesEnum.IDLE_STATE
    
    if(this.model.recoveryData) {
      nextState = GameStatesEnum.RECOVERY_STATE
    }
    this.stateMachine.setState(nextState)
  }

  cleanUp() {}
}
