import Layout from '../component/Layout'
import '../styles/Skeleton/normalize.css'
import '../styles/Skeleton/skeleton.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
