import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hashTagBtn: {
      minWidth: 'auto',
      padding: '6px 12px',
      color: theme.palette.greyDark,
      border: `1px solid ${theme.palette.greyMid}`,
      '&+&': {
        marginLeft: '8px',
      },
    },
    hashTagBtnActive: {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: '#8566FF1A',
      color: theme.palette.primary.main,
    },
    btnAction: {
      border: `1px solid ${theme.palette.greyLight}`,
      marginLeft: theme.spacing(2),
      color: theme.palette.text.primary,
    },
  })
)
