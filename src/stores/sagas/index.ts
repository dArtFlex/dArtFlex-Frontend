import { takeLatest, all } from 'redux-saga/effects'
import apiMiddleware from '../../services/api_middleware'

import {
  getUserDataRequest,
  createNewUserRequest,
  getUserAssetsRequest,
  getUserBidsRequest,
  getPromotionRequest,
  addPromotionRequest,
  deletePromotionRequest,
  getAllUsersRequest,
  getTradingHistoryRequest,
  checkAssetIdRequest,
  updatePromotionRequest,
  validateUserIdRequest,
  getActiveBidsByUserRequest,
  getSalesDataByOwnerRequest,
} from '../reducers/user'
import {
  getAssetsAllRequest,
  getAssetByIdRequest,
  getExchangeRateTokensRequest,
  getHashtagsAllRequest,
  addHashtagsRequest,
} from '../reducers/assets'
import {
  connectMetaMaskRequest,
  connnectWalletConnectRequest,
  getTokensBalancesRequest,
  walletsDisconetRequest,
  walletsHistoryRequest,
} from '../reducers/wallet'
import { lazyMintingRequest, uploadImageRequest } from '../reducers/minting'
import { listingRequest, unlistingRequest, changePriceRequest } from '../reducers/listing'
import {
  placeBidRequest,
  getBidsHistoryRequest,
  acceptBidRequest,
  getBidsRequest,
  cancelBidRequest,
  getOffersRequest,
} from '../reducers/placeBid'
import { buyNowRequest } from '../reducers/buyNow'
import {
  getNotificationsRequest,
  listenForSocketMessagesRequest,
  updateForSocketMessagesDataRequest,
} from '../reducers/notifications'
import {
  getAllWorksRequest,
  getAllUsersListRequest,
  banUserRequest,
  unbanUserRequest,
  banWorkRequest,
  unbanWorkRequest,
} from '../reducers/management'
import { cancelOfferRequest, makeOfferRequest, acceptOfferRequest } from '../reducers/makeOffer'
import { createStyleTransferRequest } from '../reducers/constructor'

import {
  getUserData,
  createNewUser,
  getUserAssets,
  getUserBids,
  getPromotion,
  addPromotion,
  deletePromotion,
  getAllUsers,
  tradingHistory,
  checkAssetId,
  updatePromotion,
  validateUserId,
  getActiveBidsByUser,
  getSalesDataByOwner,
} from '../sagas/user'
import { getAssetsAllData, getAssetById, getExchangeRateTokens, getHashtagsAll, addHashtags } from '../sagas/assets'
import {
  connectMetaMask,
  connectWalletConnect,
  getTokensBalances,
  walletsDisconet,
  walletsHistory,
} from '../sagas/wallet'
import { minting, uploadImage } from '../sagas/minting'
import { listing, unlisting, changePrice } from '../sagas/listing'
import { placeBid, getBidsHistory, acceptBid, getBids, cancelBid, getOffers } from '../sagas/placeBid'
import { buyNow } from '../sagas/buyNow'
import { getNotifications, listenForSocketMessages, updateForSocketMessagesData } from '../sagas/notifications'
import { getAllWorks, getAllUsersList, banUser, unbanUser, banWork, unbanWork } from '../sagas/management'
import { cancelOffer, makeOffer, acceptOffer } from '../sagas/makeOffer'
import { createStyleTransfer } from '../sagas/constructor'

