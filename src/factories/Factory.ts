import { PoolFactory } from '@helpers/pool/PoolFactory'
import { SpriteP } from '@helpers/sprite/PSprite'
import { GameSymbol } from '@/reels/symbol/GameSymbol'

export const symbolPool = new PoolFactory(GameSymbol, 'BaseSymbol')
export const spritePPool = new PoolFactory(SpriteP, 'SpriteP')
