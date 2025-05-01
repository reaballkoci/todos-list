import React from 'react'
import TodoLists from './components/Todo/TodoLists'
import Layout from './components/Layout/Layout'
import { styles } from './styles/styles'

const App = () => {
  return (
    <Layout>
      <TodoLists style={styles.m1} />
    </Layout>
  )
}

export default App
