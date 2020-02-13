import ReducerBase from '../../../shared/ReducerBase'
import * as actionTypes from '../actionTypes'

export default class ListReducer extends ReducerBase {
  constructor (actionType, initial) {
    super(actionType, initial)
  }

  updateItems (state, payload) {
    const { items = [] } = payload
    const IDDataMap = items.reduce((IDDataMap, item) => {
      IDDataMap[item.id] = item
      return IDDataMap
    }, {})

    const newItems = [...state.data?.items]
    newItems.forEach((item, index) => {
      const newItemData = IDDataMap[item.id]
      if (newItemData) {
        newItems[index] = {
          ...item,
          ...newItemData,
        }
      }
    })

    return {
      ...state,
      data: {
        ...state.data,
        items: newItems
      }
    }
  }

  reducer (state = this.initial, action) {
    const { type, payload } = action
    switch (type) {
      case actionTypes.LIST_BOOK.custom('update_items'):
        return this.updateItems(state, payload)
      default:
        return super.reducer(state, action)
    }
  }
}
