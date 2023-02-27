import { Signal } from 'typed-signals'

export default {
    TICK: new Signal<() => void>()
}