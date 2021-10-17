import React from 'react'
import BigNumber from 'bignumber.js'
import clsx from 'clsx'
import { Box, Button, Typography, ButtonBase } from '@material-ui/core'
import { TimeIcon, BurnIcon } from 'common/icons'
import { CustomTooltip } from 'common'
import appConst from 'config/consts'
import { useDefaultCardStatus } from './lib'
import { ICardActionsProps } from './types'
import { useStyles } from './styles'
import { normalizeDate } from 'utils'
import routes from '../../../routes'
import { useHistory } from 'react-router-dom'
import CardActionButton from './CardActionButton'
import { useTokenInfo } from 'hooks'

const {
  FILTER_VALUES: { MINTED, LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, COLLECTED, CREATED, SOLD, LISTED },
} = appConst

export default function CardActions(props: ICardActionsProps) {
  const classes = useStyles()
  const {
    userWallet,
    ownerWallet,
    endPrice,
    startPrice,
    currentPrice,
    sold,
    endTime = '0',
    burnTime = 0,
    timer,
    type,
    status,
    useCardStatus = useDefaultCardStatus,
    button,
    emptyBottom,
    sales_token_contract,
  } = props

  const cardStatus = useCardStatus({ type, status, endPrice, startPrice, sold, endTime })
  const history = useHistory()

  const startPriceToCoin = startPrice ? new BigNumber(startPrice).dividedBy(`10e${18 - 1}`).toNumber() : startPrice
  const currentBitToCoin = currentPrice
    ? new BigNumber(currentPrice).dividedBy(`10e${18 - 1}`).toNumber()
    : currentPrice

  const now_time = new Date().getTime()
  const expire_time = normalizeDate(endTime).getTime() < burnTime

  const token = useTokenInfo(sales_token_contract)
  const tokenName = token?.symbol || ''

  const tooltipProps = { background: '#141717', shiftY: -60 }

  switch (cardStatus) {
    case MINTED:
      return (
        <>
          {history.location.pathname === routes.artworks ? (
            <Box className={classes.cardAction}>
              <Section text={'Reserve Price'} value={'-'} />
            </Box>
          ) : (
            <>
              {emptyBottom ? (
                <Box className={classes.mintedBottom} />
              ) : (
                <Box className={classes.actionBtnBox}>
                  {userWallet === ownerWallet ? (
                    history.location.pathname === routes.sales ? (
                      <CardActionButton acceptOffer={button?.acceptOffer} />
                    ) : (
                      <Button onClick={button?.onListed} variant={'contained'} fullWidth className={classes.listBtn}>
                        List
                      </Button>
                    )
                  ) : (
                    <Button onClick={button?.onListed} variant={'contained'} fullWidth className={classes.listBtn}>
                      Make offer
                    </Button>
                  )}
                </Box>
              )}
            </>
          )}
        </>
      )
    case LIVE_AUCTION:
      const bidPrice = parseFloat(currentPrice as string) ? currentBitToCoin : startPriceToCoin
      return (
        <>
          {history.location.pathname === routes.sales ? (
            <Box className={classes.actionBtnBox}>
              <CardActionButton acceptBid={button?.acceptBid} />
            </Box>
          ) : (
            <Box className={classes.cardAction}>
              <Section
                text={currentBitToCoin ? 'Current Bid' : 'Reserve Price'}
                value={
                  now_time < normalizeDate(endTime).getTime() ? (
                    <CustomTooltip text={`${bidPrice} ${tokenName}`} {...tooltipProps}>{`${
                      bidPrice && Number(bidPrice).toFixed(4)
                    } ${tokenName}`}</CustomTooltip>
                  ) : (
                    '-'
                  )
                }
              />
              {now_time < normalizeDate(endTime).getTime() ? (
                <Box className={classes.timerWrapper}>
                  <ButtonBase className={clsx(classes.actionBtn, expire_time && classes.actionBtnBurn)}>
                    {expire_time ? (
                      <BurnIcon className={classes.actionBtnIcon} />
                    ) : (
                      <TimeIcon className={classes.actionBtnIcon} />
                    )}
                    {timer}
                  </ButtonBase>
                </Box>
              ) : null}
            </Box>
          )}
        </>
      )
    case BUY_NOW:
      return (
        <Box className={classes.cardAction}>
          <Section
            text={'Buy Now'}
            value={
              <CustomTooltip text={`${startPriceToCoin} ${tokenName}`} {...tooltipProps}>{`${Number(
                startPriceToCoin
              ).toFixed(4)} ${tokenName}`}</CustomTooltip>
            }
          />
        </Box>
      )
    case RESERVE_NOT_MET:
      return (
        <Box className={classes.cardAction}>
          <Section
            text={'Reserve Price'}
            value={
              startPriceToCoin ? (
                <CustomTooltip text={`${startPriceToCoin} ${tokenName}`} {...tooltipProps}>{`${Number(
                  startPriceToCoin
                ).toFixed(4)} ${tokenName}`}</CustomTooltip>
              ) : (
                '-'
              )
            }
          />
        </Box>
      )
    case SOLD:
      const soldPrice = currentBitToCoin || startPriceToCoin
      return (
        <>
          {history.location.pathname === routes.sales ? (
            <Box className={classes.actionBtnBox}>
              <CardActionButton acceptOffer={button?.acceptOffer} />
            </Box>
          ) : (
            <Box className={clsx(classes.cardAction, classes.cardActionSold)}>
              <Section
                text={'Sold for'}
                value={
                  <CustomTooltip text={`${soldPrice} ${tokenName}`} {...tooltipProps}>{`${Number(soldPrice).toFixed(
                    4
                  )} ${tokenName}`}</CustomTooltip>
                }
              />
            </Box>
          )}
        </>
      )
    case COLLECTED:
      return (
        <Box className={clsx(classes.actionBtnBox, classes.collectedBoxBtn)}>
          <Button variant={'outlined'} className={classes.collectedBtn} onClick={button?.onSell}>
            Sell
          </Button>
          <Button variant={'outlined'} className={classes.collectedBtn}>
            View Artwork
          </Button>
        </Box>
      )
    case CREATED:
      return (
        <Box className={clsx(classes.cardAction, classes.cardActionNotMet)}>
          <Section
            text={'Reserve Not Met'}
            value={
              <CustomTooltip text={`${startPriceToCoin} ${tokenName}`} {...tooltipProps}>{`${Number(
                startPriceToCoin
              ).toFixed(4)} ${tokenName}`}</CustomTooltip>
            }
          />
        </Box>
      )
    case LISTED: {
      return (
        <Box className={classes.cardAction}>
          <Section
            text={'Reserve Price'}
            value={
              startPriceToCoin ? (
                <CustomTooltip text={`${startPriceToCoin} ${tokenName}`} {...tooltipProps}>{`${Number(
                  startPriceToCoin
                ).toFixed(4)} ${tokenName}`}</CustomTooltip>
              ) : (
                '-'
              )
            }
          />
        </Box>
      )
    }
    default:
      return null
  }
}

const Section = ({ text, value }: { text: string; value: JSX.Element | string }) => (
  <Box>
    <Typography component={'span'}>{text}</Typography>
    <Typography color={'inherit'} variant={'h4'}>
      {value}
    </Typography>
  </Box>
)
