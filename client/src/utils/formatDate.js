function formatDate(date) {
  return new Intl.DateTimeFormat().format(new Date(date));
}

export const formatIso = date => {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(new Date(date));
};

export default formatDate;
