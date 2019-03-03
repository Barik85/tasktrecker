const DATE_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

const getFormatDate = dateString => (
  new Date(dateString).toLocaleString('ru', DATE_OPTIONS)
);

export default getFormatDate;
