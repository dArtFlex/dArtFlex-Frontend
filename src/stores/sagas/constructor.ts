import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { ConstructorStateType } from 'stores/reducers/constructor/types'
import { createStyleTransferSuccess, createStyleTransferFailure } from 'stores/reducers/constructor'
import APP_CONFIG from 'config'
import { IApi } from '../../services/types'

export function* createStyleTransfer(
  api: IApi,
  {
    payload: { contentImage, styleImage, userId },
  }: PayloadAction<{
    contentImage: ConstructorStateType['contentImage']
    styleImage: ConstructorStateType['styleImage']
    priority: ConstructorStateType['priority']
    endScale: ConstructorStateType['endScale']
    userId: string
  }>
) {
  try {
    const formData = new FormData()
    formData.append('file1', contentImage as File)
    formData.append('file2', styleImage as File)
    formData.append('userId', userId)

    const name: ConstructorStateType['imageUrl'] = yield call(api, {
      url: APP_CONFIG.constructorStyleTransferSafe,
      method: 'POST',
      data: formData,
      transform: false,
    })

    yield put(createStyleTransferSuccess({ imageUrl: APP_CONFIG.getGenerateImage(name) }))
  } catch (e) {
    yield put(
      createStyleTransferFailure({ code: 4001, message: 'Something went wrong. Try to generate images later…' })
    )
  }
}
