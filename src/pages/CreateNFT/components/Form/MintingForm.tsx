import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import { ICreateNFT } from '../../types'
import { selectMinting, selectWallet } from 'stores/selectors'
import { Box, Card, Button, Typography } from '@material-ui/core'
import { CircularProgressLoader, Field, Modal, WalletConnect } from 'common'
import { ArrowLeftIcon } from 'common/icons'
import { useStyles } from './styles'

interface IMintingForm {
  onMinting: () => void
  onList: () => void
  onViewArtwork: () => void
}

export default function MintingForm(props: IMintingForm) {
  const { onMinting, onList, onViewArtwork } = props
  const classes = useStyles()

  const { values, setFieldValue } = useFormikContext<ICreateNFT>()
  const [open, setOpen] = useState<boolean>(false)

  const {
    minting: { minting },
  } = useSelector(selectMinting())

  const { wallet } = useSelector(selectWallet())

  switch (minting) {
    case 'none':
    case 'failed':
      return (
        <Box className={classes.flexBox} justifyContent={'flex-start'}>
          <Card className={classes.cardForm}>
            <Button
              variant={'text'}
              startIcon={<ArrowLeftIcon />}
              onClick={() => {
                setFieldValue('file', null)
                setFieldValue('name', '')
                setFieldValue('description', '')
              }}
            >
              Back
            </Button>
            <Box pb={4}>
              <Typography variant={'h2'}>Title and Description</Typography>
            </Box>
            <Box pb={4}>
              <Typography variant={'body1'} color={'textSecondary'}>
                Once your NFT is minted on the Ethereum blockchain, you will not be able to edit or update any of its
                information.
              </Typography>
            </Box>
            <Field type="input" name="name" variant={'outlined'} label="Title" />
            {/* Royalty - type number - max 100 */}
            <Field type="input" name="royalties" variant={'outlined'} label="Royalties" helperText={'Suggested: 10%'} />
            <Field type="input" name="description" variant={'outlined'} label="Description" multiline rows={4} />
            <Button
              variant={'contained'}
              color={'primary'}
              fullWidth
              onClick={() => {
                if (!wallet) {
                  return setOpen(true)
                }
                onMinting()
              }}
              className={classes.btnMint}
              disabled={Boolean(values.name.length) === false || Boolean(values.description.length) === false}
            >
              Mint NFT
            </Button>
          </Card>

          <Modal
            open={open}
            onClose={() => setOpen(false)}
            body={<WalletConnect onClose={() => setOpen(false)} />}
            withAside
          />
        </Box>
      )
    case 'in progress':
      return (
        <Box className={classes.confirming}>
          <Box pb={4}>
            <Typography variant={'h2'}>Minting...</Typography>
          </Box>
          <Box pb={10}>
            <Typography variant={'body1'} color={'textSecondary'}>
              Confirm this transaction with your wallet to continue. Doing this will sign your wallet as the original
              creator of the NFT.
            </Typography>
          </Box>
          <Box className={classes.loader}>
            <CircularProgressLoader />
          </Box>
        </Box>
      )
    case 'done':
      return (
        <Box className={classes.confirming}>
          <Box pb={4}>
            <Typography variant={'h2'}>Your NFT has been minted!</Typography>
          </Box>
          <Box pb={10}>
            <Typography variant={'body1'} color={'textSecondary'}>
              Congratulations! Your artwork has officially been minted as an NFT on the Blockchain
            </Typography>
          </Box>
          <Box pb={4}>
            <Button variant={'contained'} color={'primary'} onClick={onList}>
              List your NFT
            </Button>
          </Box>
          <Button variant={'outlined'} className={classes.btnView} onClick={onViewArtwork}>
            View Artwork
          </Button>
        </Box>
      )
    default:
      return null
  }
}