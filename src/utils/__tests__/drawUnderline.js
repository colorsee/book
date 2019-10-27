import drawUnderline from '../drawUnderline'

test('should add under decoration to the excerpt', () => {
  const sections = [
    {
      content: '<p partcode="10001">test abcd efg</p>',
    },
  ]

  const scribing = [
    {
      end_part: '10001',
      end_word: '4',
      start_part: '10001',
      start_word: '0',
      excerpt: 'test',
    },
  ]

  const actual = drawUnderline(sections, scribing)

  expect(actual[0].content).toEqual(
    '<p partcode="10001"><span class="underline">test</span> abcd efg</p>'
  )
})
