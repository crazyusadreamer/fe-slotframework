import { IFactory } from './IFactory'

export class PoolFactory implements IFactory {
  private pool: any[]
  private name: string
  private classType: any

  constructor(classType: any, name: string = 'oblect_pool') {
    this.classType = classType
    this.name = name
    this.pool = []
  }

  public in = (item: any) => {
    item.reset()
    item.position.set(0, 0)
    item.visible = false
    this.pool.push(item)
  }

  public out = (data?: any): any => {
    let symbol
    if (this.pool.length > 0) {
      symbol = this.pool.pop()
      symbol.init(data)
    } else {
      symbol = this.createSymbol(data)
    }
    symbol.visible = true
    return symbol
  }

  public createSymbol(data?: any) {
    return new this.classType(data)
  }

  debug() {
    console.log(`<-===== ${this.name}: ${this.pool.length} Objects =====->`);
  }
}
