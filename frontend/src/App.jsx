import React from 'react'
import TodoLists from './components/Todo/TodoLists'
import Layout from './components/Layout/Layout'

const App = () => {
  return (
    <Layout>
      <TodoLists style={{ margin: '1rem' }} />
    </Layout>
  )
}

export default App
