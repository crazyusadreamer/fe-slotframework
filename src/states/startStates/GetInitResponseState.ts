import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import BackendSignals from '@backend/BackendSignals'
import { InitResponse } from '@types'
import Facade from '@/Facade'

export class GetInitResponseState extends BaseState {

  begin() {
    BackendSignals.getInit.emit({game_id: Facade.urlParams.gameID, player_id: Facade.urlParams.playerID}, this.end)
  }

  end = (data: InitResponse) => {
    this.model.initResponse = data
    this.stateMachine.setState(GameStatesEnum.BEFORE_LOADING_STATE)
  }

  cleanUp() {}
}
