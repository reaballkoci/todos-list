import Header from '../Header/Header'

const mainWrapperStyle = { display: 'flex', flexDirection: 'column' }
const centerContentWrapper = { display: 'flex', justifyContent: 'center' }
const contentWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '80rem',
  flexGrow: 1,
}

export const Layout = ({ children }) => {
  return (
    <div style={mainWrapperStyle}>
      <Header />
      <div style={centerContentWrapper}>
        <div style={contentWrapperStyle}>{children}</div>
      </div>
    </div>
  )
}

export default Layout
