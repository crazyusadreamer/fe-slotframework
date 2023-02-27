import { PositionData, MysteryData, InitResponse, SpinResponse, MysterySymbolData, RecoveryData } from '@types'

export class ModelData {
    
    private _ways: any[]
    private _currentBet: number
    private _balance: number
    
    private _initResponse: InitResponse
    private _spinResponse: SpinResponse

    private _mysteryData: MysteryData
    private _recoveryData: RecoveryData
    private _wildSymbols: PositionData[]
    private _bonusSymbols: PositionData[]
    private _freespinsSymbols: PositionData[]
    private _luckyMoneySymbols: PositionData[]
    
    
    public isRecovering: boolean
    public close: boolean
    public respin: boolean

    public set initResponse(v : InitResponse) {
        this._initResponse = v

        this.recoveryData = v.recovery
        this.balance = v.balance
        this.currentBet = v.initial_bet
    }
    
    public get initResponse() : InitResponse {
        return this._initResponse
    }
    
    public set spinResponse(v : SpinResponse) {
        this._spinResponse = v
        this.close = v.close
        this.respin = v.respin
        this.ways = [...v.ways]
        //this.mysteryData = v.mystery
    }
    
    public get spinResponse() : SpinResponse {
        return this._spinResponse
    }
    
    public set recoveryData(v : RecoveryData) {
        this._recoveryData = v
        if(!this._recoveryData) return
        if(v.responses && v.responses.length > 0) {
            this.isRecovering = true
        }
    }

    public get recoveryData() : RecoveryData {
        return this._recoveryData
    }

    public set mysteryData(v : MysteryData) {
        this._mysteryData = v
        this.wildSymbols = this.parse(this._mysteryData.symbols, 'wild')
        this.bonusSymbols = this.parse(this._mysteryData.symbols, 'bonus')
        this.freespinsSymbols = this.parse(this._mysteryData.symbols, 'freespins')
        this.luckyMoneySymbols = this.parse(this._mysteryData.symbols, 'lucky')
    }

    public get mysteryData() : MysteryData {
        return this._mysteryData
    }
    
    public set balance(v : number) {
        this._balance = v
    }

    public get balance() : number {
        return this._balance
    }

    public set currentBet(v : number) {
        this._currentBet = v
    }

    public get currentBet() : number {
        return this._currentBet
    }
    
    public set wildSymbols(v : PositionData[]) {
        this._wildSymbols = v
    }

    public get wildSymbols() : PositionData[] {
        return this._wildSymbols
    }
    
    public set bonusSymbols(v : PositionData[]) {
        this._bonusSymbols = v
    }

    public get bonusSymbols() : PositionData[] {
        return this._bonusSymbols
    }
    
    public set freespinsSymbols(v : PositionData[]) {
        this._freespinsSymbols = v
    }

    public get freespinsSymbols() : PositionData[] {
        return this._freespinsSymbols
    }
    
    public set luckyMoneySymbols(v : PositionData[]) {
        this._luckyMoneySymbols = v
    }

    public get luckyMoneySymbols() : PositionData[] {
        return this._luckyMoneySymbols
    }

    public set ways(v : any[]) {
        this._ways = v
    }

    public get ways() : any[] {
        return this._ways
    }


    /**
        Parses a list of mystery symbol data and returns an array of position data for a specific type
        @param {MysterySymbolData[]} list - The list of mystery symbol data
        @param {string} type - The type of symbol to filter for
        @returns {PositionData[]} - An array of position data for the specified type
    */
    private parse(list: MysterySymbolData[], type: string): PositionData[] {
        let res: PositionData[] = []

        // Iterate through each item in the list
        list.forEach((item: MysterySymbolData) => {
            // If the item's type matches the specified type, add its position data to the result array
            if(item.type === type) {
                const symbols = item.position
                res = [...res, symbols]
            }
        })

        return res
    }
    
    
}
