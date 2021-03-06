import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 10, 20),
      [theme.breakpoints.down(681)]: {
        padding: theme.spacing(4),
      },
      flex: '1 1 auto',
    },
  })
)
