import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    informerBox: {
      padding: theme.spacing(5, 7),
      background: theme.palette.success.main,
      borderRadius: theme.spacing(3),
      width: 310,
      // marginRight: theme.spacing(6),
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(4, 6),
        width: 250,
      },
      [theme.breakpoints.down(380)]: {
        width: 280,
      },
      [theme.breakpoints.down(330)]: {
        width: 250,
      },
      [theme.breakpoints.down(300)]: {
        width: 230,
      },
    },
    informerHead: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: theme.spacing(3),
      gap: 9,
      '& svg': {
        height: 22,
        width: 22,
      },
    },
    informerTitle: {
      textAlign: 'center',
    },
  })
)
