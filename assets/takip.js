/* Beta Cam Filmi — dönüşüm takibi (GA4 G-FZESXNMDZ9 + Google Ads AW-18499632605)
   Telefon tıklama, WhatsApp tıklama ve iletişim formu gönderimi.
   Abone (bülten) formu sayılmaz. Linkin varsayılan davranışı engellenmez. */
(function () {
  'use strict';
  var AW = 'AW-18499632605';
  var ETIKET = {
    telefon: AW + '/UIYvCNjO8rcdEN37p_VE',
    whatsapp: AW + '/ZBmxCNvO8rcdEN37p_VE',
    form: AW + '/0WbvCN7O8rcdEN37p_VE'
  };

  function gonder(tur, ga4Olay, ekstra) {
    if (typeof window.gtag !== 'function') return;
    var p = { transport_type: 'beacon' };
    for (var k in ekstra || {}) p[k] = ekstra[k];
    window.gtag('event', ga4Olay, p);
    window.gtag('event', 'conversion', { send_to: ETIKET[tur], transport_type: 'beacon' });
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('tel:') === 0) {
      gonder('telefon', 'arama_tiklama', { link_url: h });
    } else if (/(^|\/\/)(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/.test(h) || h.indexOf('whatsapp://') === 0) {
      gonder('whatsapp', 'whatsapp_tiklama', { link_url: h });
    }
  }, true);

  // İletişim formu (data-form-title="Form Name"): formoid başarı uyarısındaki
  // hidden kalkınca bir kez dönüşüm gönder.
  function formlariIzle() {
    var formlar = document.querySelectorAll('form[data-form-title="Form Name"]');
    Array.prototype.forEach.call(formlar, function (f) {
      var uyari = f.querySelector('[data-form-alert]');
      if (!uyari || !window.MutationObserver) return;
      var gonderildi = false;
      new MutationObserver(function () {
        if (!gonderildi && !uyari.hasAttribute('hidden')) {
          gonderildi = true;
          gonder('form', 'generate_lead', { form_name: 'iletisim' });
        }
      }).observe(uyari, { attributes: true, attributeFilter: ['hidden'] });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', formlariIzle);
  } else {
    formlariIzle();
  }
})();
