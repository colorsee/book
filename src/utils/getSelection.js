// @flow
export default function getSelection() {
  const sel = document.getSelection()
  const value = sel.toString()

  const { anchorNode, anchorOffset, focusNode, extentOffset } = sel
  const anchorPart = $(anchorNode).parent()
  const extentPart = $(focusNode).parent()
  const article = anchorPart.parents('div.paragraphs')

  const article_id = article.data('id')
  let start_part = anchorPart.data('partcode')
  let end_part = extentPart.data('partcode')
  let start_word = anchorOffset
  let end_word = extentOffset

  if (start_part > end_part) {
    ;[start_part, end_part] = [end_part, start_part]
    ;[start_word, end_word] = [end_word, start_word]
  }

  console.log(start_part, end_part)

  return {
    article_id,
    start_part,
    start_word,
    end_part,
    end_word,
    value,
  }
}
