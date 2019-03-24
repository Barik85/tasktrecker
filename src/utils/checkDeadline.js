const checkDeadline = (date) => {
  const now = new Date();
  const deadline = new Date(date);

  return now < deadline;
};

export default checkDeadline;
