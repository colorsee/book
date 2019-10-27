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
      s => `<span class="underline">${s}</span>`
    )
  })
  return sections
}
