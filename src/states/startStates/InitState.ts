import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum';
import StateSignals from '@/states/StateSignals'

export class InitState extends BaseState {

  begin() {
    StateSignals.initGame.emit(this.model.initResponse)
    this.end()
  }

  end = (data?: any) => {
    this.stateMachine.setState(GameStatesEnum.SHOW_GAME_STATE)
  }

  cleanUp() {}
}
