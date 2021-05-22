import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { PlusHugeIcon } from 'common/icons'
import { useStyles } from './styles'

export default function CardUploadNew() {
  const classes = useStyles()
  return (
    <Card elevation={1} className={classes.cardUpload}>
      <PlusHugeIcon />
      <Typography className={classes.text}>Upload a new Artwork</Typography>
    </Card>
  )
}
