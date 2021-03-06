// @flow
import bookContent from '../api/book_content'

let st = null
let inited = false

export function saveProgress(step: any) {
  const rstep = JSON.stringify(step)
if(rstep.indexOf('start_part')<0){
	return
}
  if (st) {
    clearTimeout(st)
  }

  st = setTimeout(
    () =>
      bookContent.saveRstep(window.resource_id, rstep).then(() => (st = null)),
    2000
  )
}

export function restoreProgress(reset = false) {
  if (inited) {
    return
  }

  bookContent.rstep().then(({ posts }) => {
    const { article_id, start_part } = posts
    const data = { section: article_id, partcode: start_part }
    history.replaceState(data, null)   
    inited = true
  })
}
