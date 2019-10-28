export default function drawUnderline(sections, scribing) {
  scribing.forEach(s => {
    const target = sections.find(sec =>
      sec.content.match(`partcode="${s.start_part}"`)
    )

    if (!target) {
      return
    }

    target.content = target.content.replace(
      s.excerpt,
      t =>
        `<span class="${s.type == 1 ? 'annotation' : 'underline'}">${t}</span>`
    )
  })
  return sections
}
