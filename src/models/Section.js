// @flow
export default class Section {
  level: number
  id: number
  title: string
  content: string
  parent_id: number

  constructor(props: Section) {
    Object.assign(this, props)
  }

  static list(items: Section[]) {
    const map = new Map<number, Section>()

    items.forEach(i => {
      const current = new Section(i)

      if (!current.parent_id) {
        current.level = 0
        map.set(current.id, current)
        return
      }

      const parent = map.get(current.parent_id)
      current.level = parent ? parent.level + 1 : 2
      map.set(current.id, current)
    })

    const complicated = [...map.values()]
    const merged = complicated.reduce((sum, cur) => {
      if (!sum.length) {
        sum.push(cur)
        return sum
      }

      const last = sum[sum.length - 1]

      if (last.level === 0 || cur.level > 1) {
        const h = `h${cur.level + 1}`
        last.content +=
          `<${h} id="section-${cur.id}">${cur.title}</${h}>` + cur.content
        return sum
      }

      sum.push(cur)
      return sum
    }, [])

    return merged
  }
}
