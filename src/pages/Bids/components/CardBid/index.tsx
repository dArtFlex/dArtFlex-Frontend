import React, { useState } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { Card, Box, Typography, Button } from '@material-ui/core'
import { Image, AvatarUser, Timer } from 'common'
import { ExclamationCircleIcon } from 'common/icons'
import { ICardBidProps, IBidsProps } from './types'
import { useStyles } from './styles'
import routes from '../../../../routes'
import { normalizeDate, shortCutName } from 'utils'
import { useDispatch } from 'react-redux'
import { cancelOfferRequest } from '../../../../stores/reducers/makeOffer'
import { cancelBidRequest, claimBidRequest } from '../../../../stores/reducers/placeBid'

export default function CardBid(props: ICardBidProps) {
  const { bid } = props
  const { image, creator, name, endDate, currentBid, currentBidUsd, yourBid, yourBidUsd, status, itemId } = bid
  const classes = useStyles()
  const history = useHistory()

  const nowTime = new Date().getTime()
  const timeExpired = nowTime > normalizeDate(endDate).getTime()

  return (
    <Card classes={{ root: classes.cardBid }}>
      <Box className={classes.cardBidImage} onClick={() => history.push(`${routes.artworks}/${itemId}`)}>
        <Image src={image} className={classes.image} />
      </Box>
      <Box className={classes.cardBidInfo}>
        <Box>
          <AvatarUser image={creator.avatar} name={creator.name} fontSize={14} />
          <Typography variant={'h4'} noWrap>
            {shortCutName(name)}
          </Typography>
        </Box>
        {!timeExpired ? <Timer endDate={normalizeDate(endDate).getTime()} className={classes.timer} /> : null}
      </Box>
      <Box className={classes.cardBidBids}>
        {bid.status !== 'offered' && bid.status !== 'claiming' && (
          <Bids title="Current Bid" bidAmount={currentBid} bidAmountUsd={currentBidUsd} />
        )}

        <Bids
          title={bid.status === 'offered' ? 'Your Offer' : 'Your Bid'}
          bidAmount={yourBid}
          bidAmountUsd={yourBidUsd}
        />
      </Box>
      <CardInfoBox
        status={status}
        timeExpired={timeExpired}
        itemId={itemId}
        id={bid.id}
        buyerId={bid.user_id}
        market_id={bid.market_id}
        assetOwnerId={bid.assetOwnerId}
      />
    </Card>
  )
}

function Bids(props: IBidsProps) {
  const { title, bidAmount, bidAmountUsd } = props
  const classes = useStyles()
  return (
    <Box className={classes.bids}>
      <Typography variant={'body1'} color={'textSecondary'} noWrap>
        {title}
      </Typography>
      <Typography className={classes.bidsAmount} noWrap>{`${bidAmount} WETH`}</Typography>
      <Typography>{`$${bidAmountUsd}`}</Typography>
    </Box>
  )
}

function CardInfoBox(props: ICardInfoBox) {
  const classes = useStyles()
  const { status, timeExpired, itemId, id, market_id, assetOwnerId, buyerId } = props
  const history = useHistory()
  const dispatch = useDispatch()
  const [isButtonShown, setButtonShown] = useState(true)

  const handleCancelOffer = ({ id }: { id: number }) => {
    setButtonShown(false)
    dispatch(cancelOfferRequest({ id: id }))
  }

  const handleCancelBid = ({ id }: { id: number }) => {
    setButtonShown(false)
    dispatch(cancelBidRequest({ bid_id: id }))
  }

  const handleClaimBid = ({ id }: { id: number }) => {
    setButtonShown(false)
    dispatch(
      claimBidRequest({
        item_id: itemId,
        market_id,
        bid_id: String(id),
        assetOwnerId,
        buyerId,
      })
    )
  }

  switch (status) {
    case 'offered':
      return (
        <Box className={classes.cardBidAction}>
          {isButtonShown && (
            <Button
              onClick={() => handleCancelOffer({ id: id })}
              className={clsx(classes.btnAction, classes.btnCancel)}
              variant={'outlined'}
              fullWidth
            >
              Cancel offer
            </Button>
          )}
        </Box>
      )
    case 'bid':
      return (
        <Box className={classes.cardBidAction}>
          {isButtonShown && (
            <Button
              className={clsx(classes.btnAction, classes.btnCancel)}
              variant={'outlined'}
              fullWidth
              onClick={() => handleCancelBid({ id: id })}
            >
              Cancel bid
            </Button>
          )}
        </Box>
      )
    case 'outbid':
      return (
        <Box className={classes.cardBidAction}>
          <Box className={classes.informerHead}>
            <ExclamationCircleIcon />
            <Typography variant={'body1'} noWrap>
              Your bet is outbid
            </Typography>
          </Box>
          <Button
            onClick={() => history.push(routes.artworkDetails.replace(':id', String(itemId)))}
            disabled={timeExpired}
            className={clsx(classes.btnAction, classes.btnPlaceBid)}
            variant={'contained'}
          >
            Place a Bid
          </Button>
        </Box>
      )
    case 'claiming':
      return (
        <Box className={classes.cardBidAction}>
          {isButtonShown && (
            <Button
              className={clsx(classes.btnAction, classes.btnAccept)}
              variant={'outlined'}
              fullWidth
              onClick={() => handleClaimBid({ id: id })}
            >
              Claim NFT
            </Button>
          )}
        </Box>
      )
    default:
      return null
  }
}

export interface ICardInfoBox {
  id: number
  status: ICardBidProps['bid']['status']
  timeExpired: boolean
  itemId: ICardBidProps['bid']['itemId']
  market_id: string
  assetOwnerId?: string
  buyerId?: string
}
