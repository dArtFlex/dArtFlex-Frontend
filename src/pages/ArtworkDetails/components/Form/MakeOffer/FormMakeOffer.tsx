import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { ApprovedFormState } from '../../../types'
import { useSelector } from 'react-redux'
import { selectAssetDetails, selectAssetTokenRates, selectUser, selectWallet } from 'stores/selectors'
import { Box, Button, IconButton, Link, Typography } from '@material-ui/core'
import { ArrowLeftIcon } from 'common/icons'
import { Field, InputAdornment, Tooltip, SelectPaymentToken } from 'common'
import { IChaintIdHexFormat, IBaseTokens } from 'types'
import tokensAll from 'core/tokens'
import { walletService } from 'services/wallet_service'
import clsx from 'clsx'
import BigNumber from 'bignumber.js'
import appConst from 'config/consts'
import { validatePrice, networkConvertor, supportedNetwork } from 'utils'
import { useStyles } from '../styles'

const {
  SCHEDULE: { DAYS3, DAYS5, MONTH, SPECIFIC },
} = appConst

const schedule = [
  {
    value: DAYS3,
    label: '3 days',
  },
  {
    value: DAYS5,
    label: '5 days',
  },
  {
    value: MONTH,
    label: '1 month',
  },
  {
    value: SPECIFIC,
    label: 'Custom Date',
  },
]

interface IFormMakeOffer {
  onSubmit: () => void
}

export default function FormMakeOffer(props: IFormMakeOffer) {
  const classes = useStyles()
  const { onSubmit } = props
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()
  const { wallet } = useSelector(selectWallet())
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const tokenInfo = exchangeRates ? exchangeRates.find((tR) => tR.id === '0x') : null
  const tokenBalance = tokenInfo ? wallet?.balance || 0 : 0
  const tokenRate = tokenInfo ? tokenInfo?.rateUsd || 0 : 0
  const bidValueAmountUsd =
    values.bid && parseFloat(`${values.bid}`)
      ? new BigNumber(values.bid).multipliedBy(tokenRate).toNumber().toFixed(2)
      : 0

  const { user } = useSelector(selectUser())

  const {
    assetDetails: { tokenData },
  } = useSelector(selectAssetDetails())

  const disabledButton =
    values.bid > 0 && Boolean(values.acknowledge) && Boolean(values.agreeTerms) && Number(tokenData?.owner) !== user?.id

  const chainId: number = walletService.getChainId()
  const convertChainId: IChaintIdHexFormat | number = networkConvertor(chainId)

  const tokens: IBaseTokens[] =
    supportedNetwork(convertChainId) && typeof convertChainId !== 'number' ? tokensAll[convertChainId] : []

  useEffect(() => {
    tokens && setFieldValue('salesTokenContract', tokens[1].id)
  }, [])

  return (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box className={classes.formHead}>
          <IconButton className={classes.backIcon} onClick={() => setFieldValue('formProgress', 'details')}>
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h1" component="p">
            Make offer
          </Typography>
        </Box>
        <Box mb={5}>
          <Tooltip
            text={`This item hasn't been reviewed by dArtflex`}
            desc={`You should proceed with extra caution. Anyone can create a digital item on a blockchain with any name, including fake versions of existing items. Please take extra caution and do your research when interacting with this item to ensure it's what it claims to be.`}
            className={classes.tooltip}
          />
        </Box>
        <Box mb={5} className={classes.priceRow}>
          <Typography variant="body1" color="textSecondary">
            Your Balance
          </Typography>
          <Typography className={clsx(classes.boldText, classes.fontFamilyRoboto)}>{`${tokenBalance.toFixed(
            4
          )} ETH`}</Typography>
        </Box>
        <Field
          type="input"
          name="bid"
          variant="outlined"
          className={classes.rootField}
          validate={validatePrice}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="start"
                placeholder={
                  <SelectPaymentToken
                    tokens={tokens}
                    salesTokenContract={values.salesTokenContract}
                    setSalesTokenContract={(contract) => {
                      setFieldValue('salesTokenContract', contract)
                    }}
                    unavailableTokens={['0x']}
                    classNames={classes.placeholderText}
                  />
                }
              />
            ),
          }}
          helperText={`$${bidValueAmountUsd}`}
        />
        <Box mt={6}>
          <Typography className={classes.textBold}>Offer expiration</Typography>
        </Box>
        <Box className={clsx(classes.gridBox, classes.dateSelect)}>
          <Field type="select" options={schedule} name="offerExpiration" fullWidth={false} />
          {values.offerExpiration === SPECIFIC && <Field type="pickerTime" name="endDate" fullWidth={false} />}
        </Box>

        <Box mt={6} mb={4}>
          <Field
            type="checkbox"
            name="acknowledge"
            label={'I acknowledge that this item has not been reviewed or approved by dArtflex'}
            className={classes.checkbox}
          />
        </Box>

        <Box mb={6}>
          <Field
            type="checkbox"
            name="agreeTerms"
            // Todo: Need to fixed ts issue
            // @ts-ignore
            label={
              <Typography className={classes.warningText}>
                {`I agree with dArtflex's `}
                <Link>Terms and Services</Link>
              </Typography>
            }
            className={classes.checkbox}
          />
        </Box>
        <Button
          onClick={onSubmit}
          variant={'contained'}
          color={'primary'}
          fullWidth
          disableElevation
          disabled={!disabledButton}
          className={clsx(classes.bitBtn, !disabledButton && classes.bitBtnDisabled)}
        >
          <Typography>Make offer</Typography>
        </Button>
      </Box>
      <Typography align={'center'} className={clsx(classes.textBold, classes.bottomInfoText)}>
        Learn how our auction works
      </Typography>
    </Box>
  )
}
