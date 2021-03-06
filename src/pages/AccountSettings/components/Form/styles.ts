import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%',
      '& h1': {
        fontSize: 38,
        fontWeight: 'bold',
        lineHeight: '125%',
        marginBottom: theme.spacing(8),
        [theme.breakpoints.down(480)]: {
          textAlign: 'center',
        },
      },
      '& h3': {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: '125%',
        marginBottom: theme.spacing(8),
        [theme.breakpoints.down(480)]: {
          textAlign: 'center',
        },
      },
      '& input::placeholder': {
        fontWeight: 700,
        color: theme.palette.greyMid,
      },
    },
    section: {
      margin: theme.spacing(0, 0, 10),
    },
    verification: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      '& svg': {
        marginLeft: theme.spacing(3),
      },
    },
    verifyBtn: {
      margin: theme.spacing(6, 0, 2),
      border: `2px solid ${theme.palette.text.primary}`,
      '& svg': {
        fill: theme.palette.text.primary,
      },
    },
    socialsIcon: {
      color: theme.palette.greyDark,
    },
    btnSubmit: {
      background: theme.palette.primary.main,
      color: theme.palette.white,
      '&:hover': {
        background: theme.palette.primary.main,
      },
      '&:disabled': {
        color: theme.palette.white,
        background: theme.palette.greyMid,
      },
    },
    successTextHelper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: theme.palette.green,
      gap: theme.spacing(1.5),
    },
    helperText: {
      fontSize: 12,
    },
    errorTextHelper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: theme.palette.redMiddle,
      gap: theme.spacing(1.5),
    },
    formField: {
      backgroundColor: theme.palette.background.default,
    },
    successIcon: {
      fill: theme.palette.green,
    },
    checkbox: {
      background: 'transparent',
      margin: 0,
      '& .MuiFormControlLabel-label': {
        fontSize: 16,
        fontWeight: 400,
      },
    },
    collapseHead: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      '& > h3': {
        marginBottom: theme.spacing(0),
      },
    },
    collapseContainer: {
      marginTop: theme.spacing(8),
    },
  })
)
