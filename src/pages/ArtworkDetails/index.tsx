import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper, Form } from 'common'
import { FormContainer } from './components'
import { selectAssetDetails } from 'stores/selectors'
import { getAssetByIdRequest } from 'stores/reducers/assets'
import { getBidsHistoryRequest, getBidsRequest } from 'stores/reducers/placeBid'
import { ApprovedFormState } from './types'
import appConst from 'config/consts'

const { INTERVALS } = appConst

const formData: ApprovedFormState = {
  bid: 0,
  acknowledge: false,
  agreeTerms: false,
  formProgress: 'details',
  promotion: false,
}

export default function ArtworkDetails() {
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()
  const { assetDetails } = useSelector(selectAssetDetails())

  useEffect(() => {
    dispatch(getAssetByIdRequest(Number(id)))
  }, [])

  const fetchBidsHistory = () => {
    if (assetDetails) {
      dispatch(getBidsHistoryRequest())
      assetDetails.marketData?.id && dispatch(getBidsRequest({ market_id: assetDetails.marketData.id }))
    }
  }

  useEffect(() => {
    if (!assetDetails) {
      return
    }
    dispatch(getBidsHistoryRequest())
    assetDetails.marketData?.id && dispatch(getBidsRequest({ market_id: assetDetails.marketData.id }))
    const iId = setInterval(() => fetchBidsHistory(), INTERVALS.UPDATE_BIDS_HISTORY)
    return () => {
      clearInterval(iId)
    }
  }, [assetDetails])

  if (assetDetails.tokenData === null) {
    return null
  }

  return (
    <PageWrapper>
      <Form initialValues={formData} onSubmit={(state: ApprovedFormState) => console.log('y', state)}>
        <FormContainer />
      </Form>
    </PageWrapper>
  )
}
