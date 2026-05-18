let use12h = false;
let colonVisible = true;
let prevSec = -1;

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

function pad(n) {
  return String(n).padStart(2, '0');
}

function toggleMode() {
  use12h = !use12h;
}

function buildDayDots(dayIndex) {
  const container = document.getElementById('dayDots');
  container.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const dot = document.createElement('div');
    dot.className = 'day-dot' + (i === dayIndex ? ' active' : '');
    container.appendChild(dot);
  }
}

function getTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz.split('/').pop().replace(/_/g, ' ');
  } catch (e) {
    return 'Local';
  }
}

document.getElementById('tzBadge').textContent = getTimezone();

function tick() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const day = now.getDay();
  const date = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  let displayH = h;
  let ampmText = '';

  if (use12h) {
    ampmText = h >= 12 ? 'PM' : 'AM';
    displayH = h % 12 || 12;
  }

  document.getElementById('hours').textContent = pad(displayH);
  document.getElementById('minutes').textContent = pad(m);
  document.getElementById('seconds').textContent = pad(s);
  document.getElementById('ampm').textContent = ampmText;
  document.getElementById('secBar').style.width = (s / 59 * 100) + '%';
  document.getElementById('dateDisplay').textContent =
    days[day] + ' — ' + months[month] + ' ' + date + ', ' + year;

  buildDayDots(day);

  colonVisible = !colonVisible;
  document.getElementById('colon1').classList.toggle('blink', !colonVisible);
  document.getElementById('colon2').classList.toggle('blink', !colonVisible);

  if (s !== prevSec) {
    const sEl = document.getElementById('seconds');
    sEl.classList.add('tick');
    setTimeout(() => sEl.classList.remove('tick'), 120);
    prevSec = s;
  }
}

tick();
setInterval(tick, 500);