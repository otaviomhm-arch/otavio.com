/* ================= DARK MODE ================= */
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    if (toggleBtn) {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            body.classList.add("dark");
            toggleBtn.textContent = "☀️";
        } else {
            toggleBtn.textContent = "🌙";
        }

        toggleBtn.addEventListener("click", () => {
            body.classList.toggle("dark");
            const isDark = body.classList.contains("dark");
            toggleBtn.textContent = isDark ? "☀️" : "🌙";
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    loadComments();
});

/* ================= COMMENTS ================= */
function loadComments() {
    const commentsList = document.getElementById("comments-list");
    if (!commentsList) return;

    const saved = JSON.parse(localStorage.getItem("comments")) || [];
    commentsList.innerHTML = "";
    saved.forEach(renderComment);
}

function saveComment(comment) {
    const saved = JSON.parse(localStorage.getItem("comments")) || [];
    saved.unshift(comment); // adiciona no topo
    localStorage.setItem("comments", JSON.stringify(saved));
}

function renderComment({ name, message, photo }) {
    const commentsList = document.getElementById("comments-list");
    if (!commentsList) return;

    const comment = document.createElement("div");
    comment.className = "comment";

    const avatar = document.createElement("div");
    avatar.className = "avatar-circle";

    if (photo) {
        const img = document.createElement("img");
        img.src = photo;
        avatar.appendChild(img);
    } else {
        avatar.textContent = name.charAt(0).toUpperCase();
    }

    const content = document.createElement("div");
    content.className = "comment-content";
    content.innerHTML = `<strong>${name}</strong><span>${message}</span>`;

    comment.appendChild(avatar);
    comment.appendChild(content);
    commentsList.appendChild(comment);
}


function postComment() {
    const nameInput = document.getElementById('c-name');
    const messageInput = document.getElementById('c-message');
    const photoInput = document.getElementById('c-photo');
    const commentsList = document.getElementById('comments-list');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const photoFile = photoInput.files[0];

    if (!name || !message) {
        alert("Por favor, preencha seu nome e mensagem.");
        return;
    }

    // Cria o container do comentário
    const comment = document.createElement('div');
    comment.classList.add('comment');

    // Avatar
    const avatar = document.createElement('div');
    avatar.classList.add('avatar-circle');

    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            avatar.appendChild(img);
        };
        reader.readAsDataURL(photoFile);
    } else {
        // Se não enviar foto, coloca a primeira letra do nome
        avatar.textContent = name.charAt(0).toUpperCase();
    }

    // Conteúdo do comentário
    const content = document.createElement('div');
    content.classList.add('comment-content');
    content.innerHTML = `<strong>${name}</strong><span>${message}</span>`;

    // Adiciona avatar + conteúdo ao comentário
    comment.appendChild(avatar);
    comment.appendChild(content);

    // Adiciona comentário à lista (no topo)
    commentsList.prepend(comment);

    // Limpa formulário
    nameInput.value = '';
    messageInput.value = '';
    photoInput.value = '';
}

// Previne envio do formulário por Enter
document.querySelector('.comments-form').addEventListener('submit', function(e){
    e.preventDefault();
    postComment();
});

const langBtn = document.getElementById("lang-btn");
const dropdown = document.querySelector(".lang-dropdown");

langBtn.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("lang-btn");
  const dropdown = document.querySelector(".lang-dropdown");

  if (!langBtn || !dropdown) {
    console.error("Botão de idioma não encontrado");
    return;
  }

  langBtn.addEventListener("click", () => {
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });
});


function changeLang(lang) {
  localStorage.setItem("lang", lang);

  document.getElementById("lang-btn").innerText =
    lang === "pt" ? "🇧🇷 Português" : "🇺🇸 English";

  document.querySelector(".lang-dropdown").style.display = "none";

  // aqui você chama sua função de tradução
  if (typeof setLanguage === "function") {
    setLanguage(lang);
  }
}



