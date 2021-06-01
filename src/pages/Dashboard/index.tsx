import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { CircularProgressLoader, PageWrapper, CardAsset, CardUploadNew } from 'common'
import { InstagramOutlinedIcon, TwitterIcon, YouTubeIcon } from 'common/icons'
import { selectAssets } from 'stores/selectors'
import ProfileLayout from 'layouts/ProfileLayout'
import { Aside, ValuesInfo, Empty } from './components'
import appConst from 'config/consts'
import { useStyles } from './styles'

const {
  FILTER_VALUES: { IN_AUCTION, CREATED, COLLECTED, SOLD },
} = appConst

const filterItems = [
  {
    label: 'In Wallet',
    value: IN_AUCTION,
  },
  {
    label: 'Created',
    value: CREATED,
  },
  {
    label: 'Collected',
    value: COLLECTED,
  },
  {
    label: 'Sold',
    value: SOLD,
  },
]

export default function Dashboard() {
  const classes = useStyles()
  const [filter, setFilter] = useState(IN_AUCTION)
  const { assets, fetching } = useSelector(selectAssets())

  const links = [
    {
      link: 'instagram.com/tianadias',
      icon: <InstagramOutlinedIcon className={classes.linkIcon} />,
      href: '#',
    },
    {
      link: 'twitter.com/tianadias',
      icon: <TwitterIcon className={classes.linkIcon} />,
      href: '#',
    },
    {
      link: 'youtube.com/user/tianadias',
      icon: <YouTubeIcon className={classes.linkIcon} />,
      href: '#',
    },
  ]

  return (
    <PageWrapper className={classes.wrapper}>
      <ProfileLayout
        coverURL={'https://picsum.photos/1500/500'}
        aside={
          <Aside
            avatar={'https://picsum.photos/200/300'}
            name={'Tiana Dias'}
            userName={'tianadias'}
            walletAddress={'0x683a67...11d1e1334'}
            content={
              'Tiana is the Co-founder and Creative Director at Toast. She is a 3D artist that specializes in creating content.'
            }
            links={links}
            joinedToArtworks={'Joined April, 2021'}
          />
        }
      >
        <Box className={classes.container}>
          <ToggleButtonGroup
            classes={{ root: classes.toggleGroup }}
            exclusive
            onChange={(_, value) => {
              if (value) setFilter(value)
            }}
          >
            {filterItems.map(({ label, value }) => {
              return (
                <ToggleButton key={value} value={value} selected={filter === value}>
                  {label}
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>

          {filter === SOLD && (
            <Box className={classes.container}>
              <Box className={classes.inlineFlex}>
                <ValuesInfo />
              </Box>
            </Box>
          )}

          <Box className={classes.grid} mt={2}>
            {fetching ? (
              <CircularProgressLoader />
            ) : (
              <>
                {filter === CREATED && <CardUploadNew />}
                {assets
                  ?.filter((el) => {
                    if (filter === IN_AUCTION) {
                      return true
                    }
                    return el._status === filter
                  })
                  .map((asset, i) => (
                    <CardAsset
                      key={i}
                      asset={asset}
                      withLabel
                      withAction={Boolean(asset._currentBit || asset._priceReserve)}
                    />
                  ))}
                {!assets?.length && <Empty />}
              </>
            )}
          </Box>
        </Box>
      </ProfileLayout>
    </PageWrapper>
  )
}