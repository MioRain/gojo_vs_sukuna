const gojo = document.querySelector('.gojo')
const sukuna = document.querySelector('.sukuna')
const vote = document.querySelector('.vote')
const close = document.querySelector('.close')
const submit = document.querySelector('.submit')

const postUrl = 'https://script.google.com/macros/s/AKfycbwFLz67VS_dxKgAnbFguTcWMD6YYS8bGm3wPaIM5a_p6yrxXRHNzgJPVyWUbHjGQd1w/exec'
let time = ''
let voter = ''
let supporter = ''
let content = ''

gojo.addEventListener('click', () => {
  if (JSON.parse(localStorage.getItem('voted'))) {
    alert('已經投過票囉')
  } else {
    vote.click()
    sukuna.classList.add('transparency')
    supporter = '五條'
  }
})

sukuna.addEventListener('click', () => {
  if (JSON.parse(localStorage.getItem('voted'))) {
    alert('已經投過票囉')
  } else {
    vote.click()
    gojo.classList.add('transparency')
    supporter = '宿儺'
  }
})

close.addEventListener('click', () => {
  sukuna.classList.remove('transparency')
  gojo.classList.remove('transparency')
})

submit.addEventListener('click', () => {
  const today = new Date()
  const todayData = {
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1).padStart(2, '0'),
    date: String(today.getDate()).padStart(2, '0'),
    hour: String(today.getHours()).padStart(2, '0'),
    minute: String(today.getMinutes()).padStart(2, '0')
  }
  time = `${todayData.year}/${todayData.month}/${todayData.date} ${todayData.hour}:${todayData.minute}`
  voter = document.querySelector('.voter').value
  content = document.querySelector('.content').value

  if (voter && content) {
    $.post(postUrl, {
      time: time,
      voter: voter,
      supporter: supporter,
      content: content
    }, function (e) {
      console.log(e);
    });
    localStorage.setItem('voted', true)
    alert('投票完成')
    close.click()
  } else {
    alert('請輸入暱稱與留言')
  }
})







