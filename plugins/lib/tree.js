const tree = {
  treeGridSort (oriList, root, id, p, f) {
    const copyList = []
    const rootId = root ?? 'M00000000000'
    const idName = id ?? 'menuId'
    const parentName = p ?? 'upperMenuId'
    const level = f ?? 'level'
    for (let i = 0; i < oriList.length; i++) {
      if (!oriList[i]) { break }
      if (oriList[i][parentName] === rootId) {
        const obj = (oriList.splice(i, 1))[0]
        obj.depth = obj[level]
        i--
        const childList = this.treeGridSort(oriList, obj[idName], idName, parentName, level)
        if (childList.length > 0) {
          obj._children = childList
          obj._attributes = { expanded: true }
        }
        copyList.push(obj)
      }
    }
    copyList.sort(function (a, b) {
      return a.sortSeq - b.sortSeq
    })
    return copyList
  },
  searchTree (element, type, value) {
    if (element[type] && element[type] === value) {
      return element
    }
    if (element.children != null) {
      let result = null
      for (let i = 0; i < element.children.length; i++) {
        result = this.searchTree(element.children[i], type, value)
        if (result) {
          return result
        }
      }
    }
    return null
  }
}

export default (ctx, inject) => {
  ctx.$tree = tree
  inject('tree', tree)
}
