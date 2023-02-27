import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import BackendSignals from '@backend/BackendSignals'
import { SpinResponse, SpinRequest } from '@types'

export class GetSpinResponseState extends BaseState {

  begin() {
    BackendSignals.getSpin.emit(
      {
        bet: this.model.initResponse.initial_bet,
        session: this.model.initResponse.session
    } as SpinRequest, this.end)
  }

  end = (data: SpinResponse) => {
    this.model.spinResponse = data
    this.stateMachine.setState(GameStatesEnum.STOP_STATE)
  }

  cleanUp() {}
}
