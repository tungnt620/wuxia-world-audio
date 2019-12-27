import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles, { globalStyle } from './styles'
import Link from 'next/link'
import { Tag } from 'antd-mobile'

const ListCategoryInTags = ({ categories = [] }) => {
  const [selectArr, setSelectArr] = useState([])

  useEffect(() => {
    if (categories) {
      setSelectArr(Array(categories.length).fill(false))
    }
  }, [categories])

  const onChangeSelectTag = (index) => {
    const newSelectArr = Array(categories.length).fill(false)
    newSelectArr[index] = true
    setSelectArr(newSelectArr)
  }

  return (
    <div className={'list-category'}>
      <h2 className={'header-title'} id={'category-tags'}>Tags</h2>
      {
        categories.map((cat, index) => (
          <Tag selected={selectArr[index]} onChange={() => onChangeSelectTag(index)} className={'cat-tag'} key={cat.id}>
            <Link href={`/category?slug=${cat.slug}`} as={`/category/${cat.slug}/`}>
              <a>{`#${cat.name}`}</a>
            </Link>
          </Tag>
        ))
      }

      <style jsx>{styles}</style>
      <style jsx global>{globalStyle}</style>
    </div>
  )
}

ListCategoryInTags.propTypes = {}

export default ListCategoryInTags
