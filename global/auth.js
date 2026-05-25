// /global/auth.js
// AbilityChain – Global Authentication System (Hybrid Version)
// Ultra-minimal, Blau+Gold, PZQQET-ready

import { PZQQETFUSIONMASTER } from "../wallet/pzqqet-0_standard.js";

// ------------------------------------------------------------
// 1. GLOBAL STORAGE KEY
// ------------------------------------------------------------
const ABILITY_USER_KEY = "ability.user";


// ------------------------------------------------------------
// 2. USER SESSION HANDLING
// ------------------------------------------------------------
export function getCurrentUser() {
  const raw = localStorage.getItem(ABILITY_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  const u = getCurrentUser();
  return !!(u && u.loggedIn);
}

export function saveUserSession(user) {
  localStorage.setItem(
    ABILITY_USER_KEY,
    JSON.stringify({ ...user, loggedIn: true })
  );
  updateAuthUI();
}

export function logout() {
  localStorage.removeItem(ABILITY_USER_KEY);
  updateAuthUI();
  window.location.reload();
}


// ------------------------------------------------------------
// 3. INITIALISIERUNG
// ------------------------------------------------------------
export function initAuthUI() {
  injectPopupIfMissing();
  updateAuthUI();
}


// ------------------------------------------------------------
// 4. HYBRID POPUP LOADER (fetch + Fallback + Statusmeldung)
// ------------------------------------------------------------
function injectPopupIfMissing() {
  // Statische Version vorhanden?
  if (document.getElementById("auth-overlay")) {
    showPopupStatus("Static popup.html aktiv.");
    attachPopupHandlers();
    return;
  }

  // Dynamische Version laden
  fetch("./popup.html")
    .then(r => {
      if (!r.ok) throw new Error("popup.html nicht gefunden");
      return r.text();
    })
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);
      showPopupStatus("popup.html erfolgreich geladen.");
      attachPopupHandlers();
    })
    .catch(err => {
      console.warn("popup.html Fehler:", err);
      showPopupStatus("popup.html NICHT geladen – statische Version erforderlich.");
    });
}


// ------------------------------------------------------------
// 5. STATUSMELDUNG (DOM + Konsole)
// ------------------------------------------------------------
function showPopupStatus(msg) {
  console.log("[AUTH STATUS]", msg);

  let box = document.getElementById("auth-status-box");
  if (!box) {
    box = document.createElement("div");
    box.id = "auth-status-box";
    box.style.position = "fixed";
    box.style.bottom = "10px";
    box.style.right = "10px";
    box.style.background = "#000";
    box.style.color = "#FFD700";
    box.style.border = "1px solid #FFD700";
    box.style.padding = "6px 10px";
    box.style.fontSize = "12px";
    box.style.zIndex = "99999";
    document.body.appendChild(box);
  }

  box.textContent = msg;
}


// ------------------------------------------------------------
// 6. SEED GENERATOR (EINMALIG)
// ------------------------------------------------------------
function generateSeeds() {
  const pool = PZQQETFUSIONMASTER.Axioms.wordPool;

  const seed12 = Array.from({ length: 12 }, () =>
    pool[Math.floor(Math.random() * pool.length)]
  );

  const seed24 = Array.from({ length: 24 }, () =>
    pool[Math.floor(Math.random() * pool.length)]
  );

  return { seed12, seed24 };
}


// ------------------------------------------------------------
// 7. POPUP LOGIK
// ------------------------------------------------------------
function attachPopupHandlers() {
  const overlay = document.getElementById("auth-overlay");
  if (!overlay) return;

  const loginBox = document.getElementById("auth-login-box");
  const registerBox = document.getElementById("auth-register-box");

  const modeLoginBtn = document.getElementById("auth-mode-login");
  const modeRegisterBtn = document.getElementById("auth-mode-register");

  const closeBtn = document.getElementById("auth-close");
  if (closeBtn) closeBtn.onclick = () => (overlay.style.display = "none");

  function setMode(mode) {
    loginBox.style.display = mode === "login" ? "block" : "none";
    registerBox.style.display = mode === "register" ? "block" : "none";
  }

  if (modeLoginBtn) modeLoginBtn.onclick = () => setMode("login");
  if (modeRegisterBtn) modeRegisterBtn.onclick = () => setMode("register");

  document.querySelectorAll("[data-auth='login']").forEach(btn => {
    btn.onclick = () => {
      overlay.style.display = "flex";
      setMode("login");
    };
  });


  // ------------------------------------------------------------
  // 8. REGISTER LOGIK — MIT SEEDS
  // ------------------------------------------------------------
  const regUser = document.getElementById("reg-user");
  const regPw1 = document.getElementById("reg-pw1");
  const regPw2 = document.getElementById("reg-pw2");
  const regBtn = document.getElementById("reg-btn");
  const regMsg = document.getElementById("reg-msg");

  if (regBtn) {
    regBtn.onclick = () => {
      const u = regUser.value.trim();
      const p1 = regPw1.value;
      const p2 = regPw2.value;

      if (!u || p1.length !== 16 || p2.length !== 4) {
        regMsg.textContent = "Bitte Username, 16-stelliges PW und 4-stelliges PW eingeben.";
        return;
      }

      // EINMALIGE SEED GENERIERUNG
      const { seed12, seed24 } = generateSeeds();

      const user = {
        username: u,
        pw1: p1,
        pw2: p2,
        mask: crypto.randomUUID().slice(0, 8).toUpperCase(),
        seed12,
        seed24
      };

      saveUserSession(user);
      regMsg.textContent = "Account erstellt. Bitte jetzt einloggen.";
      setMode("login");
    };
  }


  // ------------------------------------------------------------
  // 9. LOGIN LOGIK
  // ------------------------------------------------------------
  const loginUser = document.getElementById("login-user");
  const loginPw1 = document.getElementById("login-pw1");
  const loginBtn = document.getElementById("login-btn");
  const loginMsg = document.getElementById("login-msg");

  if (loginBtn) {
    loginBtn.onclick = () => {
      const u = loginUser.value.trim();
      const p1 = loginPw1.value;

      if (!u || p1.length !== 16) {
        loginMsg.textContent = "Bitte Username und 16-stelliges Passwort eingeben.";
        return;
      }

      const stored = getCurrentUser();

      if (!stored || stored.username !== u || stored.pw1 !== p1) {
        loginMsg.textContent = "Login fehlgeschlagen.";
        return;
      }

      saveUserSession(stored);
      loginMsg.textContent = "Login erfolgreich.";
      overlay.style.display = "none";
    };
  }
}
