import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles, { globalStyle } from './styles'
import Link from 'next/link'
import { Tag } from 'antd-mobile'

const maxCatShow = 3

const PopularListCategoryInTags = ({ categories = [] }) => {
  const [selectArr, setSelectArr] = useState([])
  const [catsShow, setCatsShow] = useState([])

  useEffect(() => {
    if (categories) {
      setSelectArr(Array(maxCatShow).fill(false))
    }
  }, [categories])

  useEffect(() => {
    if (categories) {
      const allCat = categories
      const catsWillShow = []
      for (let i = 0; i < maxCatShow; ++i) {
        const randomCat = allCat[Math.floor(Math.random() * allCat.length)]
        if (!catsWillShow.includes(randomCat)) {
          catsWillShow.push(randomCat)
        } else {
          --i
        }
      }

      setCatsShow(catsWillShow)
    }
  }, [categories])

  const onChangeSelectTag = (index) => {
    const newSelectArr = Array(maxCatShow).fill(false)
    newSelectArr[index] = true
    setSelectArr(newSelectArr)
  }

  return (
    <div className={'list-category-popular'}>
      <h2 className={'header-title'}>Tags nhiều confession nhất</h2>
      {
        catsShow.map((cat, index) => (
          <Tag selected={selectArr[index]} onChange={() => onChangeSelectTag(index)} className={'cat-tag'} key={cat.id}>
            <Link href={`/category?slug=${cat.slug}`} as={`/category/${cat.slug}/`}>
              <a>{`#${cat.name}`}</a>
            </Link>
          </Tag>
        ))
      }
      <Tag selected={false} className={'cat-tag'} style={{ backgroundColor: 'antiquewhite' }}>
        <a href={`#category-tags`}>Xem thêm</a>
      </Tag>

      <style jsx>{styles}</style>
      <style jsx global>{globalStyle}</style>
    </div>
  )
}

PopularListCategoryInTags.propTypes = {}

export default PopularListCategoryInTags
