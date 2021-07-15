import { IBidsHistory, UserDataTypes } from 'types'
export interface PlaceBidStateType {
  fetching: boolean
  error: string
  data: unknown | null
  bidAmount: number | null
  bidHistory: Array<IBidsHistory & { userData: UserDataTypes }>
}
