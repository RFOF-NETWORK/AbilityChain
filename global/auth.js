// /global/auth.js
// AbilityChain – Global Authentication System
// Ultra-minimal, Blau+Gold, PZQQET-ready

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
// 3. INITIALISIERUNG (wird in jeder HTML-Seite aufgerufen)
// ------------------------------------------------------------
export function initAuthUI() {
  injectPopupIfMissing();
  attachPopupHandlers();
  updateAuthUI();
}


// ------------------------------------------------------------
// 4. POPUP INJEKTION (falls HTML es nicht enthält)
// ------------------------------------------------------------
function injectPopupIfMissing() {
  if (document.getElementById("auth-overlay")) return;

  const html = `
    <div id="auth-overlay" style="display:none;">
      <div id="auth-popup">
        <button id="auth-close">×</button>
        <h2 style="margin-top:0;">AbilityChain Login</h2>

        <div style="margin-bottom:10px;">
          <button id="auth-mode-login">Login</button>
          <button id="auth-mode-register">Register</button>
        </div>

        <div id="auth-login-box">
          <input id="login-user" placeholder="Username">
          <input id="login-pw1" type="password" maxlength="16" placeholder="Passwort (16 Zeichen)">
          <button id="login-btn">Login</button>
          <div id="login-msg" class="auth-msg"></div>
        </div>

        <div id="auth-register-box" style="display:none;">
          <input id="reg-user" placeholder="Username">
          <input id="reg-pw1" type="password" maxlength="16" placeholder="Passwort (16 Zeichen)">
          <input id="reg-pw2" type="password" maxlength="4" placeholder="2. Passwort (4 Zeichen)">
          <button id="reg-btn">Account erstellen</button>
          <div id="reg-msg" class="auth-msg"></div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", html);
}


// ------------------------------------------------------------
// 5. BUTTON SICHTBARKEIT
// ------------------------------------------------------------
function updateAuthUI() {
  const loggedIn = isLoggedIn();

  const loginBtn = document.querySelector("[data-auth='login']");
  const settingsBtn = document.querySelector("[data-auth='settings']");
  const logoutBtn = document.querySelector("[data-auth='logout']");

  if (loginBtn) loginBtn.style.display = loggedIn ? "none" : "inline-block";
  if (settingsBtn) settingsBtn.style.display = loggedIn ? "inline-block" : "none";
  if (logoutBtn) logoutBtn.style.display = loggedIn ? "inline-block" : "none";

  // Wallet UI sichtbar machen
  const walletUI = document.getElementById("wallet-ui");
  if (walletUI) walletUI.style.display = loggedIn ? "block" : "none";
}


// ------------------------------------------------------------
// 6. POPUP LOGIK
// ------------------------------------------------------------
function attachPopupHandlers() {
  const overlay = document.getElementById("auth-overlay");
  const popup = document.getElementById("auth-popup");
  if (!overlay || !popup) return;

  const openBtns = document.querySelectorAll("[data-auth='login']");
  const closeBtn = document.getElementById("auth-close");

  const loginBox = document.getElementById("auth-login-box");
  const registerBox = document.getElementById("auth-register-box");

  const modeLoginBtn = document.getElementById("auth-mode-login");
  const modeRegisterBtn = document.getElementById("auth-mode-register");

  // Öffnen
  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      overlay.style.display = "flex";
      setMode("login");
    });
  });

  // Schließen
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
    });
  }

  // Modus wechseln
  function setMode(mode) {
    if (mode === "login") {
      loginBox.style.display = "block";
      registerBox.style.display = "none";
    } else {
      loginBox.style.display = "none";
      registerBox.style.display = "block";
    }
  }

  if (modeLoginBtn) modeLoginBtn.addEventListener("click", () => setMode("login"));
  if (modeRegisterBtn) modeRegisterBtn.addEventListener("click", () => setMode("register"));


  // ------------------------------------------------------------
  // 7. REGISTER LOGIK (PZQQET‑READY)
  // ------------------------------------------------------------
  const regUser = document.getElementById("reg-user");
  const regPw1 = document.getElementById("reg-pw1");
  const regPw2 = document.getElementById("reg-pw2");
  const regBtn = document.getElementById("reg-btn");
  const regMsg = document.getElementById("reg-msg");

  if (regBtn) {
    regBtn.addEventListener("click", async () => {
      const u = regUser.value.trim();
      const p1 = regPw1.value;
      const p2 = regPw2.value;

      if (!u || p1.length !== 16 || p2.length !== 4) {
        regMsg.textContent = "Bitte Username, 16-stelliges PW und 4-stelliges PW eingeben.";
        return;
      }

      // --------------------------------------------------------
      // HIER wird später deine echte PZQQET‑0 Engine eingebunden
      // --------------------------------------------------------
      const user = {
        username: u,
        mask: "PZQQET_MASK_PLACEHOLDER",
        pw2_hint: true
      };

      saveUserSession(user);
      regMsg.textContent = "Account erstellt. Bitte jetzt einloggen.";
      setMode("login");
    });
  }


  // ------------------------------------------------------------
  // 8. LOGIN LOGIK (PZQQET‑READY)
  // ------------------------------------------------------------
  const loginUser = document.getElementById("login-user");
  const loginPw1 = document.getElementById("login-pw1");
  const loginBtn = document.getElementById("login-btn");
  const loginMsg = document.getElementById("login-msg");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const u = loginUser.value.trim();
      const p1 = loginPw1.value;

      if (!u || p1.length !== 16) {
        loginMsg.textContent = "Bitte Username und 16-stelliges Passwort eingeben.";
        return;
      }

      // --------------------------------------------------------
      // HIER wird später die echte PZQQET‑Login‑Validierung eingebaut
      // --------------------------------------------------------
      const user = {
        username: u,
        mask: "PZQQET_MASK_PLACEHOLDER",
        pw2_hint: true
      };

      saveUserSession(user);
      loginMsg.textContent = "Login erfolgreich.";
      overlay.style.display = "none";
    });
  }


  // ------------------------------------------------------------
  // 9. LOGOUT
  // ------------------------------------------------------------
  const logoutBtn = document.querySelector("[data-auth='logout']");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout();
    });
  }
}
