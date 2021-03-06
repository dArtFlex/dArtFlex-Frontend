export interface IApprovedFormProps {
  onSubmit: () => void
}

export interface ApprovedFormState {
  bid: number
  priceDrop: string
  acknowledge: boolean
  agreeTerms: boolean
  formProgress: IFormProgress
  promotion?: boolean
  offerExpiration?: string
  salesTokenContract: string
}

type IFormProgress = 'details' | 'auction' | 'buy' | 'approved' | 'make offer' | 'confirm offer'
