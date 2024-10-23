import moment from "moment";
export const handleDate = (isoDate) => {
  const formattedDate = moment(isoDate).format("MMMM DD, YYYY, h:mm A");
  return formattedDate;
};
