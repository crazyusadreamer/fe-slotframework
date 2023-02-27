import StateSignals from '@/states/StateSignals'
import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'

export class FinalState extends BaseState {

    begin() {
        let nextState: string
        if(this.model.close) nextState = GameStatesEnum.CLOSE_STATE
        if(this.model.respin) nextState = GameStatesEnum.RESPIN_STATE

        /* if(this.model.spinResponse.win > 0) {
            nextState = GameStatesEnum.TOTAL_COUNTING_STATE
        } */

        /* if(this.model.bonusData && this.model.bonusData.symbols.length > 0) {
            nextState = GameStatesEnum.OPEN_MYSTERY_STATE
        } */

        if(this.model.ways && this.model.ways.length > 0) {
            nextState = GameStatesEnum.SHOW_WAYS_STATE
        }
        
        this.stateMachine.setState(nextState)
    }

    end = (data?: any) => {
    }

    cleanUp() {
    }
}
