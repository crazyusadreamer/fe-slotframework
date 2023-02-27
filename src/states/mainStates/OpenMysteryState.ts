import StateSignals from '@/states/StateSignals'
import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'

export class OpenMysteryState extends BaseState {

    begin() {
        this.openSymbols()
    }

    end = (data?: any) => {
        //TODO:
        // if there are any bonus and freespins symbol
        // this.openBonusSymbols()

        // else  
        // if there are any lucky money symbols
        // this.openLuckySymbols()
        
        this.stateMachine.setState(GameStatesEnum.FINAL_STATE)
    }

    openSymbols() {
        //TODO:
        //open lucky money symbols
        setTimeout(() => {
            StateSignals.openMystery.emit(this.model.bonusData, this.end)
        }, 1000)
    }

    cleanUp() {
       

    }
}
