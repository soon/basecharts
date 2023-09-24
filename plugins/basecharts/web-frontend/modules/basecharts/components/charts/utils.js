export function getChartTitle(view) {
  let title = view?.name
  if (title === 'Grid') {
    title = view.table?.name
  }
  return title ?? ''
}
