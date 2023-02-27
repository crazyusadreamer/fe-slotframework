export type SymbolData = {
    id: number
    name: string
}

export type InitRequest = {
    game_id: string
    player_id: string
}

export type SpinRequest = {
    bet: number
    session: string
}

export type CloseRequest = {
    session: string
}

export type InitResponse = {
    session: string
    player: string
    balance:  number
    bet_list: number[]
    initial_bet: number
    currency: any
    symbols: SymbolData[]
    reels: number[][]
    recovery: RecoveryData
}

export type RecoveryData = {
    responses: SpinResponse[]
}

export type SpinResponse = {
    balance: number
    bet: number
    ways_win: number
    round_win: number
    ways?: WayWin[]
    reels: number[][]
    win?: number
    respin: boolean
    close: boolean
}

export type WayWin = {
    id: number
    run: number 
    direction: string
    ways_display: any[][]
    win: number
}

export type MysteryData = {
    symbols: MysterySymbolData[]
}

export type MysterySymbolData = {
    type: string
    position: PositionData
}

export type PositionData = {
    i: number
    j: number
}


