const API_URL = "http://127.0.0.1:5000/api";
let currentUser = null;
let chatPollInterval = null;
let currentLang = 'en';

// DICTIONNAIRE MULTILINGUE
const i18n = {
    en: {
        reg_email: "Email Address", reg_country: "Country", reg_phone: "Phone Number", reg_pass: "Password", reg_pass2: "Confirm Password", btn_register: "CREATE ACCOUNT", lnk_to_login: "Sign In",
        login_id: "Email / Phone Number", login_pass: "Password", btn_login: "LOG IN", lnk_to_reg: "Create Account",
        solde1: "Total Balance 1", solde2: "Total Balance 2", btn_not_active: "ACCOUNT NOT ACTIVATED<br>ACTIVATE NOW", btn_withdraw: "WITHDRAWAL",
        menu_pass: "Login Password", menu_service: "Customer Service", menu_tx: "Transaction Details",
        act_nom: "LAST NAME", act_prenom: "FIRST NAME", act_sexe: "GENDER", act_country: "Country", act_phone: "Phone Number", act_submit: "SUBMIT",
        chat_placeholder: "Type a message...", chat_send: "Send"
    },
    fr: {
        reg_email: "Adresse Email", reg_country: "Pays", reg_phone: "Numéro Téléphone", reg_pass: "Mot de passe", reg_pass2: "Confirmer Mot de passe", btn_register: "CRÉER UN COMPTE", lnk_to_login: "Connexion",
        login_id: "Email / Numéro Téléphone", login_pass: "Mot de passe", btn_login: "CONNEXION", lnk_to_reg: "Créer un compte",
        solde1: "Solde Total 1", solde2: "Solde Total 2", btn_not_active: "COMPTE NON ACTIVÉ<br>ACTIVÉ MAINTENANT", btn_withdraw: "RETRAIT",
        menu_pass: "Mot de passe", menu_service: "Service Client", menu_tx: "Détails Transaction",
        act_nom: "NOM", act_prenom: "PRÉNOM", act_sexe: "SEXE", act_country: "Pays", act_phone: "Téléphone", act_submit: "ENVOYER",
        chat_placeholder: "Écrivez un message...", chat_send: "Envoyer"
    },
    es: {
        reg_email: "Correo Electrónico", reg_country: "País", reg_phone: "Teléfono", reg_pass: "Contraseña", reg_pass2: "Confirmar Contraseña", btn_register: "CREAR CUENTA", lnk_to_login: "Iniciar Sesión",
        login_id: "Correo / Teléfono", login_pass: "Contraseña", btn_login: "ACCEDER", lnk_to_reg: "Crear Cuenta",
        solde1: "Saldo Total 1", solde2: "Saldo Total 2", btn_not_active: "CUENTA NO ACTIVADA<br>ACTIVAR AHORA", btn_withdraw: "RETIRO",
        menu_pass: "Contraseña", menu_service: "Atención al Cliente", menu_tx: "Transacciones",
        act_nom: "APELLIDO", act_prenom: "NOMBRE", act_sexe: "GÉNERO", act_country: "País", act_phone: "Teléfono", act_submit: "ENVIAR",
        chat_placeholder: "Escribe un mensaje...", chat_send: "Enviar"
    },
    de: {
        reg_email: "E-Mail-Adresse", reg_country: "Land", reg_phone: "Telefonnummer", reg_pass: "Passwort", reg_pass2: "Passwort bestätigen", btn_register: "KONTO ERSTELLEN", lnk_to_login: "Anmelden",
        login_id: "E-Mail / Telefon", login_pass: "Passwort", btn_login: "EINLOGGEN", lnk_to_reg: "Konto erstellen",
        solde1: "Gesamtsaldo 1", solde2: "Gesamtsaldo 2", btn_not_active: "KONTO NICHT AKTIVIEREN<br>JETZT AKTIVIEREN", btn_withdraw: "AUSZAHLUNG",
        menu_pass: "Passwort", menu_service: "Kundenservice", menu_tx: "Transaktionen",
        act_nom: "NACHNAME", act_prenom: "VORNAME", act_sexe: "GESCHLECHT", act_country: "Land", act_phone: "Telefon", act_submit: "SENDEN",
        chat_placeholder: "Nachricht schreiben...", chat_send: "Senden"
    },
    zh: {
        reg_email: "电子邮件", reg_country: "国家", reg_phone: "电话号码", reg_pass: "密码", reg_pass2: "确认密码", btn_register: "创建账户", lnk_to_login: "登录",
        login_id: "邮箱 / 电话号码", login_pass: "密码", btn_login: "登录", lnk_to_reg: "创建账户",
        solde1: "总余额 1", solde2: "总余额 2", btn_not_active: "账户未激活<br>立即激活", btn_withdraw: "提现",
        menu_pass: "登录密码", menu_service: "客户服务", menu_tx: "交易明细",
        act_nom: "姓氏", act_prenom: "名字", act_sexe: "性别", act_country: "国家", act_phone: "电话", act_submit: "提交",
        chat_placeholder: "输入消息...", chat_send: "发送"
    },
    ar: {
        reg_email: "البريد الإلكتروني", reg_country: "البلد", reg_phone: "رقم الهاتف", reg_pass: "كلمة المرور", reg_pass2: "تأكيد كلمة المرور", btn_register: "إنشاء حساب", lnk_to_login: "تسجيل الدخول",
        login_id: "البريد / الهاتف", login_pass: "كلمة المرور", btn_login: "دخول", lnk_to_reg: "إنشاء حساب",
        solde1: "إجمالي الرصيد 1", solde2: "إجمالي الرصيد 2", btn_not_active: "الحساب غير مفعل<br>تفعيل الآن", btn_withdraw: "سحب",
        menu_pass: "كلمة المرور", menu_service: "خدمة العملاء", menu_tx: "تفاصيل المعاملات",
        act_nom: "اللقب", act_prenom: "الاسم", act_sexe: "الجنس", act_country: "البلد", act_phone: "الهاتف", act_submit: "إرسال",
        chat_placeholder: "اكتب رسالة...", chat_send: "إرسال"
    }
};

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const t = i18n[lang];
    document.getElementById('lbl_reg_email').innerText = t.reg_email;
    document.getElementById('lbl_reg_country').innerText = t.reg_country;
    document.getElementById('lbl_reg_phone').innerText = t.reg_phone;
    document.getElementById('lbl_reg_pass').innerText = t.reg_pass;
    document.getElementById('lbl_reg_pass2').innerText = t.reg_pass2;
    document.getElementById('btn_register').innerText = t.btn_register;
    document.getElementById('lnk_to_login').innerText = t.lnk_to_login;

    document.getElementById('lbl_login_id').innerText = t.login_id;
    document.getElementById('lbl_login_pass').innerText = t.login_pass;
    document.getElementById('btn_login').innerText = t.btn_login;
    document.getElementById('lnk_to_reg').innerText = t.lnk_to_reg;

    document.getElementById('lbl_solde1').innerText = t.solde1;
    document.getElementById('lbl_solde2').innerText = t.solde2;

    document.getElementById('lbl_act_nom').innerText = t.act_nom;
    document.getElementById('lbl_act_prenom').innerText = t.act_prenom;
    document.getElementById('lbl_act_sexe').innerText = t.act_sexe;
    document.getElementById('lbl_act_country').innerText = t.act_country;
    document.getElementById('lbl_act_phone').innerText = t.act_phone;
    document.getElementById('btn_act_submit').innerText = t.act_submit;

    if(currentUser) renderDashboard();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active-screen'));
    document.getElementById(screenId).classList.add('active-screen');
}

