import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import routes from 'routes'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Button,
  ButtonBase,
  IconButton,
  Badge,
  Avatar,
  useMediaQuery,
} from '@material-ui/core'
import { Modal, WalletConnect, Chip } from 'common'
import { closeWarningModal } from 'stores/reducers/wallet'
import { selectWallet, selectUser } from 'stores/selectors'
import SearchField from './SearchField'
import CreateActionMenu from './CreateActionMenu'
import ProfileActionMenu from './ProfileActionMenu'
import NotificationActionMenu from './NotificationActionMenu'
import { CurrentDownIcon, LogoIcon, CoolIcon, SmileyFaceIcon, BellIcon, SearchIcon, BurgerMenuIcon } from 'common/icons'
import { HeaderType } from './types'
import { useStyles } from './styles'

export default function Header({ toggleTheme }: HeaderType) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { wallet } = useSelector(selectWallet())
  const { user } = useSelector(selectUser())

  const bids: Array<string> = []

  const [anchorElCreateLink, setAnchorElCreateLink] = useState<null | HTMLElement>(null)
  const [anchorElProfileLink, setAnchorElProfileLink] = useState<null | HTMLElement>(null)
  const [anchorElNotification, setAnchorElNotification] = useState<null | HTMLElement>(null)
  const [isSearchFieldOpen, setSearchFieldOpen] = useState(false)

  const [open, setOpen] = useState<boolean>(false)

  const isMobile = useMediaQuery('(max-width: 740px)')

  const MenuItems = [
    {
      title: 'Artworks',
      to: routes.artworks,
    },
    {
      title: 'Blog',
      to: routes.blog,
    },
  ]

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <LogoIcon className={classes.logo} />
          {isMobile ? (
            <Box className={classes.mobileToolBar}>
              <IconButton className={classes.iconButton}>
                <SmileyFaceIcon />
              </IconButton>
              <IconButton className={classes.searchIcon}>
                <SearchIcon />
              </IconButton>
              <IconButton className={classes.searchIcon}>
                <BurgerMenuIcon />
              </IconButton>
            </Box>
          ) : (
            <>
              <Tabs
                aria-label="navigation"
                value={pathname !== routes.blog ? 0 : 1}
                className={classes.navTabsContainer}
                classes={{ indicator: classes.indicator }}
              >
                {MenuItems.map(({ title, to }) => (
                  <Tab key={title} label={title} component={NavLink} to={to} className={classes.navTabs} />
                ))}
              </Tabs>
              <Box className={classes.buttonContainer}>
                {Boolean(bids.length) && (
                  <Chip avatar={`${bids.length}`} endIcon>
                    Bids
                  </Chip>
                )}
                <SearchField />
                <Button
                  onClick={(event: React.SyntheticEvent<EventTarget>) => {
                    const target = event.currentTarget as HTMLElement
                    setAnchorElCreateLink(target)
                  }}
                  variant={'outlined'}
                  disableElevation
                  classes={{ root: classes.createButton }}
                  endIcon={<CurrentDownIcon />}
                >
                  Create
                </Button>
                {wallet === null ? (
                  <Button onClick={() => setOpen(true)} variant={'contained'} color={'primary'} disableElevation>
                    Connect wallet
                  </Button>
                ) : (
                  <>
                    <IconButton
                      aria-label="notification"
                      onClick={(event: React.SyntheticEvent<EventTarget>) => {
                        const target = event.currentTarget as HTMLElement
                        setAnchorElNotification(target)
                      }}
                    >
                      <Badge
                        color={'primary'}
                        variant="dot"
                        invisible={false}
                        className={classes.notification}
                        classes={{ badge: classes.notificationBadge }}
                      >
                        <BellIcon className={classes.notificationIcon} />
                      </Badge>
                    </IconButton>

                    <Button
                      onClick={(event: React.SyntheticEvent<EventTarget>) => {
                        const target = event.currentTarget as HTMLElement
                        setAnchorElProfileLink(target)
                      }}
                      className={classes.buttonWallet}
                      variant={'outlined'}
                      color={'primary'}
                      disableElevation
                      startIcon={
                        user?.profile_image ? (
                          <Avatar src={user.profile_image} className={classes.avatar} />
                        ) : (
                          <SmileyFaceIcon />
                        )
                      }
                      endIcon={<CurrentDownIcon />}
                    >
                      {`${wallet.balance.toFixed(4)} ${wallet.meta.coinAbbr}`}
                    </Button>
                  </>
                )}
                <ButtonBase onClick={toggleTheme}>
                  <CoolIcon />
                </ButtonBase>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Modal
        open={open}
        onClose={() => {
          dispatch(closeWarningModal())
          setOpen(false)
        }}
        body={<WalletConnect onClose={() => setOpen(false)} />}
        withAside
      />
      <CreateActionMenu anchor={anchorElCreateLink} setAnchor={setAnchorElCreateLink} />
      <ProfileActionMenu anchor={anchorElProfileLink} setAnchor={setAnchorElProfileLink} />
      <NotificationActionMenu anchor={anchorElNotification} setAnchor={setAnchorElNotification} />
    </>
  )
}
