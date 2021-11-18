import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectWallet, selectUser } from 'stores/selectors'
import { getExchangeRateTokensRequest } from 'stores/reducers/assets'
import { getUserDataRequest } from 'stores/reducers/user'
import { getTokensBalancesRequest, walletsHistoryRequest } from 'stores/reducers/wallet'
import { listenForSocketMessagesRequest } from 'stores/reducers/notifications'
import { switchChain } from 'stores/reducers/chain'
import { CircularProgressLoader } from 'common'
import appConst from 'config/consts'
import { getChainKeyByChainId } from 'utils'

const { INTERVALS } = appConst

export const DataProvider: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()
  const { wallet } = useSelector(selectWallet())
  const { user } = useSelector(selectUser())

  const fetchRate = () => {
    dispatch(getExchangeRateTokensRequest())
  }

  const fetchUser = useCallback(() => {
    if (wallet?.accounts[0]) {
      dispatch(getUserDataRequest({ wallet: wallet?.accounts[0] }))
      dispatch(getTokensBalancesRequest({ wallet: wallet?.accounts[0] }))
    }
  }, [wallet?.accounts[0]])

  useEffect(() => {
    fetchRate()
    dispatch(getExchangeRateTokensRequest())
    dispatch(walletsHistoryRequest())

    const chainIdData = localStorage.getItem('chainId')
    if (chainIdData) {
      const chainId = JSON.parse(chainIdData)
      const chainName = getChainKeyByChainId(chainId)
      if (chainName) dispatch(switchChain({ chainId, chainName }))
    }

    const iId = setInterval(() => fetchRate(), INTERVALS.UPDATE_ASSETS)
    setReady(true)
    return () => {
      clearInterval(iId)
    }
  }, [])

  useEffect(() => {
    fetchUser()
    return () => {
      fetchUser()
    }
  }, [wallet?.accounts[0]])

  useEffect(() => {
    if (user?.id) {
      dispatch(listenForSocketMessagesRequest({ userId: user.id }))
    }
  }, [user])

  return ready ? <>{children}</> : <CircularProgressLoader height="fullScreen" />
}