function updatePrefix(type) {
    const country = document.getElementById(`${type}_country`).value;
    document.getElementById(`${type}_phone`).value = country;
}

async function submitRegister() {
    const email = document.getElementById('reg_email').value;
    const phone = document.getElementById('reg_phone').value;
    const password = document.getElementById('reg_pass').value;
    const country_code = document.getElementById('reg_country').value;

    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, phone, password, country_code })
    });
    const data = await res.json();
    if(res.ok) {
        currentUser = data.user;
        renderDashboard();
    } else {
        alert(data.message);
    }
}

async function submitLogin() {
    const login_id = document.getElementById('login_id').value;
    const password = document.getElementById('login_pass').value;

    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ login_id, password })
    });
    const data = await res.json();
    if(res.ok) {
        currentUser = data.user;
        renderDashboard();
    } else {
        alert(data.message);
    }
}

function renderDashboard() {
    const t = i18n[currentLang];
    document.getElementById('dash_id').innerText = `ID: ${currentUser.id}`;
    document.getElementById('dash_solde1').innerText = currentUser.solde1;
    document.getElementById('dash_solde2').innerText = currentUser.solde2;

    const btnContainer = document.getElementById('statusBtnContainer');
    if(!currentUser.active) {
        btnContainer.innerHTML = `
            <button class="btn-green" onclick="showScreen('screen4')">
                ${t.btn_not_active}
            </button>`;
    } else {
        btnContainer.innerHTML = `
            <button class="btn-white" style="margin: 15px 0; width:100%;">
                ${t.btn_withdraw}
            </button>`;
    }

    document.getElementById('menuMain').innerHTML = `
        <div class="menu-btn">${t.menu_pass}</div>
        <div class="menu-btn" onclick="openServiceClient()" style="cursor:pointer;">${t.menu_service}</div>
        <div class="menu-btn">${t.menu_tx}</div>
    `;

    showScreen('screenDashboard');
}

