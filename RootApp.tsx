

import React from 'react'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'
import App from './src/App'

const RootApp = () => {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <App />
    </RecoilRoot>
  )
}

export default RootApp