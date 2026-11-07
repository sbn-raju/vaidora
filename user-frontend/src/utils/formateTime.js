export const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const formattedTime = date.toLocaleTimeString("en-IN", options);
  
    return formattedTime;
};