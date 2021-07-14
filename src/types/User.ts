import { IEntity, IDatedEntity } from 'types'

export interface UserDataTypes extends IEntity, IDatedEntity, ISocial {
  fullname: string
  userid: string
  email: string
  wallet: string
  overview: string
  profile_image: string
  cover_image: string
  ban: boolean
}

interface ISocial {
  role: null
  website: string
  twitter: string
  instagram: string
  discord: string
  facebook: string
  youtube: string
  tiktok: string
  other_url: string
}