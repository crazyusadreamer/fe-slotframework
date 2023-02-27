import StateSignals from '@/states/StateSignals'
import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import { MysterySymbolData } from '@types'

export class OpenWildState extends BaseState {

    begin(wild: MysterySymbolData) {
       StateSignals.openWild.emit(wild, this.end)
    }

    end = (data?: any) => {
        this.stateMachine.setState(GameStatesEnum.SHOW_WAYS_STATE)
    }

    cleanUp() {
    }
}
