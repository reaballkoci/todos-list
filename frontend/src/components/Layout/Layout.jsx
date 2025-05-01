import Header from '../Header/Header'
import { styles } from '../../styles/styles'

const Layout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <Header />
      <div style={styles.centerContentLayout}>
        <div style={styles.layoutElement}>{children}</div>
      </div>
    </div>
  )
}

export default Layout
