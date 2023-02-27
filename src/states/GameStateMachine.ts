import { StateMachine } from '@stateMachine/StateMachine'
import StateSignals from '@stateMachine/StateMachineSignals'

import { BeforeLoadingState } from '@/states/startStates/BeforeLoadingState'
import { PreloadingState } from '@/states/startStates/PreloadingState'
import { LoadingState } from '@/states/startStates/LoadingState'
import { GetInitResponseState } from '@/states/startStates/GetInitResponseState'
import { InitState } from '@/states/startStates/InitState'
import { ShowGameState } from '@/states/startStates/ShowGameState'
import { BuildGraphicsState } from '@/states/startStates/BuildGraphicsState'
import { RecoveryState } from '@/states/startStates/RecoveryState'

import { IdleState } from '@/states/mainStates/IdleState'
import { GetSpinResponseState } from '@/states/mainStates/GetSpinResponseState'
import { GetRespinResponseState } from '@/states/mainStates/GetRespinResponseState'
import { PreSpinState } from '@/states/mainStates/PreSpinState'
import { SpinState } from '@/states/mainStates/SpinState'
import { RespinState } from '@/states/mainStates/RespinState'
import { StopState } from '@/states/mainStates/StopState'
import { CloseState } from '@/states/mainStates/CloseState'
import { ShowWaysState } from '@/states/mainStates/ShowWaysState'
import { OpenMysteryState } from '@/states/mainStates/OpenMysteryState'
import { TotalCountingState } from '@/states/mainStates/TotalCountingState'
import { OpenWildState } from '@/states/mainStates/OpenWildState'
import { FinalState } from '@/states/mainStates/FinalState'

export class GameStateMachine extends StateMachine {

  constructor(model: any, StateEnum: any) {
    super(model, StateEnum)
  }

  init(gameStatesEnum: any) {
    super.init(gameStatesEnum)
    this.addState(BeforeLoadingState, this.statesEnum.BEFORE_LOADING_STATE)
    this.addState(PreloadingState, this.statesEnum.PRELOADING_STATE)
    this.addState(LoadingState, this.statesEnum.LOADING_STATE)
    this.addState(GetInitResponseState, this.statesEnum.GET_INIT_RESPONSE_STATE)
    this.addState(InitState, this.statesEnum.INIT_STATE)
    this.addState(ShowGameState, this.statesEnum.SHOW_GAME_STATE)
    this.addState(BuildGraphicsState, this.statesEnum.BUILD_GRAPHICS_STATE)
    this.addState(RecoveryState, this.statesEnum.RECOVERY_STATE)
    this.addState(IdleState, this.statesEnum.IDLE_STATE)
    this.addState(GetSpinResponseState, this.statesEnum.GET_SPIN_RESPONSE_STATE)
    this.addState(GetRespinResponseState, this.statesEnum.GET_RESPIN_RESPONSE_STATE)
    this.addState(PreSpinState, this.statesEnum.PRE_SPIN_STATE)
    this.addState(SpinState, this.statesEnum.SPIN_STATE)
    this.addState(RespinState, this.statesEnum.RESPIN_STATE)
    this.addState(StopState, this.statesEnum.STOP_STATE)
    this.addState(CloseState, this.statesEnum.CLOSE_STATE)
    this.addState(ShowWaysState, this.statesEnum.SHOW_WAYS_STATE)
    this.addState(OpenMysteryState, this.statesEnum.OPEN_MYSTERY_STATE)
    this.addState(TotalCountingState, this.statesEnum.TOTAL_COUNTING_STATE)
    this.addState(OpenWildState, this.statesEnum.OPEN_WILD_STATE)
    this.addState(FinalState, this.statesEnum.FINAL_STATE)
  }

  stateChanged(id: string, model: any) {
    super.stateChanged(id, model)
    console.log('State CHANGED:', id)
    StateSignals.stateChanged.emit(id)
  }
}
