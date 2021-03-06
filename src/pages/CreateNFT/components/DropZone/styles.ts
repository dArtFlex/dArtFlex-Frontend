import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    container: {
      display: 'grid',
      position: 'relative',
      gridTemplateColumns: 'minmax(min-content, 670px) 1fr',
      gridTemplateRows: 'minmax(min-content, 375px)',
      justifyContent: 'center',
      background: theme.palette.background.paper,
      border: `1px dashed ${theme.palette.text.primary}`,
      borderRadius: theme.spacing(3),
      cursor: 'pointer',
      [theme.breakpoints.down(768)]: {
        gridTemplateColumns: 'minmax(min-content, 445px) 1fr',
        gridTemplateRows: 'minmax(min-content, 250px)',
      },
    },
    titleText: {
      fontSize: 18,
      fontWeight: 700,
    },
    mainText: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.palette.text.secondary,
    },
    footer: {
      position: 'absolute',
      bottom: theme.spacing(8),
    },
  })
)
