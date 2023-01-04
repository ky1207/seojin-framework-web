export const tree = {
  treeGridSort (oriList, root, id, p, f) {
    const copyList = []
    const rootId = root ?? '00000'
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

    if (element._children != null) {
      let result = null
      for (let i = 0; i < element._children.length; i++) {
        result = this.searchTree(element._children[i], type, value)
        if (result) {
          return result
        }
      }
    }

    return null
  },

  searchPath (element, type, value) {
    const result = []
    let parent
    let parentId = value
    do {
      parent = this.searchTree(element, type, parentId)
      parentId = null
      if (parent !== null) {
        parentId = parent.upperMenuId
        result.push(parent.menuName)
      }
    } while (parentId !== null)

    return result.reverse().slice(1)
  },

  getNewNode (node) {
    node._attributes = { expanded: true }
    return node
  }
}
export default (ctx, inject) => {
  ctx.$tree = tree
  inject('tree', tree)
}
