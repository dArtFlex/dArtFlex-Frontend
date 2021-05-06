import React from 'react'
import clsx from 'clsx'
import { Box, Grid, Button, Divider } from '@material-ui/core'
import Popover from '../Popover'
import { IPopoverLinksProps, IButtonLink } from './types'
import { useStyles } from './styles'

export default function PopoverLinks(props: IPopoverLinksProps) {
  const classes = useStyles()
  const { anchor, setAnchor, links, subLinks = [] } = props

  const ButtonLink = (props: IButtonLink) => {
    const { onClick, lable, icon = null, subLinks } = props
    return (
      <Button
        key={lable}
        onClick={onClick}
        variant={'text'}
        disableElevation
        className={clsx(classes.btnTitle, subLinks && classes.btnSubTitle)}
        startIcon={icon}
      >
        {lable}
      </Button>
    )
  }

  return (
    <Popover anchorEl={anchor} onClose={() => setAnchor(null)}>
      <Box className={classes.externalLinkMenu}>
        <Grid container direction="column">
          {links.map((props, i) => (
            <ButtonLink key={i} {...props} />
          ))}
        </Grid>
        <Divider />
        <Grid container direction="column">
          {subLinks.map((props, i) => (
            <ButtonLink key={i} {...props} subLinks />
          ))}
        </Grid>
      </Box>
    </Popover>
  )
}
