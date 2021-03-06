import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectAssetTokenRates, selectUser, selectAssetDetails } from 'stores/selectors'
import { Box, Button } from '@material-ui/core'
import { CardHistory } from 'common'
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'
import { IBidsHistory, UserDataTypes } from 'types'
import { useStyles } from '../../styles'
import { normalizeDate } from 'utils'

interface ITabHistoryPropa {
  history: Array<IBidsHistory & { userData: UserDataTypes }>
}

export default function TabHistory(props: ITabHistoryPropa) {
  const { history } = props
  const [showMore, setShowMore] = useState<boolean>(false)
  const classes = useStyles()

  const historyReverse = history.slice().reverse()
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const { user } = useSelector(selectUser())
  const {
    assetDetails: { marketData, tokenData },
  } = useSelector(selectAssetDetails())

  const tokenInfo = exchangeRates ? exchangeRates.find((tR) => tR.id === '0x') : null
  const tokenRate = tokenInfo ? tokenInfo?.rateUsd || 0 : 0

  const getBidAmountToTokenAndUsd = (bid_amount: string) => {
    const bidAmountToToken = new BigNumber(bid_amount).dividedBy(`10e${18 - 1}`).toNumber()
    const bidAmountUsd = new BigNumber(bidAmountToToken).multipliedBy(tokenRate).toNumber().toFixed(2)
    return { bidAmountToToken, bidAmountUsd }
  }

  const expireDate = marketData ? normalizeDate(marketData.end_time) : normalizeDate(String(new Date().getTime()))

  if (history.length > 4 && !showMore) {
    return (
      <Box className={classes.tabContentScroll}>
        {historyReverse.slice(0, 4).map((props, i) => {
          return (
            <CardHistory
              key={i}
              {...props}
              {...getBidAmountToTokenAndUsd(props.bid_amount)}
              userWalletId={user?.id}
              expireDate={expireDate}
              contract={tokenData?.contract || ''}
            />
          )
        })}
        <Button
          classes={{ root: classes.showMoreBtn }}
          disableRipple
          fullWidth
          onClick={() => setShowMore(true)}
          endIcon={<ArrowDropDownIcon />}
        >
          Show More
        </Button>
      </Box>
    )
  }

  return (
    <Box className={classes.tabContentScroll}>
      {historyReverse.map((props, i) => {
        return (
          <CardHistory
            key={i}
            {...props}
            {...getBidAmountToTokenAndUsd(props.bid_amount)}
            userWalletId={user?.id}
            expireDate={expireDate}
            contract={tokenData?.contract || ''}
          />
        )
      })}
    </Box>
  )
}
