// /global/auth.js
import { PZQQETFUSIONMASTER } from "../wallet/pzqqet-0_standard.js";

const ABILITY_USER_KEY = "ability.user";

function resolvePopupPath() {
  return "/global/popup.html"; // Fix: Absolute Pfad-Referenz für Stabilität
}

export function initAuthUI() {
  injectPopup();
}

function injectPopup() {
  if (document.getElementById("auth-overlay")) return;

  fetch(resolvePopupPath())
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);
      attachPopupHandlers();
      updateAuthUI();
    })
    .catch(err => console.error("Popup konnte nicht geladen werden:", err));
}

function attachPopupHandlers() {
  const overlay = document.getElementById("auth-overlay");
  const loginBox = document.getElementById("auth-login-box");
  const registerBox = document.getElementById("auth-register-box");
  
  // Close Handler
  document.getElementById("auth-close")?.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  // Mode Switcher
  document.getElementById("auth-mode-login")?.addEventListener("click", () => {
    loginBox.style.display = "block";
    registerBox.style.display = "none";
  });

  document.getElementById("auth-mode-register")?.addEventListener("click", () => {
    loginBox.style.display = "none";
    registerBox.style.display = "block";
  });

  // Global Trigger (Der Button auf deiner Seite)
  document.querySelectorAll("[data-auth='login']").forEach(btn => {
    btn.addEventListener("click", () => {
      overlay.style.display = "flex";
    });
  });

  // Registrierung & Login Logik...
  document.getElementById("reg-btn")?.addEventListener("click", () => {
     // Deine Logik hier bleibt bestehen
     console.log("Registrierung gestartet...");
  });
}

function updateAuthUI() {
  const loggedIn = !!localStorage.getItem(ABILITY_USER_KEY);
  document.querySelectorAll("[data-auth='login']").forEach(el => el.style.display = loggedIn ? "none" : "inline-block");
  document.querySelectorAll("[data-auth='settings']").forEach(el => el.style.display = loggedIn ? "inline-block" : "none");
}
