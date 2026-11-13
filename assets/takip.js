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

  // İletişim formu (data-form-title="Form Name"): mesajı WhatsApp'a hazır metin
  // olarak açar ve form dönüşümünü gönderir. Abone (bülten) formuna dokunmaz.
  var WA_NUMARA = '905421589458';
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || !f.matches || !f.matches('form[data-form-title="Form Name"]')) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (f.reportValidity && !f.reportValidity()) return;

    function deger(ad) {
      var el = f.querySelector('[name="' + ad + '"]');
      return el ? String(el.value || '').trim() : '';
    }
    var satirlar = ['Merhaba, web sitesindeki form üzerinden yazıyorum.'];
    var alanlar = [['Ad', 'name'], ['Telefon', 'phone'], ['E-posta', 'email'], ['Konu', 'subject']];
    alanlar.forEach(function (a) {
      var v = deger(a[1]);
      if (v) satirlar.push(a[0] + ': ' + v);
    });
    var mesaj = deger('message');
    if (mesaj) satirlar.push('', mesaj);
    var url = 'https://wa.me/' + WA_NUMARA + '?text=' + encodeURIComponent(satirlar.join('\n'));

    gonder('form', 'generate_lead', { form_name: 'iletisim_whatsapp' });

    var uyari = f.querySelector('[data-form-alert]');
    if (uyari) {
      uyari.textContent = 'WhatsApp açılıyor… Açılmazsa 0542 158 94 58 numarasına yazabilirsiniz.';
      uyari.removeAttribute('hidden');
    }
    var w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (x) {} } else { window.location.href = url; }
  }, true);
})();
