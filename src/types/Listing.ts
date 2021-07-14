import { IDatedTimeEntity } from 'types'
export type ListingType = 'auction' | 'instant_buy'

export interface ListingData extends IDatedTimeEntity {
  type: ListingType
  startPrice: string
  endPrice: string
  // startTime: string
  // endTime: string
  salesTokenContract: string
  platfromFee: string
}