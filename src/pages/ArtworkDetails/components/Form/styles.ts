import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1 1 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 440px',
      gridTemplateRows: 'minmax(100%, auto)',
      gridGap: theme.spacing(10),
      alignItems: 'start',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
      },
    },
    fontFamilyRoboto: {
      fontFamily: ['Roboto Mono', 'Archivo', 'sans-serif'].join(','),
    },
    previewContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.ghostWhite,
      borderRadius: theme.spacing(3),
      minHeight: 680,
      '&>img': {
        maxWidth: '100%',
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
    title: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(5.5),
    },
    titleBtnCotainer: {
      display: 'flex',
      marginLeft: 'auto',
      '&>button+button': {
        marginLeft: theme.spacing(2.5),
      },
    },
    infoRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: theme.spacing(2),
    },
    infoTitle: {
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    priceRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    avatar: {
      display: 'inline-flex',
      marginRight: theme.spacing(2),
    },
    avatarBox: {
      display: 'flex',
      alignItems: 'center',
    },
    bitBtn: {
      padding: theme.spacing(3.5, 5),
      marginBottom: theme.spacing(6),
    },
    bitBtnDisabled: {
      background: theme.palette.greyMid,
      '&.Mui-disabled': {
        color: theme.palette.white,
      },
    },
    bitBtnDisabledText: {
      color: theme.palette.white,
      lineHeight: 1.75,
    },
    tabContant: {
      overflow: 'auto',
    },
    infoRowIcon: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
      '& svg': {
        marginLeft: theme.spacing(1.5),
      },
    },
    externalLinkMenu: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(3),
    },
    externalLinkMenuItem: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    linkTitle: {
      color: theme.palette.text.secondary,
    },
    btnTitle: {
      padding: theme.spacing(3, 8),
      minWidth: 'auto',
      justifyContent: 'flex-start',
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.palette.text.primary,
      borderRadius: 'unset',
    },
    warningBox: {
      padding: theme.spacing(3, 6),
      marginBottom: theme.spacing(4),
      background: theme.palette.yellowLight,
      borderRadius: theme.spacing(2),
    },
    warningText: {
      fontSize: 16,
      fontWeight: 400,
      color: theme.palette.text.primary,
    },
    boldText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.palette.text.primary,
    },
    tokenAmount: {
      fontSize: 30,
      fontWeight: 700,
      color: theme.palette.text.primary,
    },
    tokenAmountUsd: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.secondary,
      textAlign: 'right',
    },
    outerContainer: {
      position: 'sticky',
      top: theme.spacing(4),
    },
    formContainer: {
      minHeight: 680,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    formContant: {
      minWidth: 440,
      display: 'flex',
      alignItems: 'flex-start',
      borderRadius: 12,
      justifyContent: 'space-around',
      backgroundColor: theme.palette.greyPale,
      padding: theme.spacing(6, 8),
      flexDirection: 'column',
    },
    inputAdorment: {
      fontSize: '16px',
      fontWeight: 600,
      color: theme.palette.greyMid,
    },
    learnLink: {
      fontSize: 16,
      color: theme.palette.greyDark,
      fontWeight: 'bold',
    },
    externalLink: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
    },
    externalLinkText: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingLeft: theme.spacing(2),
    },
    bitViewBtn: {
      border: `2px solid ${theme.palette.text.primary}`,
      '&:hover': {
        border: `2px solid ${theme.palette.text.primary}`,
      },
    },
    timerBox: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.primary,
    },
    timerBoxBurn: {
      color: theme.palette.warning.main,
    },
    actionBtnIcon: {
      width: 20,
      height: 20,
      marginLeft: 0,
      marginRight: theme.spacing(2.5),
    },
    warningSubText: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    checkbox: {
      background: 'transparent',
      margin: 0,
      '& .MuiFormControlLabel-label': {
        fontSize: 16,
        fontWeight: 400,
      },
    },
    actionBtnBurn: {
      color: theme.palette.warning.main,
    },
    linkIcon: {
      fill: theme.palette.text.primary,
    },
    linkIconRed: {
      fill: theme.palette.redMiddle,
    },
    btnTitleRed: {
      color: theme.palette.redMiddle,
    },
    linkIconGreen: {
      fill: theme.palette.green,
    },
    btnTitleGreen: {
      color: theme.palette.green,
    },
    backIcon: {
      backgroundColor: theme.palette.white,
      border: `1px solid ${theme.palette.greyLight}`,
      color: theme.palette.text.primary,
      marginRight: theme.spacing(4),
    },
    formHead: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(4),
    },
    rootField: {
      backgroundColor: 'transparent',
      '& input': {
        fontFamily: ['Roboto Mono', 'Archivo', 'sans-serif'].join(','),
        fontSize: 30,
      },
      '& .MuiFormHelperText-root': {
        fontFamily: ['Roboto Mono', 'Archivo', 'sans-serif'].join(','),
        fontSize: 16,
        color: theme.palette.text.primary,
        paddingTop: theme.spacing(2),
      },
      '& .MuiInputAdornment-root > p': {
        fontFamily: ['Roboto Mono', 'Archivo', 'sans-serif'].join(','),
        fontSize: 30,
      },
    },
  })
)
