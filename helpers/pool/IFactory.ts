/**
 * IFactory represents methods PoolFactory implements a pool of objects
 */
export interface IFactory {
    in(item: any): void
    out(data?: any): any
}