import React from 'react'
import MainLayout from 'components/Layout/Main'
import Header from 'components/Header'
import styles from '../../shared/styles'
import { useRouter } from 'next/router'
import ConfessionDetail from '../components/ConfessionDetail'
import ListCategoryInTags from '../components/ListCategoryInTags'
import { gql } from 'apollo-boost'
import { CATEGORY_DETAIL_DATA } from '../../shared/graphQL/commonGPL'
import { useQuery } from '@apollo/react-hooks'
import { NextSeo } from 'next-seo'

const GET_DATA = gql`
    query getData($slug: String) {
        confession(slug: $slug) {
            id
            slug
            title
            image
            totalComment
            categories {
                id
                slug
                name
            }
            content
            created_at
            comments {
                id
                author_name
                author
                content
                parent
                created_at
            }
            relativeConfessions {
                id
                title
                slug
                totalComment
                created_at
            }
            relativeCategories {
                id
                slug
                name
            }
        }
        categories (limit: 100, offset: 0) {
            ...CategoryDetailCommonField
        }
    }
    ${CATEGORY_DETAIL_DATA}
`
export default () => {
  const router = useRouter()
  const { slug } = router.query

  const { loading, error, data } = useQuery(
    GET_DATA,
    {
      variables: {
        slug,
      },
    }
  )

  if (loading) return 'Loading ...'
  if (error) return `Error! ${error.message}`


  let { confession = {}, categories } = data || {}

  confession = confession || {}

  const url = `https://confession.vn/${confession.slug}/`

  return (
    <>
      <NextSeo
        title={confession.title}
        description={(confession.content || '').substr(0, 155).trim().replace(/[\n\r]/g, "")}
        canonical={url}
        openGraph={{
          url: url,
          type: 'article',
          images: [
            {
              url: confession.image,
              secure_url: confession.image,
              alt: confession.title,
            }
          ],
          article: {
            section: (confession.categories || []).map(cat => cat.name).join(', '),
            published_time: confession.created_at
          }
        }}
      />
      <MainLayout>
        <Header/>
        <div style={{ margin: '30px 0 30px 0' }}>
          <section className={'main-content'}>
            <ConfessionDetail confession={confession}/>
          </section>
          <aside className={'right-sidebar'}>
            <ListCategoryInTags categories={categories}/>
          </aside>
        </div>

      </MainLayout>
      <style jsx>{styles}</style>
    </>
  )
}
