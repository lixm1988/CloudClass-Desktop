import classnames from 'classnames';
import React from 'react';
import { t } from '~components/i18n';
import { Icon, IconTypes } from '~components/icon';
import { Column, Profile } from '~components/roster';

const getCameraState = (profile: Profile) => {
  const defaultType = 'camera-off'

  let hover: boolean = false

  if (!!profile.onlineState !== true ||
      // !!profile.cameraDevice === false ||
      !!profile.disabled === true) {
    hover = false
  } else {
    hover = true
  }

  // const hover = !!profile.onlineState || profile.disabled === false || !!profile.cameraDevice === true 

  const type = !!profile.cameraEnabled === true ? 'camera' : defaultType

  const className = !!profile.cameraEnabled === true ? 'un-muted' : 'muted'

  return {
    hover,
    type: type as IconTypes,
    className: className
  }
}

const getMicrophoneState = (profile: Profile): any => {
  const defaultType = 'microphone-off-outline'

  let hover: boolean = false

  if (!!profile.onlineState !== true ||
    // !!profile.micDevice === false ||
     !!profile.disabled === true) {
    hover = false
  } else {
    hover = true
  }

  const type = !!profile.micEnabled === true ? 'microphone-on-outline' : defaultType

  const className = !!profile.micEnabled === true ? 'un-muted' : 'muted'

  return {
    hover,
    type: type as IconTypes,
    className: className
  }
}

export const defaultColumns: Column[] = [
  {
    key: 'name',
    name: 'roster.student_name',
  },
  {
    key: 'onPodium',
    name: 'roster.student_co_video',
    action: 'podium',
    render: (_, profile) => {
      const cls = classnames({
        [`${!!profile.onPodium ? 'on' : 'off'}-podium`]: 1,
        [`disabled`]: profile.disabled,
      })
      return (
        <Icon
          hover={!!profile.canCoVideo === true}
          className={cls}
          type="on-podium"
        />
      )
    }
  },
  {
    key: 'whiteboardGranted',
    name: 'roster.board_state',
    action: 'whiteboard',
    render: (_, profile) => {
      const cls = classnames({
        [`whiteboard-${!!profile.whiteboardGranted ? 'granted' : 'no_granted'}`]: 1,
        [`disabled`]: profile.disabled
      })
      return (
        <Icon
          hover={!!profile.canGrantBoard === true}
          className={cls}
          type="whiteboard"
        />
      )
    },
  },
  {
    key: 'cameraEnabled',
    name: 'roster.camera_state',
    action: 'camera',
    render: (_, profile) => {
      const {
        className,
        hover,
        type,
      } = getCameraState(profile)

      const cls = classnames({
        [`${className}`]: 1,
        [`disabled`]: profile.disabled
      })
      return (
        <Icon
          hover={hover}
          className={cls}
          type={type}
        />
      )
    },
  },
  {
    key: 'micEnabled',
    name: 'roster.microphone_state',
    action: 'mic',
    render: (_, profile) => {
      const {
        className,
        hover,
        type,
      } = getMicrophoneState(profile)

      const cls = classnames({
        [`${className}`]: 1,
        [`disabled`]: profile.disabled
      })
      return (
        <Icon
          hover={hover}
          className={cls}
          type={type}
        />
      )
    },
  },
  {
    key: 'stars',
    name: 'roster.reward',
    render: (text, profile: Profile) => {
      const cls = classnames({
        'inline-flex': 1,
        [`disabled`]: profile.disabled
      })

      return (
        <div className={cls}>
          <Icon className="star" type="star-outline" />
          <span className="star-nums">&nbsp;x{text}</span>
        </div>
      )
    },
  },
  {
    key: 'kickOut',
    name: 'roster.kick',
    action: 'kick-out',
    visibleRoles: ['assistant', 'teacher'],
    // FIXME: 不能点击时的样式
    render: (_, profile) => {
      return (
        <span className="kick-out">
          <Icon hover={true} type="exit" />
        </span>
      )
    },
  },
];
