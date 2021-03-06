import React from 'react'
import clsx from 'clsx'
import { Stepper as MUIStepper, StepIconProps, Step } from '@material-ui/core'
import StepLabel from '@material-ui/core/StepLabel'
import { CircleOutlinedIcon, CircleCheckIcon } from 'common/icons'
import { IStepperProps, IStateStep } from './types'
import { useStyles } from './styles'
import { ColorlibConnector } from './ColorlibConnector'

export default function Stepper(props: IStepperProps) {
  const { steps, activeStep } = props
  const classes = useStyles()

  const StepStateLabel = ({ state, label }: IStateStep) => {
    switch (state) {
      case 'none':
        return (
          <StepLabel StepIconComponent={CommonStepIcon} classes={{ label: classes.textBold }}>
            {label}
          </StepLabel>
        )
      case 'progress':
        return (
          <StepLabel StepIconComponent={ProgressStepIcon} classes={{ label: classes.textBold }}>
            {label}
          </StepLabel>
        )
      case 'done':
        return (
          <StepLabel StepIconComponent={CompletedStepIcon} classes={{ label: classes.textBold }}>
            {label}
          </StepLabel>
        )
      default:
        return null
    }
  }

  return (
    <MUIStepper
      classes={{ root: classes.paper }}
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector />}
    >
      {steps.map(({ label, state }, i) => {
        return (
          <Step key={i} className={classes.step}>
            {Boolean(label.length) ? (
              <StepStateLabel label={label} state={state} />
            ) : (
              <StepLabel StepIconComponent={EmptyStep} classes={{ label: classes.textBold }} />
            )}
          </Step>
        )
      })}
    </MUIStepper>
  )
}

function CompletedStepIcon(props: StepIconProps) {
  const classes = useStyles()
  const { active } = props
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      <CircleCheckIcon className={classes.completed} />
    </div>
  )
}

function CommonStepIcon() {
  const classes = useStyles()
  return (
    <div className={clsx(classes.root)}>
      <div className={classes.circle} />
    </div>
  )
}

function ProgressStepIcon() {
  const classes = useStyles()
  return (
    <div className={clsx(classes.root)}>
      <CircleOutlinedIcon />
    </div>
  )
}

function EmptyStep() {
  return null
}
