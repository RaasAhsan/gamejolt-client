
let notify = (title, subtitle, callback) => {
  let notification = new Notification(title, {body: subtitle});
  notification.onclick = callback;
}

module.exports = notify;
