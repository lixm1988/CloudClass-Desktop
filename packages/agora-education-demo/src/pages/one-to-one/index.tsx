import React, { useState } from 'react'
import { Aside, Content, Layout } from 'agora-scenario-ui-kit'
import { WhiteboardContainer } from '../common-container/board'
import { NavigationBar } from '../common-container/nav'
import { VideoPlayerTeacher, VideoPlayerStudent } from '../common-container/video-player'
import { RoomChat } from '../common-container/chat'
import './1v1.style.css'

export const OneToOne = () => {

  return (
    <Layout
      direction="col"
      style={{
        height: '100vh'
      }}
    >
      <NavigationBar />
      <Layout className="bg-white" style={{ height: '100%' }}>
        <Content>
          <WhiteboardContainer />
        </Content>
        <Aside>
          <VideoPlayerTeacher/>
          <VideoPlayerStudent/>
          <RoomChat />
        </Aside>
      </Layout>
    </Layout>
  )
}