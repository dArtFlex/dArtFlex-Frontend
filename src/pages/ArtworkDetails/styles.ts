import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1 1 auto',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr',
      gridGap: theme.spacing(10),
      alignItems: 'start',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 440px',
        gridTemplateRows: 'minmax(100%, auto)',
      },
    },
    showMoreBtn: {
      fontSize: 16,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    tabContentScroll: {
      margin: theme.spacing(3, 0),
      height: 248,
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        margin: theme.spacing(1, 0),
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey['400'],
        borderRadius: 30,
      },
    },
    previewContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.ghostWhite,
      borderRadius: theme.spacing(3),
      minHeight: 680,
      '&>div': {
        maxWidth: 'min-content',
      },
      '&>img': {
        maxWidth: '96%',
        maxHeight: '100%',
        objectFit: 'contain',
      },
    },
    borderdIconButton: {
      border: `1px solid ${theme.palette.greyPale}`,
    },
    expandBtb: {
      position: 'absolute',
      bottom: theme.spacing(6),
      right: theme.spacing(6),
    },
  })
)
