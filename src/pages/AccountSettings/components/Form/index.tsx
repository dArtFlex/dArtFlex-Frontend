import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { validateUserIdRequest } from 'stores/reducers/user'
import { selectUser } from 'stores/selectors'
import { useFormikContext } from 'formik'
import { Box, Typography, Button } from '@material-ui/core'
import { Field, InputAdornment } from 'common'
import {
  AtIcon,
  WorldIcon,
  TwitterIcon,
  InstagramIcon,
  CodeIcon,
  FacebookIcon,
  YouTubeIcon,
  TikTokIcon,
  LinkIcon,
  VerificationIcon,
  SuccessIcon,
} from 'common/icons'
import { UploadFileSection } from '../../components'
// import Notification from './Notification'
import { ICustomAccountSettings } from '../../types'
import { useStyles } from './styles'
import { UserDataTypes } from '../../../../types'
import image from 'common/icons/cover_photo.png'
import { debounce } from 'lodash'
import {
  validateFacebook,
  validateInstagram,
  validateTikTok,
  validateTwitter,
  validateWebSite,
  validateYouTube,
} from '../../lib'

interface IFormAccountSettings {
  setOpenVerification: () => void
  user: UserDataTypes | null
}

export default function FormAccountSettings(props: IFormAccountSettings) {
  const { setOpenVerification, user } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userIdValid, fetching } = useSelector(selectUser())

  const { values, handleSubmit } = useFormikContext<ICustomAccountSettings>()

  const callRequest = debounce(() => dispatch(validateUserIdRequest({ userId: String(values.userid) })), 1000, {
    leading: true,
  })

  useEffect(() => {
    if (user?.userid !== values.userid) {
      callRequest()
    }
  }, [values.userid, user])

  return (
    <Box className={classes.form}>
      <Typography component="h1">Account Settings</Typography>
      <Box className={classes.section}>
        <Typography component="h3">Main Info</Typography>
        <UploadFileSection
          name="profile_image"
          label="User Image"
          description={`10MB max size, JPG, PNG or GIF. Recommended size: 1000x1000px.`}
          photoUrl={user?.profile_image && user?.profile_image !== 'blank' ? user?.profile_image : image}
          variant="avatar"
        />
        <UploadFileSection
          name="cover_image"
          label="Cover Image"
          description={`10MB max size, JPG, PNG or GIF. Recommended size: 500x1500px.`}
          variant={'cover'}
          photoUrl={user?.cover_image && user?.cover_image !== 'blank' ? user?.cover_image : image}
        />
        <Field type="input" name="fullname" label="Name" variant="outlined" className={classes.formField} />
        <Field
          type="input"
          name="userid"
          label="User Name"
          variant="outlined"
          className={classes.formField}
          InputProps={{
            startAdornment: <InputAdornment icon={<AtIcon />} />,
          }}
          helperText={
            user?.userid !== values.userid && !fetching ? (
              userIdValid === false ? (
                <Box className={classes.errorTextHelper}>
                  <Typography className={classes.helperText}>{`Username isn't unique`}</Typography>
                </Box>
              ) : (
                <Box className={classes.successTextHelper}>
                  <SuccessIcon className={classes.successIcon} />
                  <Typography className={classes.helperText}>{`Username is Valid`}</Typography>
                </Box>
              )
            ) : null
          }
        />
        <Field
          type="input"
          name="email"
          label="Email"
          variant="outlined"
          description="Email is used for notifications. It will not be shown on your profile."
          placeholder="Enter your email"
          className={classes.formField}
        />
        <Field
          type="input"
          name="overview"
          label="Short Biography"
          variant="outlined"
          multiline
          rows={4}
          className={classes.formField}
          maxLength={200}
        />
      </Box>
      {/* Todo: Notification settings will be implemented in next version */}
      {/* <Notification /> */}

      <Box className={classes.section}>
        <Typography component="h3">Socials</Typography>
        <Field
          type="input"
          name="website"
          label="Website"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start" icon={<WorldIcon className={classes.socialsIcon} />} />,
          }}
          validate={validateWebSite}
          placeholder={'https://'}
          className={classes.formField}
        />
        <Field
          type="input"
          name="twitter"
          label="Twitter"
          variant="outlined"
          validate={validateTwitter}
          placeholder={'Twitter Username'}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                icon={<TwitterIcon className={classes.socialsIcon} />}
                placeholder={'twitter.com/'}
              />
            ),
          }}
          className={classes.formField}
        />
        <Field
          type="input"
          name="instagram"
          label="Instagram"
          variant="outlined"
          validate={validateInstagram}
          placeholder={'Instagram User name'}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                icon={<InstagramIcon className={classes.socialsIcon} />}
                placeholder={'Instagram.com/'}
              />
            ),
          }}
          className={classes.formField}
        />
        <Field
          type="input"
          name="discord"
          label="Discord"
          variant="outlined"
          placeholder={'Code #'}
          InputProps={{
            startAdornment: <InputAdornment position="start" icon={<CodeIcon className={classes.socialsIcon} />} />,
          }}
          className={classes.formField}
        />
        <Field
          type="input"
          name="facebook"
          label="Facebook"
          variant="outlined"
          validate={validateFacebook}
          placeholder={'Facebook Username'}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                icon={<FacebookIcon className={classes.socialsIcon} />}
                placeholder={'facebook.com/'}
              />
            ),
          }}
          className={classes.formField}
        />
        <Field
          type="input"
          name="youtube"
          label="YouTube"
          variant="outlined"
          validate={validateYouTube}
          placeholder={'Channel URL'}
          InputProps={{
            startAdornment: <InputAdornment position="start" icon={<YouTubeIcon className={classes.socialsIcon} />} />,
          }}
          className={classes.formField}
        />
        <Field
          type="input"
          name="tiktok"
          label="TikTok"
          variant="outlined"
          validate={validateTikTok}
          placeholder={'Tik Tok Username'}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                icon={<TikTokIcon className={classes.socialsIcon} />}
                placeholder={'tiktok.com/'}
              />
            ),
          }}
          className={classes.formField}
        />
        <Field
          type="input"
          name="other_url"
          label="Other"
          variant="outlined"
          placeholder={'URL'}
          InputProps={{
            startAdornment: <InputAdornment position="start" icon={<LinkIcon className={classes.socialsIcon} />} />,
          }}
          validate={validateWebSite}
          className={classes.formField}
        />
      </Box>
      <Box className={classes.section}>
        <Box className={classes.verification}>
          <Typography component="h3">Verification</Typography>
          <VerificationIcon />
        </Box>
        <Typography color="textSecondary">
          Procceed with verification proccess to get more visibility and gain trust on dArtflex Marketplace. Please
          allow up to several weeks for the process.
        </Typography>
        <Button
          variant="outlined"
          className={classes.verifyBtn}
          startIcon={<TwitterIcon />}
          onClick={setOpenVerification}
        >
          Verify via Twitter
        </Button>
      </Box>
      <Button
        disabled={!Boolean(values.id.length || values?.userid?.length) || userIdValid === false || fetching}
        variant={'contained'}
        onClick={() => handleSubmit()}
        className={classes.btnSubmit}
        fullWidth
      >
        Save Changes
      </Button>
    </Box>
  )
}
