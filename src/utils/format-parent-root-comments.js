export default function formatParentForRootComments(comments, rootId) {

  const copyArr = [...comments]

  copyArr.forEach(el => {
    el.parent?._id === rootId ? el.parent = null : ''
  })

  return copyArr
}