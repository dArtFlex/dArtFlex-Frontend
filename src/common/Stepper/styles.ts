import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: 'transparent',
      padding: theme.spacing(6, 0),
      width: 690,
      margin: '0 auto',
      [theme.breakpoints.down(768)]: {
        width: 460,
      },
      [theme.breakpoints.down(520)]: {
        width: 'unset',
      },
      [theme.breakpoints.down(360)]: {
        padding: theme.spacing(6, 0),
      },
      '& .MuiStepLabel-horizontal': {
        flexDirection: 'column',
        textAlign: 'center',
        gap: theme.spacing(2),
      },
    },
    root: {
      color: theme.palette.greyMid,
      display: 'flex',
      height: 22,
      alignItems: 'center',
      zIndex: 1,
    },
    active: {
      color: theme.palette.violet,
    },
    circle: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: theme.palette.violet,
      fontSize: 18,
      background: theme.palette.background.default,
    },
    step: {
      [theme.breakpoints.down(321)]: {
        paddingLeft: 0,
      },
    },
    textBold: {
      fontWeight: 600,
    },
  })
)
