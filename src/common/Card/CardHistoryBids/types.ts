import { IBids, UserDataTypes } from 'types'

export interface ICardHistoryBidsProps extends IBids {
  userData: UserDataTypes
  bidAmountToToken: string
  bidAmountUsd: string
  userWalletId?: number
  onAccept?: () => void
  onCancel?: ({
    id,
    order_id,
    user_id,
    market_id,
  }: {
    id: number
    order_id: string
    user_id: string
    market_id: string
  }) => void
}

export interface ICardContainerProps {
  avatar: JSX.Element
  action: JSX.Element | null
  subheader: JSX.Element
  title: string
  children?: JSX.Element
}