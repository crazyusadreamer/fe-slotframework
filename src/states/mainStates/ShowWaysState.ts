import StateSignals from '@/states/StateSignals'
import { BaseState } from '@stateMachine/BaseState'
import GameStatesEnum from '@/states/GameStatesEnum'
import { MysterySymbolData, WayWin } from '@types'

export class ShowWaysState extends BaseState {

    begin() {
        setTimeout(() => {
            const ways: WayWin[] = this.model.ways
            StateSignals.showWays.emit(ways, this.end)
        }, 0)
    }

    end = (data?: any) => {
        if (this.model.wilds && this.model.wilds.length > 0) {
            const wild: MysterySymbolData = this.model.wilds.pop()
            this.stateMachine.setState(GameStatesEnum.OPEN_WILD_STATE, wild)
        } else {
            this.model.ways.length = 0
            this.stateMachine.setState(GameStatesEnum.FINAL_STATE)
        }
    }

    cleanUp() {
    }
}
