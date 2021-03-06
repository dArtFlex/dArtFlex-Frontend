import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    auxiliaryWrapper: {
      margin: 'auto',
      maxWidth: 900,
      padding: theme.spacing(14, 0, 20),
      [theme.breakpoints.down(1024)]: {
        padding: theme.spacing(14, 4),
      },
    },
    textBlock: {
      margin: theme.spacing(8, 0),
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 700,
      margin: theme.spacing(6, 0),
    },
    wrapSection: {
      wordBreak: 'break-word',
    },
    sectionList: {
      paddingLeft: theme.spacing(4),
    },
    unorderedList: {
      listStyleType: 'initial',
      paddingLeft: 0,
    },
    unorderedListInitial: {
      listStyleType: 'initial',
      paddingLeft: theme.spacing(4),
    },
    unorderedListItem: {
      marginTop: theme.spacing(3),
    },
    navLink: {
      textDecoration: 'unset',
      color: theme.palette.lightViolet,
      '&:hover': {
        textDecoration: 'unset',
      },
    },
    textBlockTight: {
      margin: theme.spacing(2, 0, 4, 0),
    },
    textBlockMargin24: {
      marginTop: theme.spacing(6),
    },
    dashedList: {
      listStyleType: 'none',
      paddingLeft: 0,
    },
  })
)
