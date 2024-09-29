const { sendAppointmentAlertMessage, sendAppointmentLinkMessage } = require("../services/messages.services.js");
const { formatDate } = require("./formateDate.js");

const appointmentAlertMessageSender = async (numbers) => {
  try {
    const responses = await Promise.all(
      numbers.map(async (number) => {
        const newDate = formatDate(number.date);
        const response = await sendAppointmentAlertMessage(
          number.to,
          newDate,
          number.time
        );
        console.log(`Response for ${number.to}:`, response);
        return response;
      })
    );
    const errors = responses.filter(
      (response) => response.errorMessage || response.errorCode
    );
    if (errors.length > 0) {
      console.error("Errors occurred during sending messages:", errors);
      return "error";
    }

    return "ok";
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return "error";
  }
};

const appointmentLinkSender = async (numbers) => {
  try {
    const responses = await Promise.all(
      numbers.map(async (number) => {
        const response = await sendAppointmentLinkMessage(
          number.to,
          number.link
        );
        console.log(`Response for ${number.to}:`, response);
        return response;
      })
    );
    const errors = responses.filter(
      (response) => response.errorMessage || response.errorCode
    );
    if (errors.length > 0) {
      console.error("Errors occurred during sending messages:", errors);
      return "error";
    }

    return "ok";
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return "error";
  }
};

module.exports = {
  appointmentAlertMessageSender,
  appointmentLinkSender
};
