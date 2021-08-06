import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAssetDetails, selectBid } from 'stores/selectors'
import { useFormikContext } from 'formik'
import { buyNowRequest } from 'stores/reducers/buyNow'
import { makeOfferRequest } from 'stores/reducers/makeOffer'
import FormDetails from './FormDetails'
import FormBuy from './FormBuy'
import FormApproved from './FormApproved'
import { ApprovedFormState } from '../../../types'
import FormMakeOffer from './FormMakeOffer'

export default function FormAuction() {
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()
  const dispatch = useDispatch()
  const {
    assetDetails: { marketData },
  } = useSelector(selectAssetDetails())
  const {
    bid: { bidHistory },
  } = useSelector(selectBid())

  switch (values.formProgress) {
    case 'details':
      return <FormDetails onSubmit={() => setFieldValue('formProgress', 'buy')} />
    case 'buy':
      return (
        <FormBuy
          onSubmit={() => {
            setFieldValue('formProgress', 'approved')
            dispatch(buyNowRequest({ amount: marketData?.start_price, order_id: bidHistory[1].order_id }))
          }}
          onMakeOffer={() => {
            dispatch(makeOfferRequest({ amount: values.bid }))
          }}
        />
      )
    case 'make offer':
      return <FormMakeOffer onSubmit={() => setFieldValue('formProgress', 'approved')} />
    case 'approved':
      return <FormApproved />
    default:
      return null
  }
}
