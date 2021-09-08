//@ts-nocheck
import HttpStatusCodes from 'http-status-codes'
import { CommonService } from 'services/common_service'
import { DOMAIN_TYPE, ERC721Types } from 'constant'

class LazyMintService extends CommonService {
  createTypeData(domainData, primaryType, message, types) {
    return {
      types: Object.assign(
        {
          EIP712Domain: DOMAIN_TYPE,
        },
        types
      ),
      domain: domainData,
      primaryType: primaryType,
      message: message,
    }
  }

  async generateTokenId(creator) {
    const nonce = creator + this.web3.utils.randomHex(12).slice(2)
    const tokenId = this.web3.utils.toBN(nonce).toString()
    return tokenId
  }

  async generateLazyMint(request, response?: Response) {
    const { contract, uri, creator } = request.body

    if (!contract || !uri || !creator) {
      return response.status(HttpStatusCodes.BAD_REQUEST).send('Missing Data')
    }

    const tokenId = await this.generateTokenId(creator)

    const form = {
      '@type': 'ERC721',
      contract: contract,
      tokenId: tokenId,
      uri: uri,
      creators: [{ account: creator, value: '10000' }],
      // Todo: Should be checked royalty
      royalties: [],
    }

    const data = this.createTypeData(
      {
        name: 'Mint721',
        version: '1',
        chainId: 4,
        verifyingContract: contract,
      },
      'Mint721',
      { ...form, tokenURI: uri },
      ERC721Types
    )

    const signature = await this.signTypedData(data)
    return { ...form, signatures: [signature] }
  }
}

export const lazyMintService = new LazyMintService()
