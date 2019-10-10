// @flow
export default function getSelection() {
  const sel = document.getSelection()
  const value = sel.toString()

  console.log(sel)

  const { anchorNode, anchorOffset, focusNode, focusOffset } = sel
  const anchorPart = $(anchorNode).parent()
  const extentPart = $(focusNode).parent()
  const [article] = $(anchorPart).prevAll('[id]')

  const [, article_id] = article.id.match(/^section-(\d+)$/)
  let start_part = anchorPart.data('partcode')
  let end_part = extentPart.data('partcode')
  let start_word = anchorOffset
  let end_word = focusOffset

  if (start_part > end_part) {
    ;[start_part, end_part] = [end_part, start_part]
    ;[start_word, end_word] = [end_word, start_word]
  }

  return {
    article_id: parseInt(article_id),
    start_part,
    start_word,
    end_part,
    end_word,
    value,
  }
}
