import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnFilter: {
      maxWidth: 184,
      minWidth: 184,
    },
    formGroup: {
      width: 184,
      padding: theme.spacing(3, 6.5),
    },
    formLabel: {
      maxWidth: 112,
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.primary,
    },
    btnFilterLabel: {
      justifyContent: 'space-between',
      whiteSpace: 'nowrap',
    },
    btnRefreshIcon: {
      width: '100%',
      whiteSpace: 'nowrap',
    },
    filtersBtn: {
      minWidth: '122px',
      display: 'flex',
      justifyContent: 'space-around',
      whiteSpace: 'nowrap',
    },
    filtersBtnBox: {
      display: 'flex',
      gap: 8,
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    },
  })
)