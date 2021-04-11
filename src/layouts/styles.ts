import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '600px',
      color: theme.palette.text.primary,
      height: '100vh',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
  })
)
