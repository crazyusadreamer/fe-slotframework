import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import StateSignals from '@/states/StateSignals'

export class BuildGraphicsState extends BaseState {

  begin() {
    StateSignals.buildGraphics.emit(this.end)
  }

  end = (data?: any) => {
    this.stateMachine.setState(GameStatesEnum.INIT_STATE)
  }

  cleanUp() {}
}
