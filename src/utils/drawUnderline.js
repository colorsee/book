export default function drawUnderline(sections, scribing) {
  return sections.map(sec => {
    const target = { ...sec }

    scribing
      .filter(s => sec.content.match(`partcode="${s.start_part}"`))
      .forEach(s => {
        target.content = target.content.replace(
          s.excerpt,
          t =>
            `<span class="${
              s.type == 1 ? 'annotation' : 'underline'
            }">${t}<i class='fa fa-thumb-tack bouncedfa'></i></span>`
        )
      })

    return target
  })
}
