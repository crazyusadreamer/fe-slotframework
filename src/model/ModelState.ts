import { GameStateMachine } from '@/states/GameStateMachine'
import GameStatesEnum from '@/states/GameStatesEnum'

export class ModelState {
  public currentState: string = ''
  public stateMachine: any = null

  init() {
    this.stateMachine = new GameStateMachine(this, GameStatesEnum)
    this.stateMachine.setState(GameStatesEnum.GET_INIT_RESPONSE_STATE)
  }
}
