

import React from 'react'
import { RecoilRoot } from 'recoil'
import App from './src/App'

const RootApp = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  )
}

export default RootApp