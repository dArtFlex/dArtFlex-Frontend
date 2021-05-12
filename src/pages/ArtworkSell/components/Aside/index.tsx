import React, { useState } from 'react'
import clsx from 'clsx'
import { Box, Typography, Card, Button, Divider, Link } from '@material-ui/core'
import { EditIcon, ArrowRightIcon } from 'common/icons'
import Slider from '../Slider'
import { IAsideProps } from './types'
import { useStyles } from './styles'

export default function Aside(props: IAsideProps) {
  const classes = useStyles()
  const [showSlider, setShowSlider] = useState<boolean>(false)

  return (
    <Box>
      <Typography className={classes.asideTitle}>Summary</Typography>
      <Card className={classes.card}>
        <Typography className={classes.sectionTitle}>Bounties</Typography>

        {showSlider ? (
          <>
            <Box className={classes.flexColumn} pb={3}>
              <Typography className={classes.mainText}>Refferal Bounty</Typography>
              <Typography className={classes.mainText}>
                <b>1</b>
              </Typography>
            </Box>
            <Slider />
            <Box pb={1}>
              <Typography className={classes.mainText} color={'textSecondary'}>
                You can increase your bounty from the 1% default up to the dArtflex fee (2.5%). dArtflex rewards this
                amount to registered affiliates who refer your buyer.
              </Typography>
              <Link href={'#'} underline={'none'} className={classes.link}>
                Learn more
              </Link>
            </Box>
          </>
        ) : (
          <>
            <Box className={classes.flexColumn} pb={3}>
              <Typography className={classes.mainText}>Refferal Bounty</Typography>
              <Button variant={'text'} color={'primary'} startIcon={<EditIcon />} onClick={() => setShowSlider(true)}>
                Edit
              </Button>
            </Box>
            <Typography className={classes.mainText} color={'textSecondary'}>
              dArtflex rewards 1% to registered affiliates who refer your buyer.
            </Typography>
          </>
        )}

        <Divider className={classes.divider} />
        <Typography className={classes.sectionTitle}>Fees</Typography>
        <Box pb={1}>
          <Typography className={classes.mainText} color={'textSecondary'}>
            Listing is free! At the time of the sale, the following fees will be deducted.
          </Typography>
          <Link href={'#'} underline={'none'} className={classes.link}>
            Learn more
          </Link>
        </Box>
        <Box className={classes.flexColumn} pt={3}>
          <Typography className={classes.mainText}>To dArtflex</Typography>
          <Typography className={classes.mainText}>2,5%</Typography>
        </Box>
        <Box className={classes.flexColumn} pt={3}>
          <Typography className={classes.mainText}>
            <b>Total</b>
          </Typography>
          <Typography className={classes.mainText}>
            <b>2,5%</b>
          </Typography>
        </Box>

        <Divider className={classes.divider} />
        <Typography className={classes.sectionTitle}>Listing</Typography>
        <Box pb={5}>
          <Typography className={classes.textListing}>Your item will be listed for 0.01 ETH</Typography>
        </Box>
        <Button variant={'contained'} color={'primary'} endIcon={<ArrowRightIcon />} fullWidth>
          Post Your Listing
        </Button>
      </Card>
    </Box>
  )
}
