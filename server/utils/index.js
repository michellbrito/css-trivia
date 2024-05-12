function formatDay(day) {
  return day < 10 ? `0${day}` : day
}

module.exports = { formatDay }
