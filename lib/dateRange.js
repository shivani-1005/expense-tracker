// `${month}-01` (e.g. "2026-08-01") is parsed as UTC midnight per the JS
// spec, so we stay in UTC throughout instead of mixing in local-timezone
// getters/setters - otherwise the range can silently shift by a day
// depending on the server's timezone.
const getMonthDateRange = (month) => {
  const startDate = new Date(`${month}-01T00:00:00.000Z`);
  const endDate = new Date(startDate);
  endDate.setUTCMonth(endDate.getUTCMonth() + 1);
  return { startDate, endDate };
};

module.exports = { getMonthDateRange };
