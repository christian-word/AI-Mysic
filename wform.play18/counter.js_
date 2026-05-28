(function() {
  const googleScriptUrl = "https://script.google.com/macros/s/AKfycby-2yyZ1Vg0j8EJ_dbhflGqKNpeFZcvgtruz-ZRxTfaXsplQni8pHJlJGrIDzfBoAlg/exec"; // Твой URL от Google
  let id = localStorage.getItem('p_id') || 'Device-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  localStorage.setItem('p_id', id);
  const inf = (/Mobi|Android|iPhone/i.test(navigator.userAgent) ? "Моб" : "ПК") + " (" + navigator.language.split('-')[0] + ")";
  
  // Создаем запрос-картинку в памяти
  new Image().src = `${googleScriptUrl}?uid=${encodeURIComponent(id)}&act=${encodeURIComponent(document.title || "Просмотр")}&inf=${encodeURIComponent(inf)}`;
})();
