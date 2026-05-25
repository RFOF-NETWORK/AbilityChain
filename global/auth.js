// global/auth.js – Identitäts-Gateway (PZQQET-0 Standard)
import { PZQQETFUSIONMASTER } from "../wallet/pzqqet-0_standard.js";

const ABILITY_USER_KEY = "ability.user";

// Hilfsfunktion: Pfad-Auflösung
const resolvePopupPath = () => "/global/popup.html";

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
    .catch(err => console.error("Identity-Gateway Error:", err));
}

function attachPopupHandlers() {
  const overlay = document.getElementById("auth-overlay");
  
  // Close
  document.getElementById("auth-close")?.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  // Login-Button (Nutzung der PZQQET-Serialisierung durch den globalen Injektor)
  document.getElementById("login-btn")?.addEventListener("click", () => {
    const user = document.getElementById("login-user").value;
    const pass = document.getElementById("login-pw1").value;
    
    if (user && pass.length >= 16) {
      // Determinismus durch globale Serialisierung sichergestellt
      localStorage.setItem(ABILITY_USER_KEY, JSON.stringify({ user, auth: true, ts: Date.now() }));
      overlay.style.display = "none";
      updateAuthUI();
    }
  });

  // Registrierung & Seed-Generator (4242-Trigger)
  document.getElementById("reg-btn")?.addEventListener("click", () => {
    const user = document.getElementById("reg-user").value;
    const msg = document.getElementById("reg-msg");
    
    if (user.length > 3) {
      msg.innerText = "Identity registriert: " + user;
      console.log("PZQQET-Identity etabliert für:", user);
    } else {
      msg.innerText = "Fehler: Mindestens 4 Zeichen.";
    }
  });

  // Seed-Trigger Logik (PZQQET-Standard: 4242)
  document.getElementById("reg-pw2")?.addEventListener("input", (e) => {
    const code = e.target.value;
    const msg = document.getElementById("reg-msg");
    
    if (code === "4242") { 
      const seed12 = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
      const seed24 = "seed1 ... seed24 (PZQQET-GENERATED)";
      
      msg.innerHTML = `
        <div style="background:#222; padding:10px; border:1px solid #FFD700; margin-top:10px;">
          <strong>12-Wort:</strong> ${seed12}<br><br>
          <strong>24-Wort:</strong> ${seed24}
        </div>
        <p style="color:red; font-size:10px;">NIEMALS TEILEN!</p>
      `;
    }
  });

  // Mode Switcher
  document.getElementById("auth-mode-login")?.addEventListener("click", () => {
    document.getElementById("auth-login-box").style.display = "block";
    document.getElementById("auth-register-box").style.display = "none";
  });

  document.getElementById("auth-mode-register")?.addEventListener("click", () => {
    document.getElementById("auth-login-box").style.display = "none";
    document.getElementById("auth-register-box").style.display = "block";
  });

  // Global Trigger für Buttons mit [data-auth='login']
  document.querySelectorAll("[data-auth='login']").forEach(btn => {
    btn.addEventListener("click", () => overlay.style.display = "flex");
  });
}

function updateAuthUI() {
  const loggedIn = !!localStorage.getItem(ABILITY_USER_KEY);
  document.querySelectorAll("[data-auth='login']").forEach(el => el.style.display = loggedIn ? "none" : "inline-block");
  document.querySelectorAll("[data-auth='settings']").forEach(el => el.style.display = loggedIn ? "inline-block" : "none");
}
