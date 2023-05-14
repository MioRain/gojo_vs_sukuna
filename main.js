const gojo = document.querySelector('.gojo')
const gojoBar = document.querySelector('.gojo-bar')
const sukuna = document.querySelector('.sukuna')
const sukunaBar = document.querySelector('.sukuna-bar')
const vote = document.querySelector('.vote')
const close = document.querySelector('.close')
const submit = document.querySelector('.submit')

const url = 'https://script.google.com/macros/s/AKfycbyT8jwZ-XwiyCngerESkJgOpwv0unh1KYI5ZMaEUh_RrKEpDbnmmMxg-_I693SBr4SC/exec'
let time = ''
let voter = ''
let supporter = ''
let content = ''

voteCounting()

async function voteCounting() {
  let gojoCount = 0
  let sukunaCount = 0
  await $.get(url, function (e) {
    e.forEach((name) => {
      if (name[0] === '五條') {
        gojoCount++
      } else if (name[0] === '宿儺') {
        sukunaCount++
      }
    })
  })
  let deno = gojoCount + sukunaCount
  gojoBar.innerText = String(gojoCount / deno).slice(2, 4) + '%'
  gojoBar.style.width = `${String(gojoCount / deno).slice(2, 4)}%`
  sukunaBar.innerText = String(sukunaCount / deno).slice(2, 4) + '%'
  sukunaBar.style.width = `${String(sukunaCount / deno).slice(2, 4)}%`
}


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
    $.post(url, {
      time: time,
      voter: voter,
      supporter: supporter,
      content: content
    }, function (e) {
      console.log(e)
    })
    localStorage.setItem('voted', true)
    alert('投票完成')
    close.click()
  } else {
    alert('請輸入暱稱與留言')
  }
})







