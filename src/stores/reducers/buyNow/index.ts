import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BuyNowStateType } from './types'

const initialState: BuyNowStateType = {
  fetching: false,
  fetchingTransacting: false,
  transactionHash: '',
  error: '',
}

const buyNowSlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    buyNowRequest: (state, i) => {
      state.fetchingTransacting = true
    },
    buyNowSuccess: (state, { payload }: PayloadAction<{ buyItemId: number; transactionHash: string }>) => {
      state.buyItemId = payload.buyItemId
      state.transactionHash = payload.transactionHash
      state.fetchingTransacting = false
    },
    buyNowFailure: (state, { payload }: PayloadAction<{ message: string }>) => {
      state.error = payload.message
      state.fetchingTransacting = false
    },

    clearBuyNowError: (state) => {
      state.error = ''
    },
  },
})

export const { buyNowRequest, buyNowSuccess, buyNowFailure, clearBuyNowError } = buyNowSlice.actions

export const { reducer } = buyNowSlice
