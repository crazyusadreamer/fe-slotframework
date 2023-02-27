import BackendSignals from '@backend/BackendSignals'
import { URLParser } from '@backend/URLParser'
import { CloseRequest, InitRequest, SpinRequest } from '@types'

export class BackendManager {

    url: string


    constructor(url: string) {
        this.url = url
        new URLParser()

        BackendSignals.getInit.connect(this.onGetInitResponse)
        BackendSignals.getSpin.connect(this.onGetSpinResponse)
        BackendSignals.getRespin.connect(this.onGetRespinResponse)
        BackendSignals.getClose.connect(this.onGetCloseResponse)
    }


    onGetInitResponse = async (data: InitRequest, callback: Function) => {
        const msg = {
            game: data.game_id,
            player: data.player_id
        };
        const response = await fetch(`${this.url}/init`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(msg)
          }
        )
    
        const json = await response.json()
        console.log(json)
        callback(json)
      };
    
      onGetSpinResponse = async (data: SpinRequest, callback: Function) => {
        const msg = {
            bet: data.bet,
            session: data.session
        };
        const response = await fetch(`${this.url}/spin`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(msg)
          }
        )
    
        const json = await response.json()
        console.log(json)
        callback(json)
      };
      
      onGetRespinResponse = async (data: SpinRequest, callback: Function) => {
        const msg = {
            bet: data.bet,
            session: data.session
        };
        const response = await fetch(`${this.url}/respin`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(msg)
          }
        )
    
        const json = await response.json()
        console.log(json)
        callback(json)
      };
      
      onGetCloseResponse = async (data: CloseRequest, callback: Function) => {
        const msg = {
            session: data.session
        };
        const response = await fetch(`${this.url}/close`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(msg)
          }
        )
    
        const json = await response.json()
        console.log(json)
        callback(json)
      };
    

}