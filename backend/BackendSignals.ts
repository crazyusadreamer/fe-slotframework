import { Signal } from 'typed-signals'
import { SpinRequest, InitRequest, CloseRequest } from '@types'

export default {
    getInit: new Signal<(data: InitRequest, callback: Function) => void>(),
    
    getSpin: new Signal<(data: SpinRequest, callback: Function) => void>(),
    getRespin: new Signal<(data: SpinRequest, callback: Function) => void>(),
    getClose: new Signal<(data: CloseRequest, callback: Function) => void>(),
}