export default function* root() {
  yield all([
    /** Assets **/
    takeLatest(getAssetsAllRequest.type, getAssetsAllData, apiMiddleware),
    takeLatest(getAssetByIdRequest.type, getAssetById, apiMiddleware),
    takeLatest(getExchangeRateTokensRequest.type, getExchangeRateTokens, apiMiddleware),
    takeLatest(getHashtagsAllRequest.type, getHashtagsAll, apiMiddleware),
    takeLatest(addHashtagsRequest.type, addHashtags, apiMiddleware),

    /** User **/
    takeLatest(getUserDataRequest.type, getUserData, apiMiddleware),
    takeLatest(createNewUserRequest.type, createNewUser, apiMiddleware),
    takeLatest(getUserAssetsRequest.type, getUserAssets, apiMiddleware),
    takeLatest(getUserBidsRequest.type, getUserBids, apiMiddleware),
    takeLatest(getPromotionRequest.type, getPromotion, apiMiddleware),
    takeLatest(addPromotionRequest.type, addPromotion, apiMiddleware),
    takeLatest(deletePromotionRequest.type, deletePromotion, apiMiddleware),
    takeLatest(getAllUsersRequest.type, getAllUsers, apiMiddleware),
    takeLatest(getTradingHistoryRequest.type, tradingHistory, apiMiddleware),
    takeLatest(checkAssetIdRequest.type, checkAssetId, apiMiddleware),
    takeLatest(updatePromotionRequest.type, updatePromotion, apiMiddleware),
    takeLatest(validateUserIdRequest.type, validateUserId, apiMiddleware),
    takeLatest(getActiveBidsByUserRequest.type, getActiveBidsByUser, apiMiddleware),
    takeLatest(getSalesDataByOwnerRequest.type, getSalesDataByOwner, apiMiddleware),

    /** Wallet **/
    takeLatest(connectMetaMaskRequest.type, connectMetaMask, apiMiddleware),
    takeLatest(connnectWalletConnectRequest.type, connectWalletConnect, apiMiddleware),
    takeLatest(getTokensBalancesRequest.type, getTokensBalances, apiMiddleware),
    takeLatest(walletsDisconetRequest, walletsDisconet),
    takeLatest(walletsHistoryRequest, walletsHistory),

    /** Minting **/
    takeLatest(lazyMintingRequest.type, minting, apiMiddleware),
    takeLatest(uploadImageRequest.type, uploadImage, apiMiddleware),

    /** Listing **/
    takeLatest(listingRequest.type, listing, apiMiddleware),
    takeLatest(unlistingRequest.type, unlisting, apiMiddleware),
    takeLatest(changePriceRequest.type, changePrice, apiMiddleware),

    /** Place Bid **/
    takeLatest(placeBidRequest.type, placeBid, apiMiddleware),
    takeLatest(getBidsHistoryRequest.type, getBidsHistory, apiMiddleware),
    takeLatest(acceptBidRequest.type, acceptBid, apiMiddleware),
    takeLatest(getBidsRequest.type, getBids, apiMiddleware),
    takeLatest(cancelBidRequest.type, cancelBid, apiMiddleware),
    takeLatest(getOffersRequest.type, getOffers, apiMiddleware),

    /** Buy Now **/
    takeLatest(buyNowRequest.type, buyNow, apiMiddleware),

    /** Notifications **/
    takeLatest(getNotificationsRequest.type, getNotifications, apiMiddleware),
    takeLatest(listenForSocketMessagesRequest, listenForSocketMessages),
    takeLatest(updateForSocketMessagesDataRequest, updateForSocketMessagesData),

    /** Management **/
    takeLatest(getAllWorksRequest.type, getAllWorks, apiMiddleware),
    takeLatest(getAllUsersListRequest.type, getAllUsersList, apiMiddleware),
    takeLatest(banUserRequest.type, banUser, apiMiddleware),
    takeLatest(unbanUserRequest.type, unbanUser, apiMiddleware),
    takeLatest(banWorkRequest.type, banWork, apiMiddleware),
    takeLatest(unbanWorkRequest.type, unbanWork, apiMiddleware),

    /** Make Offer **/
    takeLatest(makeOfferRequest.type, makeOffer, apiMiddleware),
    takeLatest(cancelOfferRequest.type, cancelOffer, apiMiddleware),
    takeLatest(acceptOfferRequest.type, acceptOffer, apiMiddleware),

    /** Constructor **/
    takeLatest(createStyleTransferRequest.type, createStyleTransfer, apiMiddleware),
  ])
}