async function submitActivation() {
    const nom = document.getElementById('act_nom').value;
    const prenom = document.getElementById('act_prenom').value;
    const sexe = document.getElementById('act_sexe').value;
    const phone = document.getElementById('act_phone').value;
    const country_code = document.getElementById('act_country').value;

    const key = currentUser.email || currentUser.phone;

    const res = await fetch(`${API_URL}/activate`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user_key: key, nom, prenom, sexe, phone, country_code })
    });
    const data = await res.json();
    if(res.ok) {
        currentUser = data.user;
        renderDashboard();
    }
}

function openServiceClient() {
    const t = i18n[currentLang];
    document.getElementById('menuMain').innerHTML = `
        <div style="background:#fff; color:#000; border-radius:10px; padding:10px; display:flex; flex-direction:column; justify-content:space-between;">
            <div id="chatLogs" style="display:flex; flex-direction:column; gap:8px; height:200px; overflow-y:auto; padding-right:5px;">
            </div>
            <div style="display:flex; flex-direction:column; gap:5px; margin-top:8px;">
                <input type="file" id="chatImage" accept="image/*" style="border:none; color:#000; font-size:0.75rem;">
                <div style="display:flex; gap:5px;">
                    <input type="text" id="chatText" placeholder="${t.chat_placeholder}" style="flex:1; border:1px solid #ccc; color:#000; padding:5px; border-radius:4px;">
                    <button onclick="sendChatMessage()" style="background:#ff7700; color:#fff; border:none; border-radius:4px; padding:8px 12px; font-weight:bold; cursor:pointer;">${t.chat_send}</button>
                </div>
            </div>
        </div>
    `;

    loadFullChatHistory();
    if (chatPollInterval) clearInterval(chatPollInterval);
    chatPollInterval = setInterval(loadFullChatHistory, 2000);
}

async function loadFullChatHistory() {
    if (!currentUser) return;
    try {
        const res = await fetch(`${API_URL}/get-chat/${currentUser.id}`);
        const data = await res.json();
        
        if (data.status === "success") {
            const chatLogs = document.getElementById('chatLogs');
            if (!chatLogs) return;

            let html = "";
            data.messages.forEach(msg => {
                if (msg.sender === "admin") {
                    html += `
                        <div style="background:#e4e6eb; color:#000; padding:8px; border-radius:8px; width:fit-content; max-width:80%; align-self:flex-start;">
                            ${msg.text}
                        </div>`;
                } else {
                    html += `
                        <div style="background:#ff7700; color:#fff; padding:8px; border-radius:8px; width:fit-content; max-width:80%; align-self:flex-end; margin-left:auto;">
                            ${msg.text}
                        </div>`;
                }
            });

            chatLogs.innerHTML = html;
            chatLogs.scrollTop = chatLogs.scrollHeight;
        }
    } catch (e) {
        console.log("Connection error...");
    }
}

async function sendChatMessage() {
    const textInput = document.getElementById('chatText');
    const fileInput = document.getElementById('chatImage');

    const text = textInput.value;
    const hasFile = fileInput.files.length > 0;

    if (!text && !hasFile) return;

    const formData = new FormData();
    formData.append('user_id', currentUser ? currentUser.id : 'Unknown');
    formData.append('message', text);
    if (hasFile) {
        formData.append('photo', fileInput.files[0]);
    }

    textInput.value = '';

    try {
        await fetch(`${API_URL}/send-chat`, {
            method: 'POST',
            body: formData
        });
        loadFullChatHistory();
    } catch (err) {
        alert("Server connection error");
    }

    fileInput.value = '';
}
