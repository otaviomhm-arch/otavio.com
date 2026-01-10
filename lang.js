const translations = {
  pt: {
    comments_title: "Comentários",
    name: "Seu nome",
    comment: "Escreva algo legal...",
    post_btn: "Postar",
    contact_title: "Entre em contato",
    send_btn: "Enviar mensagem"
  },
  en: {
    comments_title: "Comments",
    name: "Your name",
    comment: "Write something nice...",
    post_btn: "Post",
    contact_title: "Contact Me",
    send_btn: "Send message"
  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

// idioma inicial
const savedLang = localStorage.getItem("lang") || "pt";
setLanguage(savedLang);
