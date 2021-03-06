import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAssetDetails } from 'stores/selectors'
import { useFormikContext } from 'formik'
import { placeBidRequest } from 'stores/reducers/placeBid'
import FormDetails from './FormDetails'
import FormAuction from './FormAuction'
import FormApproved from './FormApproved'
import { ApprovedFormState } from '../../../types'
import { makeOfferRequest } from '../../../../../stores/reducers/makeOffer'
import { FormMakeOffer, FormApprovedOffer } from '../MakeOffer'

export default function FormAuctionContainer() {
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()
  const dispatch = useDispatch()
  const {
    assetDetails: { marketData },
  } = useSelector(selectAssetDetails())

  switch (values.formProgress) {
    case 'details':
      return <FormDetails onSubmit={setFieldValue} />
    case 'auction':
      return (
        <FormAuction
          onSubmit={() => {
            setFieldValue('formProgress', 'approved')
            dispatch(placeBidRequest({ bidAmount: values.bid, sales_token_contract: marketData?.sales_token_contract }))
          }}
        />
      )
    case 'make offer':
      return (
        <FormMakeOffer
          onSubmit={() => {
            setFieldValue('formProgress', 'confirm offer')
            dispatch(makeOfferRequest({ amount: values.bid, salesTokenContract: values.salesTokenContract }))
          }}
        />
      )
    case 'approved':
      return <FormApproved onSubmit={() => setFieldValue('formProgress', 'details')} />
    case 'confirm offer':
      return (
        <FormApprovedOffer
          onSubmit={() => {
            setFieldValue('bid', '0')
            setFieldValue('formProgress', 'details')
          }}
        />
      )
    default:
      return null
  }
}
