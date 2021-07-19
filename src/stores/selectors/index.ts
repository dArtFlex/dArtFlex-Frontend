import { createSelector } from 'reselect'
import { stateType } from 'stores/reducers'

// Assets
export const selectAssets = () =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assets, fetching } }: stateType) => ({ assets, fetching })
  )
export const selectAssetFromList = (id: string) =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assets } }: stateType) => ({ asset: assets?.find((a) => a.item_id === id) })
  )
export const selectAssetDetails = () =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assetDetails, fetching } }: stateType) => ({ assetDetails, fetching })
  )
export const selectAssetTokenRates = () =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { exchangeRates } }: stateType) => ({ exchangeRates })
  )

// User
export const selectUser = () =>
  createSelector(
    (store: stateType) => store,
    ({ user: { user, userAssets, fetching } }: stateType) => ({ user, userAssets, fetching })
  )
export const selectUserRole = () =>
  createSelector(
    (store: stateType) => store,
    ({ user: { role } }: stateType) => ({ role })
  )

// Wallet
export const selectWallet = () =>
  createSelector(
    (store: stateType) => store,
    ({ wallet: { wallet, tokensBalances } }: stateType) => ({ wallet, tokensBalances })
  )
export const selectWalletError = () =>
  createSelector(
    (store: stateType) => store,
    ({ wallet: { error } }: stateType) => ({ error })
  )

// Minting
export const selectMinting = () =>
  createSelector(
    (store: stateType) => store,
    ({ minting }: stateType) => ({ minting })
  )

// Listing
export const selectListing = () =>
  createSelector(
    (store: stateType) => store,
    ({ listing }: stateType) => ({ listing })
  )

// Bid
export const selectBid = () =>
  createSelector(
    (store: stateType) => store,
    ({ bid }: stateType) => ({ bid })
  )
