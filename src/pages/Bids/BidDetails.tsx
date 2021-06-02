import React from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAsset } from 'stores/selectors'
import { Box } from '@material-ui/core'
import { PageWrapper, CardAsset } from 'common'
import { InfoBid } from './components'
import { useStyles } from './styles'
import routes from '../../routes'

export default function BidDetails() {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const { asset } = useSelector(selectAsset(id))

  if (!asset) {
    history.push(routes.artworks)
    return null
  }

  return (
    <PageWrapper>
      <Box className={classes.bidContainer}>
        <Box className={classes.outerContainer}>
          <Box className={classes.previewContainer}>
            <CardAsset asset={asset} />
          </Box>
        </Box>
        <Box className={classes.bidInfoBox}>
          <InfoBid />
        </Box>
      </Box>
    </PageWrapper>
  )
}