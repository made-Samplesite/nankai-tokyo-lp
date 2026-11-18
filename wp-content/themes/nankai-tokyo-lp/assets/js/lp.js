(function () {
  // 「無料査定」「無料相談」ボタンから来たら、フォームの「ご希望の内容」をあらかじめ選ぶ
  var WANT = { "査定": "無料査定を依頼したい", "相談": "無料相談をしたい", "両方": "査定と相談の両方" };
  document.querySelectorAll("[data-want]").forEach(function (a) {
    a.addEventListener("click", function () {
      var v = WANT[a.getAttribute("data-want")];
      if (!v) return;
      document.querySelectorAll('input[name="want"]').forEach(function (r) { r.checked = (r.value === v); });
    });
  });

  // 相談希望日は翌日以降
  var d = new Date(); d.setDate(d.getDate() + 1);
  var min = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  document.querySelectorAll('input[name="wish-date"]').forEach(function (i) { i.min = min; });

  // 送信完了：計測イベント＋（設定があれば）完了ページへ移動
  document.addEventListener("wpcf7mailsent", function (e) {
    var want = "";
    (e.detail && e.detail.inputs || []).forEach(function (i) { if (i.name === "want") want = i.value; });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "nklt_form_submit", nklt_want: want });
    if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { form: "nklt", want: want });
    if (window.NKLT && NKLT.thanksUrl) location.href = NKLT.thanksUrl;
  }, false);
})();
