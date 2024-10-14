export default getGreeting = (name=null) => {
  const hours = new Date().getHours()
  var message = ""
  if (hours < 3 || hours >= 22) {
    message = "Whooo's a night owl?"
  } else if (hours >= 3 && hours < 6) {
    message = "Hi, early bird!"
  } else if (hours >= 6 && hours < 12) {
    message = `Good morning${name ? ", "+name : ""}`
  } else if (hours >= 12 && hours < 17) {
    message = `Good afternoon${name ? ", "+name : ""}`
  } else if (hours >= 17 && hours < 22) {
    message = `Good evening${name ? ", "+name : ""}`
  }
  return message
}