import React, { useRef, useState } from 'react'
import { IPromotion } from '../types'
import { Box, Button, IconButton, Typography } from '@material-ui/core'
import { useStyles } from '../styles'
import { Timer } from 'common'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core'
import { normalizeDate, shortCutName } from 'utils'
import clsx from 'clsx'
import routes from '../../../routes'
import { ArrowLeftIcon, ArrowRightIcon } from 'common/icons'
import { useHistory } from 'react-router-dom'
import { useTokenInfo } from 'hooks'
import image from 'common/icons/cover_photo.png'
import appConst from 'config/consts'

const {
  TYPES: { AUCTION },
} = appConst

export default function Promotions(props: IPromotion) {
  const classes = useStyles()
  SwiperCore.use([Pagination, Navigation, Autoplay])
  const prevSlideRef = useRef<HTMLDivElement>(null)
  const nextSlideRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(1)
  const history = useHistory()

  return (
    <React.Fragment>
      <Swiper
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: nextSlideRef.current,
          prevEl: prevSlideRef.current,
        }}
        loop={props.artworks.length > 1}
        className={classes.sliderNext}
        onSlideChange={(slide) => setCurrentSlide(slide.realIndex + 1)}
      >
        {props.artworks.map((item, index) => {
          const nowTime = new Date().getTime()
          const timeExpired = nowTime > normalizeDate(`${item.endDate}`).getTime()
          return (
            <SwiperSlide key={index} tabIndex={index} style={{ outline: 'none' }}>
              <Box className={classes.promotionBox}>
                <Box className={classes.promotionPhoto}>
                  <img src={item.url} />
                </Box>
                <Box className={classes.promotionInfoWrapper}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <div
                      style={{
                        backgroundImage: `url(${
                          item.author.profilePhoto === 'blank' ? image : item.author.profilePhoto
                        })`,
                      }}
                      className={classes.promotionAuthorAva}
                    />
                    <Typography variant={'h4'}>@{shortCutName(item.author.name)}</Typography>
                  </Box>
                  <Typography variant={'h2'} className={classes.promotionCardName}>
                    {item.name}
                  </Typography>
                  <Box className={classes.promotionInfo} mt={6}>
                    <Box flexDirection="row" className={classes.promotionInfoBox}>
                      <Typography variant={'body1'} className={classes.promotionTextSecondary}>
                        {item.type === AUCTION ? 'Current Bid' : 'Current price'}
                      </Typography>
                      <div className={clsx(classes.promotionInfoText, classes.promotionInfoBoxPrice)}>
                        {`${item.bid} `}
                        <TokenInfo tokenContractAddress={item.tokenContractAddress} contract={item.contract} />
                      </div>
                    </Box>
                    <Box flexDirection="row" className={classes.promotionInfoBox}>
                      <Typography variant={'body1'} className={classes.promotionTextSecondary}>
                        Auction Ends In
                      </Typography>
                      {!timeExpired ? (
                        <Timer
                          endDate={normalizeDate(`${item.endDate}`).getTime()}
                          className={clsx(classes.promotionInfoText, classes.promotionTimer)}
                        />
                      ) : null}
                    </Box>
                  </Box>
                  <Box className={classes.promotionButtons}>
                    <Button
                      variant={'contained'}
                      disableElevation
                      classes={{ root: classes.promotionButtonContained }}
                      onClick={() => history.push(`${routes.artworks}/${item.id}`, 'auction')}
                    >
                      {item.type === AUCTION ? 'Place a Bid' : 'Buy Now'}
                    </Button>
                    <Button
                      variant="outlined"
                      classes={{ root: classes.promotionButtonWhite }}
                      onClick={() => history.push(`${routes.artworks}/${item.id}`)}
                    >
                      View Artwork
                    </Button>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {props.artworks.length > 1 && (
        <Box className={classes.paginationWrapper}>
          <div ref={prevSlideRef}>
            <IconButton className={classes.leftArrow}>
              <ArrowLeftIcon />
            </IconButton>
          </div>
          <Box>
            <Typography variant={'h4'}>
              {currentSlide}/{props.artworks.length}
            </Typography>
          </Box>
          <div ref={nextSlideRef}>
            <IconButton className={classes.rightArrow}>
              <ArrowRightIcon />
            </IconButton>
          </div>
        </Box>
      )}
    </React.Fragment>
  )
}

function TokenInfo({ tokenContractAddress, contract }: { tokenContractAddress: string; contract: string }) {
  const tokenInfo = useTokenInfo(tokenContractAddress, contract)
  return (
    <Typography component={'span'} variant={'h3'} style={{ fontSize: 24, lineHeight: 'initial' }}>
      {tokenInfo?.symbol}
    </Typography>
  )
}
