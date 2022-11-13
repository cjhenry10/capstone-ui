const convertDate = (date) => {
    const jsDate = new Date(date);
    const newDate = jsDate.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
    return newDate;
  };

export default convertDate;