// stats.js — Единый скрипт аналитики для всех альбомов

let sessionId = localStorage.getItem('player_user_id');
if (!sessionId) {
  sessionId = 'Device-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  localStorage.setItem('player_user_id', sessionId);
}

const trackTimers = {};

export const sendToGoogle = (title, action, seconds = 0) => {
  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbw_njI0VBBu12L3qt5i3M73YM3jhEI5qhUGK0cyL-c5ISlG889ZUHPgh_irYWYE1dJ04w/exec";
  
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "Моб" : "ПК";
  const lang = navigator.language.split('-')[0]; 
  
  const payload = {
    userId: sessionId,
    title: title,
    action: action,
    seconds: seconds,
    info: `${isMobile} (${lang})`
  };

  fetch(googleScriptUrl, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload)
  }).catch(err => console.log("Ошибка статистики:", err));
};

export const stopTrackTimer = (trackTitle) => {
  if (trackTimers[trackTitle] && trackTimers[trackTitle].isPlaying) {
    const playedSeconds = Math.round((Date.now() - trackTimers[trackTitle].startTime) / 1000);
    if (playedSeconds > 0) {
      sendToGoogle(trackTitle, "Слушал трек (сек)", playedSeconds);
    }
    trackTimers[trackTitle].isPlaying = false;
  }
};

export const startTrackTimer = (trackTitle) => {
  // На всякий случай сбрасываем старый таймер этого же трека, если он почему-то завис
  if (trackTimers[trackTitle] && trackTimers[trackTitle].isPlaying) {
    stopTrackTimer(trackTitle);
  }
  trackTimers[trackTitle] = {
    startTime: Date.now(),
    isPlaying: true
  };
};