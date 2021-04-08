import { useContext } from 'react'
import {
  ReactBricksContext,
  PageViewer,
  fetchPage,
  cleanPage,
  types
} from 'react-bricks'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import config from '../react-bricks/config'
import Layout from '../components/layoutt'
import ErrorNoKeys from '../components/errorNoKeyss'
import ErrorNoHomePage from '../components/errorNoHomePagee'

interface HomeProps {
  page: types.Page,
  error: string
}

const Home: React.FC<HomeProps> = ({ page, error }) => {
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useContext(ReactBricksContext)

  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null

  return (
    <Layout>
      {pageOk && (
        <>
          <Head>
            <title>{page.meta.title}</title>
            <meta name="description" content={page.meta.description} />
          </Head>
          <PageViewer page={pageOk} />
        </>
      )}
      {error === 'NOKEYS' && <ErrorNoKeys />}
      {error === 'NOPAGE' && <ErrorNoHomePage />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!config.apiKey) {
    return { props: { error: 'NOKEYS' } }
  }
  try {
    const page = await fetchPage('home', config.apiKey, context.locale)
    return { props: { page } }
  } catch (error) {
    return { props: { error: 'NOPAGE' } }
  }
}

export default Home
