import { useUIStore } from '@/hooks'
import { DialogType } from '@/stores/app/ui'
import { BusinessExceptions } from '@/utils/biz-error'
import { GenericError } from 'agora-rte-sdk'
import { Modal, t, Button, Setting } from 'agora-scenario-ui-kit'
import classnames from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'
import { Trans } from 'react-i18next'
import { useCloseConfirmContext, useDialogContext, useExitContext, useKickEndContext, useOpenDialogContext, useRoomEndContext, useErrorContext, useSettingContext } from '../hooks'
import { CloudDriverContainer } from './cloud-driver'
import { ScreenShareContainer } from './screen-share'
import { SettingContainer } from './setting'
import { UserListContainer } from './user-list'

export const KickDialog = observer(({id, userUuid, roomUuid}: {id: string, userUuid: string, roomUuid: string}) => {
  return (
    <div></div>
  )
})

export const SettingDialog = observer(({ id }: { id: string }) => {
  return (
    <SettingContainer id={id} />
  )
})

export const CloudDriverDialog = observer(({ id }: { id: string }) => {
  const uiStore = useUIStore()
  return (
    <CloudDriverContainer onClose={() => {
      uiStore.removeDialog(id)
    }}/>
  )
})

export const GenericErrorDialog = observer(({ id, error }: { id: string, error: GenericError }) => {
  const {
    onOK,
    onCancel,
    ButtonGroup
  } = useErrorContext(id)
  return (
    <Modal
      onOk={onOK}
      onCancel={onCancel}
      footer={ButtonGroup()}
      title={t('course.join_failed')}
    >
      <Trans>{BusinessExceptions.getReadableText(error.errCode)}</Trans>
    </Modal>
  )
})

export const UserListDialog = observer(({ id }: { id: string }) => {
  const uiStore = useUIStore()
  return (
    <UserListContainer onClose={() => {
      uiStore.removeDialog(id)
    }}/>
  )
})

export const OpenShareScreen = observer(({ id, resourceName }: { id: string, resourceName: string }) => {

  const {
    onOK,
    onCancel,
    ButtonGroup,
    setWindowId,
    windowId,
  } = useOpenDialogContext(id)
  return (
    <Modal
      width={662}
      onOk={onOK}
      onCancel={onCancel}
      footer={ButtonGroup()}
      title={t('toast.screen_share')}
    >
      <ScreenShareContainer
        windowId={windowId}
        setWindowId={setWindowId}
      />
    </Modal>
  )
})

export const CloseConfirm = observer(({ id, resourceUuid }: { id: string, resourceUuid: string }) => {
  const {
    onOK,
    onCancel,
    ButtonGroup
  } = useCloseConfirmContext(id, resourceUuid)
  return (
    <Modal
      onOk={onOK}
      onCancel={onCancel}
      footer={ButtonGroup()}
      title={t('toast.close_ppt')}
    >
      <p>{t('toast.sure_close_ppt')}</p>
    </Modal>
  )
})

export const KickEnd = observer((id: string) => {

  const {
    onOK,
    onCancel,
    ButtonGroup
  } = useKickEndContext(id)

  return (
    <Modal
      onOk={onOK}
      onCancel={onCancel}
      footer={ButtonGroup()}
      title={t('toast.kick_by_other_side')}>
      <p>{t('toast.quit_from_room')}</p>
    </Modal>
  )
})

export const KickedEnd = observer((id: string) => {

  const {
    onOK,
    onCancel,
    ButtonGroup
  } = useKickEndContext(id)

  return (
    <Modal
      onOk={onOK}
      onCancel={onCancel}
      footer={ButtonGroup()}
      title={t('toast.kick_by_teacher')}>
      <p>{t('toast.quit_from_room')}</p>
    </Modal>
  )
})

export const RoomEnd = observer((id: string) => {

  const {
    onOK,
    onCancel,
    ButtonGroup
  } = useRoomEndContext(id)

  return (
    <Modal
      onOk={onOK}
      onCancel={onCancel}
      footer={ButtonGroup()}
      title={t('toast.end_class')}>
      <p>{t('toast.quit_from_room')}</p>
    </Modal>
  )
})

export const Exit = observer((id: string) => {

  const { onOK, onCancel, ButtonGroup } = useExitContext(id)

  return (
    <Modal
      onOk={onOK}
      onCancel={onCancel}
      footer={ButtonGroup()}
      title={t('toast.leave_room')}>
      <p>{t('toast.quit_room')}</p>
    </Modal>
  )
})


export const DialogContainer: React.FC<any> = observer(() => {

  const { dialogQueue } = useDialogContext()

  const cls = classnames({
    [`rc-mask`]: !!dialogQueue.length,
  })

  return (
    <div className={cls}>
      {
        dialogQueue.map(({ id, component: Component, props }: DialogType) => (
          <div key={id} className="fixed-container">
            <Component {...props} id={id} />
          </div>
        ))
      }
    </div>
  )
})