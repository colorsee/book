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
      } else {
        const parent = map.get(current.parent_id)
        if (!parent) {
          console.log(map)
          return
        }
        current.level = parent.level + 1
      }

      map.set(current.id, current)
    })

    return [...map.values()]
  }
}
