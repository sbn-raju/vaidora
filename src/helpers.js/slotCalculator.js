async function slotCalculator(start_time, end_time, time_duration) {
  let [end_hrs, end_mins] = end_time.split(":")
  let [start_hrs, start_mins] = start_time.split(":")

  if (end_hrs == 0) {
    end_hrs = 24
  }

  if (end_hrs > start_hrs) {
      if (end_mins > start_mins) {
        return slotCalculatorInner(
          end_hrs,
          start_hrs,
          end_mins,
          start_mins,
          time_duration
        )
      } else if (end_mins < start_mins) {
        return slotCalculatorInner(
          end_hrs - 1,
          start_hrs,
          start_mins,
          end_mins,
          time_duration
        )
      } else {
        return slotCalculatorInner(end_hrs, start_hrs, 0, 0, time_duration)
      }
  } 
  else if (end_hrs < start_hrs) 
    {
   
      if (end_mins > start_mins) {
        return slotCalculatorInner(
          start_hrs,
          end_hrs,
          end_mins,
          start_mins,
          time_duration
        )
      } else if (end_mins < start_mins) {
        return slotCalculatorInner(
          start_hrs -1,
          end_hrs,
          start_mins,
          end_mins,
          time_duration
        )
      } else {
        return slotCalculatorInner(start_hrs, end_hrs, 0, 0, time_duration)
      }
  } 
  else if(end_hrs == start_hrs)
  {
      if (end_mins > start_mins) {
        return slotCalculatorInnerForHour(end_mins, start_mins, time_duration)
      } else if (end_mins < start_mins) {
        return slotCalculatorInnerForHour(start_mins, end_mins, time_duration)
      } else {
        return slotCalculatorInnerForHour(0, 0, time_duration)
      }
  }
}

function slotCalculatorInner(
  hour_one,
  hour_two,
  mins_one,
  mins_two,
  time_duration
) {
  const slots =
    ((hour_one - hour_two) * 60 + (mins_one - mins_two)) / time_duration
  if (typeof slots == "number") {
    return slots
  } else {
    return Math.floor(slots) + 1
  }
}

function slotCalculatorInnerForHour(mins_one, mins_two, time_duration) {
  const slots = (mins_one - mins_two) / time_duration
  if (typeof slots == "number") {
    return slots
  } else {
    return Math.floor(slots) + 1
  }
}

module.exports = slotCalculator;

