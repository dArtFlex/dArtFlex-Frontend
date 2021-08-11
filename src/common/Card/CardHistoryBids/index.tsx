import React from 'react'
import moment from 'moment'
import { Card, CardHeader, CardContent, Avatar, Typography, Box, Link, Divider, Button } from '@material-ui/core'
import { SuccessIcon } from 'common/icons'
import { useStyles } from './styles'
import { ICardHistoryBidsProps, ICardContainerProps } from './types'

export default function CardHistoryBids(props: ICardHistoryBidsProps) {
  const {
    id,
    order_id,
    market_id,
    user_id,
    status,
    updated_at,
    userWalletId,
    bidAmountToToken,
    bidAmountUsd,
    userData,
    onCancel,
    onAccept,
  } = props
  const classes = useStyles()

  const updatedDate = moment(updated_at).format('D MMMM YYYY') + ' at ' + moment(updated_at).format('HH:mm')

  switch (status) {
    case 'pending':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={null}
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>
                Bid <strong>{`${bidAmountToToken} ETH`}</strong> (${bidAmountUsd}) placed
              </Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {+user_id === userWalletId ? 'you' : `@${userData?.userid || ''}`}
              </Link>
            </Box>
          }
        >
          <CardContent classes={{ root: classes.footer }}>
            <Divider />
            <Box className={classes.footerBox}>
              <Typography className={classes.footerText}>Exp. Date: {''}</Typography>
              {onCancel && (
                <Button
                  classes={{ root: classes.cardBtn }}
                  disableRipple
                  onClick={() => onCancel({ id: Number(id), order_id, user_id, market_id })}
                >
                  Cancel Bid
                </Button>
              )}
              {onAccept && (
                <Button
                  classes={{ root: classes.cardAcceptBtn }}
                  disableRipple
                  onClick={onAccept}
                  startIcon={<SuccessIcon className={classes.cardAcceptBtnIcon} />}
                >
                  Accept Offer
                </Button>
              )}
            </Box>
          </CardContent>
        </CardContainer>
      )
    case 'canceled':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={null}
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>
                <span className={classes.strike}>
                  Bid <strong>{`${bidAmountToToken} ETH`}</strong> (${bidAmountUsd})
                </span>{' '}
                canceled
              </Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {+user_id === userWalletId ? 'you' : `@${userData?.userid || ''}`}
              </Link>
            </Box>
          }
        />
      )
    case 'purchased':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={null}
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>Artwork owned</Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {+user_id === userWalletId ? 'you' : `@${userData?.userid || ''}`}
              </Link>
            </Box>
          }
        />
      )
    default:
      return null
  }
}

const CardContainer = (props: ICardContainerProps) => {
  const { children, ...rest } = props
  const classes = useStyles()

  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader
        classes={{
          root: classes.header,
          action: classes.action,
          title: classes.title,
          subheader: classes.subheader,
        }}
        {...rest}
      />
      {children}
    </Card>
  )
}