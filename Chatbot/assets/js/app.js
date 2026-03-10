// HealthGuard AI Frontend Logic
// Vanilla JS, Bootstrap 5, placeholder API endpoints for future Spring Boot integration

document.addEventListener("DOMContentLoaded", () => {
    initYear();
    initSmoothScroll();
    initTheme();
    initI18n();
    initBackToTop();
    initScrollReveal();
    initChatApp();
    initSymptomChecker();
    initLocationAlerts();
    initVoiceInput();
});

/* ============== Utilities ============== */

function initYear() {
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;
            e.preventDefault();
            const yOffset = -70;
            const y = targetEl.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        });
    });
}

function initTheme() {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = window.localStorage.getItem("healthguard_theme");
    const body = document.body;
    const themeToggle = document.getElementById("themeToggleBtn");

    function applyTheme(mode) {
        if (mode === "dark") {
            body.classList.add("theme-dark");
        } else {
            body.classList.remove("theme-dark");
        }
        window.localStorage.setItem("healthguard_theme", mode);
        if (themeToggle) {
            themeToggle.innerHTML = mode === "dark"
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
            themeToggle.title = mode === "dark" ? "Switch to light mode" : "Switch to dark mode";
        }
    }

    const initial = stored || (prefersDark ? "dark" : "light");
    applyTheme(initial);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = body.classList.contains("theme-dark") ? "dark" : "light";
            applyTheme(current === "dark" ? "light" : "dark");
        });
    }
}

function initI18n() {
    const siteSelect = document.getElementById("siteLanguageSelect");
    const stored = window.localStorage.getItem("healthguard_site_lang");
    const initial = (stored === "en" || stored === "hi" || stored === "mr") ? stored : "en";

    const dict = {
        en: {
            emergency_banner: "If symptoms become severe, please contact a healthcare professional immediately.",
            nav_home: "Home",
            nav_chatbot: "Chatbot",
            nav_symptom_checker: "Symptom Checker",
            nav_disease_info: "Disease Info",
            nav_prevention: "Prevention Tips",
            nav_faq: "FAQ",
            nav_start_chat: '<i class="fa-solid fa-comments me-1"></i> Start Chatting',
            hero_check_symptoms: '<i class="fa-solid fa-stethoscope me-2"></i> Check Symptoms',
            hero_bullet_1: '<i class="fa-solid fa-shield-heart text-primary me-2"></i> Public health awareness',
            hero_bullet_2: '<i class="fa-solid fa-globe-asia text-success me-2"></i> Community-focused',
            hero_title: 'AI Powered <span class="gradient-text">Disease Awareness</span> Assistant',
            hero_desc: "HealthGuard AI helps you understand common diseases, symptoms, and prevention strategies using an AI-driven public health chatbot designed for awareness and education.",
            start_chatting: '<i class="fa-solid fa-robot me-2"></i> Start Chatting',
            chat_app_name: "HealthGuard AI",
            chat_app_subtitle: "Chat history",
            new_chat_btn: '<i class="fa-solid fa-plus me-1"></i> New chat',
            lang_label: "Language",
            chat_header_title: "HealthGuard AI Assistant",
            chat_header_subtitle: "AI-driven public health awareness",
            chat_input_placeholder: "Ask about symptoms, diseases, or prevention...",
            chat_disclaimer: "This assistant provides educational health awareness and should not replace professional medical advice."
        },
        hi: {
            emergency_banner: "यदि लक्षण गंभीर हो जाएँ, तो कृपया तुरंत किसी स्वास्थ्य विशेषज्ञ से संपर्क करें।",
            nav_home: "होम",
            nav_chatbot: "चैटबॉट",
            nav_symptom_checker: "लक्षण जांच",
            nav_disease_info: "रोग जानकारी",
            nav_prevention: "रोकथाम टिप्स",
            nav_faq: "FAQ",
            nav_start_chat: '<i class="fa-solid fa-comments me-1"></i> चैट शुरू करें',
            hero_check_symptoms: '<i class="fa-solid fa-stethoscope me-2"></i> लक्षण देखें',
            hero_bullet_1: '<i class="fa-solid fa-shield-heart text-primary me-2"></i> सार्वजनिक स्वास्थ्य जागरूकता',
            hero_bullet_2: '<i class="fa-solid fa-globe-asia text-success me-2"></i> समुदाय‑केंद्रित',
            hero_title: 'AI आधारित <span class="gradient-text">रोग जागरूकता</span> सहायक',
            hero_desc: "HealthGuard AI आपको सामान्य बीमारियों, लक्षणों और रोकथाम के उपायों को समझने में मदद करता है। यह एक AI-चालित सार्वजनिक स्वास्थ्य जागरूकता चैटबॉट है।",
            start_chatting: '<i class="fa-solid fa-robot me-2"></i> चैट शुरू करें',
            chat_app_name: "HealthGuard AI",
            chat_app_subtitle: "चैट इतिहास",
            new_chat_btn: '<i class="fa-solid fa-plus me-1"></i> नई चैट',
            lang_label: "भाषा",
            chat_header_title: "HealthGuard AI सहायक",
            chat_header_subtitle: "AI‑चालित सार्वजनिक स्वास्थ्य जागरूकता",
            chat_input_placeholder: "लक्षण, बीमारी या बचाव के बारे में पूछें...",
            chat_disclaimer: "यह सहायक केवल स्वास्थ्य जागरूकता के लिए है और डॉक्टर की सलाह का विकल्प नहीं है।"
        },
        mr: {
            emergency_banner: "लक्षण गंभीर झाल्यास कृपया त्वरितपणे आरोग्यतज्ज्ञांचा सल्ला घ्या.",
            nav_home: "होम",
            nav_chatbot: "चॅटबॉट",
            nav_symptom_checker: "लक्षण तपासणी",
            nav_disease_info: "रोग माहिती",
            nav_prevention: "प्रतिबंध टिप्स",
            nav_faq: "FAQ",
            nav_start_chat: '<i class="fa-solid fa-comments me-1"></i> चॅट सुरू करा',
            hero_check_symptoms: '<i class="fa-solid fa-stethoscope me-2"></i> लक्षणे तपासा',
            hero_bullet_1: '<i class="fa-solid fa-shield-heart text-primary me-2"></i> सार्वजनिक आरोग्य जागरूकता',
            hero_bullet_2: '<i class="fa-solid fa-globe-asia text-success me-2"></i> समुदाय‑केंद्रित',
            hero_title: 'AI आधारित <span class="gradient-text">रोग जागरूकता</span> सहाय्यक',
            hero_desc: "HealthGuard AI तुम्हाला सामान्य आजार, लक्षणे आणि प्रतिबंधक उपाय समजून घेण्यास मदत करतो. हा AI‑चालित सार्वजनिक आरोग्य जागरूकता चॅटबॉट आहे.",
            start_chatting: '<i class="fa-solid fa-robot me-2"></i> चॅट सुरू करा',
            chat_app_name: "HealthGuard AI",
            chat_app_subtitle: "चॅट इतिहास",
            new_chat_btn: '<i class="fa-solid fa-plus me-1"></i> नवीन चॅट',
            lang_label: "भाषा",
            chat_header_title: "HealthGuard AI सहाय्यक",
            chat_header_subtitle: "AI‑चालित सार्वजनिक आरोग्य जागरूकता",
            chat_input_placeholder: "लक्षणे, आजार किंवा प्रतिबंध याबद्दल विचारा...",
            chat_disclaimer: "ही माहिती केवळ आरोग्य जागरूकतेसाठी आहे आणि डॉक्टरांच्या सल्ल्याचा पर्याय नाही."
        }
    };

    function apply(lang) {
        const map = dict[lang] || dict.en;
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (!key || !(key in map)) return;
            el.innerHTML = map[key];
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (!key || !(key in map)) return;
            el.setAttribute("placeholder", map[key]);
        });
        window.localStorage.setItem("healthguard_site_lang", lang);
        // Keep chatbot language in sync with site language
        window.localStorage.setItem("healthguard_chat_lang", lang);
        window.dispatchEvent(new CustomEvent("healthguard:langchange", { detail: { lang } }));
    }

    apply(initial);
    if (siteSelect) {
        siteSelect.value = initial;
        siteSelect.addEventListener("change", () => apply(siteSelect.value));
    }
}

function initBackToTop() {
    const btn = document.getElementById("backToTopBtn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initScrollReveal() {
    const srElements = document.querySelectorAll("[data-sr]");
    if (!("IntersectionObserver" in window) || srElements.length === 0) {
        srElements.forEach(el => el.classList.add("sr-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("sr-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    srElements.forEach(el => observer.observe(el));
}

/* ============== Chatbot (ChatGPT-style app) ============== */

const CHATBOT_API = "/api/chat"; // placeholder for Spring Boot backend

const chatState = {
    initialized: false,
    conversations: [],
    activeId: null
};
const chatConfig = {
    language: "en"
};

function initChatApp() {
    const floatingBtn = document.getElementById("floatingChatBtn");
    const overlay = document.getElementById("chatFullscreenOverlay");
    const chatWindow = document.getElementById("chatFullscreenWindow");
    const typing = document.getElementById("chatFullscreenTyping");
    const form = document.getElementById("chatFullscreenForm");
    const input = document.getElementById("chatFullscreenInput");
    const sendIcon = document.getElementById("sendIconFullscreen");
    const spinner = document.getElementById("loadingSpinnerFullscreen");
    const backBtn = document.getElementById("chatFsBackBtn");
    const minimizeBtn = document.getElementById("chatFsMinimizeBtn");
    const clearBtn = document.getElementById("chatFsClearBtn");
    const newChatBtn = document.getElementById("newChatBtn");
    const historyList = document.getElementById("chatHistoryList");

    const heroStartChatBtn = document.getElementById("heroStartChatBtn");
    const navStartChatBtn = document.getElementById("navStartChatBtn");
    const navChatLink = document.getElementById("navChatLink");
    const openChatFromSectionBtn = document.getElementById("openChatFromSectionBtn");

    if (!floatingBtn || !overlay || !chatWindow || !form || !input || !historyList) return;

    // Site language -> chatbot language (single source of truth)
    const siteLang = window.localStorage.getItem("healthguard_site_lang");
    if (siteLang === "en" || siteLang === "hi" || siteLang === "mr") {
        chatConfig.language = siteLang;
        window.localStorage.setItem("healthguard_chat_lang", siteLang);
    }

    const state = loadChats(chatConfig.language);

    function setLoading(isLoading) {
        if (typing) typing.classList.toggle("d-none", !isLoading);
        if (sendIcon) sendIcon.classList.toggle("d-none", isLoading);
        if (spinner) spinner.classList.toggle("d-none", !isLoading);
    }

    function open() {
        overlay.classList.remove("d-none");
        document.body.classList.add("chat-open");
        renderAll();
        input.focus();
    }

    function close() {
        overlay.classList.add("d-none");
        document.body.classList.remove("chat-open");
    }

    function renderAll() {
        renderHistory();
        renderConversation();
    }

    function renderHistory() {
        historyList.innerHTML = "";
        const sorted = [...state.conversations].sort((a, b) => (new Date(b.updatedAt)).getTime() - (new Date(a.updatedAt)).getTime());
        sorted.forEach(c => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "chat-history-item " + (c.id === state.activeId ? "active" : "");
            btn.innerHTML = `
                <div class="chat-history-title">${escapeHtml(c.title || defaultConversationTitle(chatConfig.language))}</div>
                <div class="chat-history-meta">${formatDateShort(c.updatedAt)}</div>
            `;
            btn.addEventListener("click", () => {
                state.activeId = c.id;
                saveChats(state);
                renderAll();
            });
            historyList.appendChild(btn);
        });
    }

    function renderConversation() {
        const convo = state.conversations.find(c => c.id === state.activeId);
        chatWindow.innerHTML = "";
        if (!convo) return;

        convo.messages.forEach(m => {
            const msgEl = document.createElement("div");
            msgEl.className = "chat-message " + (m.sender === "user" ? "user" : "bot");
            msgEl.innerHTML = `
                <div>
                    <div class="chat-bubble-main">${m.sender === "user" ? escapeHtml(m.text) : m.text}</div>
                    <div class="chat-timestamp">${formatTime(new Date(m.timestamp))}</div>
                </div>
            `;
            chatWindow.appendChild(msgEl);
        });
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function pushMessage(sender, text) {
        const convo = state.conversations.find(c => c.id === state.activeId);
        if (!convo) return;
        const now = new Date().toISOString();
        convo.messages.push({ sender, text, timestamp: now });
        convo.updatedAt = now;
        if (!convo.title && sender === "user") {
            convo.title = text.slice(0, 42);
        }
        saveChats(state);
        renderAll();
    }

    function newChat() {
        const now = new Date().toISOString();
        const convo = {
            id: cryptoRandomId(),
            title: "",
            updatedAt: now,
            messages: seedWelcomeMessages(chatConfig.language).map(m => ({
                sender: m.sender,
                text: m.text,
                timestamp: now
            }))
        };
        state.conversations.unshift(convo);
        state.activeId = convo.id;
        saveChats(state);
        renderAll();
        input.focus();
    }

    function clearChat() {
        const convo = state.conversations.find(c => c.id === state.activeId);
        if (!convo) return;
        const now = new Date().toISOString();
        convo.title = "";
        convo.updatedAt = now;
        convo.messages = seedWelcomeMessages(chatConfig.language).map(m => ({
            sender: m.sender,
            text: m.text,
            timestamp: now
        }));
        saveChats(state);
        renderAll();
    }

    function handleSubmit(text) {
        if (!text) return;
        pushMessage("user", text);
        setLoading(true);

        const delay = 900 + Math.random() * 900;
        setTimeout(() => {
            const reply = getMockChatbotReply(text, chatConfig.language);
            setLoading(false);
            pushMessage("bot", reply);
        }, delay);
    }

    // Events
    floatingBtn.addEventListener("click", open);
    if (heroStartChatBtn) heroStartChatBtn.addEventListener("click", open);
    if (navStartChatBtn) navStartChatBtn.addEventListener("click", open);
    if (navChatLink) navChatLink.addEventListener("click", (e) => { e.preventDefault(); open(); });
    if (openChatFromSectionBtn) openChatFromSectionBtn.addEventListener("click", open);

    if (backBtn) backBtn.addEventListener("click", close);
    if (minimizeBtn) minimizeBtn.addEventListener("click", close);
    if (clearBtn) clearBtn.addEventListener("click", clearChat);
    if (newChatBtn) newChatBtn.addEventListener("click", newChat);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        input.value = "";
        handleSubmit(text);
    });

    // Live language switching (fixes "can't go back to English")
    window.addEventListener("healthguard:langchange", (e) => {
        const lang = e?.detail?.lang;
        if (lang === "en" || lang === "hi" || lang === "mr") {
            chatConfig.language = lang;
            // Re-render sidebar labels like "New chat" default title, etc.
            renderAll();
        }
    });

    renderAll();
}

function loadChats(lang) {
    const stored = window.localStorage.getItem("healthguard_chats_v1");
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (parsed && Array.isArray(parsed.conversations) && parsed.conversations.length) {
                return {
                    activeId: parsed.activeId || parsed.conversations[0].id,
                    conversations: parsed.conversations
                };
            }
        } catch (e) {
            // ignore
        }
    }

    const now = new Date().toISOString();
    const convo = {
        id: cryptoRandomId(),
        title: "",
        updatedAt: now,
        messages: seedWelcomeMessages(lang).map(m => ({
            sender: m.sender,
            text: m.text,
            timestamp: now
        }))
    };
    const state = { activeId: convo.id, conversations: [convo] };
    saveChats(state);
    return state;
}

function saveChats(state) {
    window.localStorage.setItem("healthguard_chats_v1", JSON.stringify(state));
}

function seedWelcomeMessages(lang) {
    const textMap = {
        en: [
            "Welcome to HealthGuard AI – an AI‑driven public health chatbot focused on disease awareness and prevention.",
            "Ask about dengue, malaria, COVID‑19, diabetes, influenza, symptoms, and prevention tips.",
            "This is for educational awareness only and does not replace a doctor."
        ],
        hi: [
            "HealthGuard AI में आपका स्वागत है — यह रोग जागरूकता और रोकथाम पर केंद्रित AI‑चालित सार्वजनिक स्वास्थ्य चैटबॉट है।",
            "आप डेंगू, मलेरिया, कोविड‑19, डायबिटीज, इन्फ्लुएंजा, लक्षण और बचाव के उपाय पूछ सकते हैं।",
            "यह केवल जागरूकता के लिए है और डॉक्टर का विकल्प नहीं है।"
        ],
        mr: [
            "HealthGuard AI मध्ये तुमचे स्वागत आहे — हा रोग जागरूकता आणि प्रतिबंध यावर केंद्रित AI‑चालित सार्वजनिक आरोग्य चॅटबॉट आहे.",
            "तुम्ही डेंगू, मलेरिया, कोविड‑19, डायबेटीस, इन्फ्लुएंझा, लक्षणे आणि प्रतिबंधक उपाय विचारू शकता.",
            "ही माहिती केवळ जागरूकतेसाठी आहे आणि डॉक्टरांचा पर्याय नाही."
        ]
    };
    const items = textMap[lang] || textMap.en;
    return items.map(t => ({ sender: "bot", text: t }));
}

function defaultConversationTitle(lang) {
    if (lang === "hi") return "नई बातचीत";
    if (lang === "mr") return "नवीन चॅट";
    return "New chat";
}

function cryptoRandomId() {
    if (window.crypto && crypto.getRandomValues) {
        const buf = new Uint32Array(2);
        crypto.getRandomValues(buf);
        return buf[0].toString(16) + buf[1].toString(16);
    }
    return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function formatDateShort(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString([], { month: "short", day: "2-digit" });
}

function initChatbot() {
    const floatingBtn = document.getElementById("floatingChatBtn");
    const previewPanel = document.getElementById("chatPreviewPanel");
    const previewWindow = document.getElementById("chatPreviewWindow");
    const previewForm = document.getElementById("chatPreviewForm");
    const previewInput = document.getElementById("chatPreviewInput");
    const previewTyping = document.getElementById("chatPreviewTyping");
    const sendIconPreview = document.getElementById("sendIconPreview");
    const loadingSpinnerPreview = document.getElementById("loadingSpinnerPreview");
    const closePreviewBtn = document.getElementById("closePreviewBtn");
    const expandToFullscreenBtn = document.getElementById("expandToFullscreenBtn");

    const fsOverlay = document.getElementById("chatFullscreenOverlay");
    const fsWindow = document.getElementById("chatFullscreenWindow");
    const fsForm = document.getElementById("chatFullscreenForm");
    const fsInput = document.getElementById("chatFullscreenInput");
    const fsTyping = document.getElementById("chatFullscreenTyping");
    const sendIconFullscreen = document.getElementById("sendIconFullscreen");
    const loadingSpinnerFullscreen = document.getElementById("loadingSpinnerFullscreen");
    const fsBackBtn = document.getElementById("chatFsBackBtn");
    const fsMinimizeBtn = document.getElementById("chatFsMinimizeBtn");
    const fsClearBtn = document.getElementById("chatFsClearBtn");
    const langSelect = document.getElementById("chatLanguageSelect");

    const openChatFromSectionBtn = document.getElementById("openChatFromSectionBtn");
    const openChatPreviewFromSectionBtn = document.getElementById("openChatPreviewFromSectionBtn");
    const heroStartChatBtn = document.getElementById("heroStartChatBtn");
    const navStartChatBtn = document.getElementById("navStartChatBtn");
    const navChatLink = document.getElementById("navChatLink");

    const suggestionButtons = document.querySelectorAll(".suggestion-btn");

    if (!floatingBtn || !previewPanel || !previewWindow || !fsOverlay || !fsWindow) return;

    if (!chatState.initialized) {
        const stored = window.localStorage.getItem("healthguard_chat_history");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length) {
                    chatState.history = parsed.map(m => ({
                        sender: m.sender === "user" ? "user" : "bot",
                        text: String(m.text || ""),
                        timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
                    }));
                }
            } catch (e) {
                // ignore, will fall back to default seed
            }
        }

        if (!chatState.history.length) {
            const now = new Date();
            chatState.history = [
                {
                    sender: "bot",
                    text: "Welcome to HealthGuard AI – an AI‑driven public health chatbot focused on disease awareness and prevention.",
                    timestamp: now
                },
                {
                    sender: "bot",
                    text: "You can ask about common diseases like dengue, malaria, COVID‑19, diabetes, or influenza, and I'll share key symptoms and prevention tips.",
                    timestamp: now
                },
                {
                    sender: "bot",
                    text: "This assistant is designed for educational health awareness and should not replace professional medical advice or diagnosis.",
                    timestamp: now
                },
                {
                    sender: "bot",
                    text: "How would you like to begin? For example, try asking \"Symptoms of dengue\" or \"How to prevent malaria\".",
                    timestamp: now
                }
            ];
        }

        const storedLang = window.localStorage.getItem("healthguard_chat_lang");
        if (storedLang === "en" || storedLang === "hi" || storedLang === "mr") {
            chatConfig.language = storedLang;
        }

        chatState.initialized = true;
    }

    function persistHistory() {
        try {
            const serialized = JSON.stringify(
                chatState.history.map(m => ({
                    sender: m.sender,
                    text: m.text,
                    timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp
                }))
            );
            window.localStorage.setItem("healthguard_chat_history", serialized);
        } catch (e) {
            // fail silently if storage unavailable
        }
    }

    function renderAllChats() {
        const windows = [previewWindow, fsWindow];
        windows.forEach(win => {
            if (!win) return;
            win.innerHTML = "";
            chatState.history.forEach(msg => {
                const msgEl = document.createElement("div");
                msgEl.className = "chat-message " + (msg.sender === "user" ? "user" : "bot");
                msgEl.innerHTML = `
                    <div>
                        <div class="chat-bubble-main">${msg.sender === "user" ? escapeHtml(msg.text) : msg.text}</div>
                        <div class="chat-timestamp">${formatTime(msg.timestamp)}</div>
                    </div>
                `;
                win.appendChild(msgEl);
            });
            win.scrollTop = win.scrollHeight;
        });
    }

    function pushMessage(sender, text) {
        chatState.history.push({
            sender,
            text,
            timestamp: new Date()
        });
        persistHistory();
        renderAllChats();
    }

    function setLoadingUI(target, isLoading) {
        if (target === "preview" && sendIconPreview && loadingSpinnerPreview && previewTyping) {
            previewTyping.classList.toggle("d-none", !isLoading);
            sendIconPreview.classList.toggle("d-none", isLoading);
            loadingSpinnerPreview.classList.toggle("d-none", !isLoading);
        }
        if (target === "fullscreen" && sendIconFullscreen && loadingSpinnerFullscreen && fsTyping) {
            fsTyping.classList.toggle("d-none", !isLoading);
            sendIconFullscreen.classList.toggle("d-none", isLoading);
            loadingSpinnerFullscreen.classList.toggle("d-none", !isLoading);
        }
    }

    function handleUserSubmit(text, source) {
        if (!text) return;
        pushMessage("user", text);
        setLoadingUI(source, true);

        const simulatedDelay = 900 + Math.random() * 900;
        setTimeout(async () => {
            let reply;
            try {
                reply = getMockChatbotReply(text, chatConfig.language);
                // Example backend call (for Spring Boot):
                // const response = await fetch(CHATBOT_API, {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({ message: text })
                // });
                // const data = await response.json();
                // reply = data.reply;
            } catch (err) {
                reply = "I'm having trouble reaching the server right now. Please try again later or contact your healthcare provider if it's urgent.";
            } finally {
                setLoadingUI(source, false);
                pushMessage("bot", reply);
            }
        }, simulatedDelay);
    }

    renderAllChats();

    function openFullscreenChat() {
        previewPanel.classList.add("d-none");
        fsOverlay.classList.remove("d-none");
        document.body.classList.add("chat-open");
        renderAllChats();
        fsInput && fsInput.focus();
    }

    function closeFullscreenChat() {
        fsOverlay.classList.add("d-none");
        document.body.classList.remove("chat-open");
    }

    floatingBtn.addEventListener("click", () => {
        openFullscreenChat();
    });

    if (closePreviewBtn) {
        closePreviewBtn.addEventListener("click", () => {
            previewPanel.classList.add("d-none");
        });
    }

    if (expandToFullscreenBtn) {
        expandToFullscreenBtn.addEventListener("click", () => {
            previewPanel.classList.add("d-none");
            openFullscreenChat();
        });
    }

    if (openChatFromSectionBtn) {
        openChatFromSectionBtn.addEventListener("click", () => {
            openFullscreenChat();
        });
    }

    if (openChatPreviewFromSectionBtn) {
        openChatPreviewFromSectionBtn.addEventListener("click", () => {
            previewPanel.classList.remove("d-none");
            renderAllChats();
            previewInput && previewInput.focus();
        });
    }

    if (fsBackBtn) {
        fsBackBtn.addEventListener("click", () => {
            closeFullscreenChat();
        });
    }

    if (fsMinimizeBtn) {
        fsMinimizeBtn.addEventListener("click", () => {
            closeFullscreenChat();
            previewPanel.classList.remove("d-none");
            renderAllChats();
        });
    }

    if (fsClearBtn) {
            fsClearBtn.addEventListener("click", () => {
                const now = new Date();
                chatState.history = [
                    {
                        sender: "bot",
                        text: "Chat cleared. You can start a new public health awareness conversation any time.",
                        timestamp: now
                    }
                ];
                persistHistory();
                renderAllChats();
            });
        }

    if (previewForm && previewInput) {
        previewForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = previewInput.value.trim();
            if (!text) return;
            previewInput.value = "";
            handleUserSubmit(text, "preview");
        });
    }

    if (fsForm && fsInput) {
        fsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = fsInput.value.trim();
            if (!text) return;
            fsInput.value = "";
            handleUserSubmit(text, "fullscreen");
        });
    }

    suggestionButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const text = btn.textContent.trim();
            const target = btn.getAttribute("data-chat-target") || "fullscreen";
            handleUserSubmit(text, target);
        });
    });
    };

    if (heroStartChatBtn) {
        heroStartChatBtn.addEventListener("click", () => {
            openFullscreenChat();
        });
    }

    if (navStartChatBtn) {
        navStartChatBtn.addEventListener("click", () => {
            openFullscreenChat();
        });
    }

    if (navChatLink) {
        navChatLink.addEventListener("click", (e) => {
            e.preventDefault();
            openFullscreenChat();
        });
    }

    if (langSelect) {
        const siteLang = window.localStorage.getItem("healthguard_site_lang");
        if (siteLang === "en" || siteLang === "hi" || siteLang === "mr") {
            chatConfig.language = siteLang;
        }
        langSelect.value = chatConfig.language;
        langSelect.addEventListener("change", () => {
            const value = langSelect.value;
            if (value === "en" || value === "hi" || value === "mr") {
                chatConfig.language = value;
                window.localStorage.setItem("healthguard_chat_lang", value);
                window.localStorage.setItem("healthguard_site_lang", value);
            }
        });
    }


function getMockChatbotReply(userText, lang) {
    const text = userText.toLowerCase();

    let base;

    if (text.includes("dengue")) {
        base = {
            en: "Dengue often presents with high fever, severe headache, pain behind the eyes, joint and muscle pain, nausea, vomiting, and skin rash.\n\nPrevention focuses on avoiding mosquito bites: remove stagnant water, use mosquito repellents, sleep under nets, and wear long sleeves in mosquito-prone areas.",
            hi: "डेंगू में आमतौर पर तेज बुखार, तेज सिरदर्द, आंखों के पीछे दर्द, जोड़ों और मांसपेशियों में दर्द, मितली, उलटी और त्वचा पर दाने हो सकते हैं।\n\nबचाव के लिए मच्छर के काटने से बचना ज़रूरी है – जमा पानी हटाएँ, मच्छरदानी और रिपेलेंट का उपयोग करें और पूरी बाजू के कपड़े पहनें।",
            mr: "डेंगूमध्ये साधारणपणे जास्त ताप, तीव्र डोकेदुखी, डोळ्यांच्या मागे वेदना, सांधे आणि स्नायूंमध्ये दुखणे, मळमळ, उलटी आणि अंगावर पुरळ अशी लक्षणे दिसू शकतात.\n\nप्रतिबंधासाठी डास चावू नयेत याकडे लक्ष द्या – साचलेले पाणी काढून टाका, मच्छरदाणी आणि रिपेलेंट वापरा आणि पूर्ण बाह्यांचे कपडे घाला."
        };
    } else if (text.includes("malaria")) {
        base = {
            en: "Malaria typically causes fever with chills, sweating, headache, nausea, vomiting, and fatigue.\n\nUse mosquito nets, repellents and follow local health advice. High fever after travel to a malaria-prone area should be evaluated by a doctor.",
            hi: "मलेरिया में अक्सर ठंड के साथ तेज बुखार, पसीना, सिरदर्द, मितली, उलटी और थकान होती है।\n\nमच्छरदानी और रिपेलेंट का उपयोग करें और स्थानीय स्वास्थ्य विभाग की सलाह मानें। यदि मलेरिया-प्रभावित क्षेत्र से आने के बाद तेज बुखार हो तो तुरंत डॉक्टर से मिलें।",
            mr: "मलेरियामध्ये साधारणपणे थंडी वाजून ताप येणे, घाम येणे, डोकेदुखी, मळमळ, उलटी आणि थकवा अशी लक्षणे दिसतात.\n\nमच्छरदाणी, रिपेलेंट वापरा आणि स्थानिक आरोग्य विभागाच्या सूचनांचे पालन करा. मलेरियाग्रस्त भागातून आल्यावर जास्त ताप आल्यास तात्काळ डॉक्टरांचा सल्ला घ्या."
        };
    } else if (text.includes("covid") || text.includes("corona")) {
        base = {
            en: "Common COVID‑19 symptoms include fever, dry cough, tiredness, sore throat, loss of taste or smell, and sometimes difficulty breathing.\n\nVaccination, masks in crowded places, hand hygiene, and good ventilation are important for protection.",
            hi: "कोविड‑19 के सामान्य लक्षणों में बुखार, सूखी खाँसी, थकान, गले में खराश, सूँघने या स्वाद की क्षमता कम होना और कभी‑कभी सांस लेने में तकलीफ शामिल हैं।\n\nसुरक्षा के लिए टीकाकरण, भीड़भाड़ में मास्क, हाथों की सफाई और अच्छी वेंटिलेशन बहुत ज़रूरी हैं।",
            mr: "कोविड‑19ची सामान्य लक्षणे म्हणजे ताप, कोरडी खोकला, थकवा, घशात खवखव, वास किंवा चव न येणे आणि कधी‑कधी श्वास घेण्यास त्रास.\n\nसंरक्षणासाठी लसीकरण, गर्दीत मास्कचा वापर, हात स्वच्छ ठेवणे आणि चांगली हवा खेळती ठेवणे महत्त्वाचे आहे."
        };
    } else if (text.includes("fever")) {
        base = {
            en: "For most mild fevers, rest, drinking fluids, and monitoring your temperature are important. Very high or persistent fever, or fever with warning signs like breathing difficulty, rash, confusion, or severe pain needs medical attention.",
            hi: "हल्के बुखार में आमतौर पर आराम करना, पर्याप्त पानी पीना और तापमान की निगरानी करना ज़रूरी होता है। अगर बुखार बहुत तेज हो, कई दिनों तक बना रहे या सांस फूलना, दाने, उलझन या तेज दर्द जैसे लक्षण हों तो डॉक्टर से तुरंत सलाह लेनी चाहिए।",
            mr: "हलका ताप आल्यास विश्रांती घेणे, पुरेसे पाणी पिणे आणि ताप नियमित तपासणे महत्त्वाचे आहे. फार जास्त ताप, अनेक दिवस टिकणारा ताप किंवा श्वास घेण्यास त्रास, पुरळ, गोंधळ, तीव्र वेदना असे लक्षणे असल्यास डॉक्टरांचा सल्ला आवश्यक आहे."
        };
    } else if (text.includes("prevent")) {
        base = {
            en: "Prevention depends on the disease, but general tips are: wash hands regularly, keep vaccinations up to date, use mosquito protection in risk areas, eat a balanced diet, exercise, sleep well, and avoid tobacco and excess alcohol.",
            hi: "बचाव बीमारी पर निर्भर करता है, लेकिन कुछ सामान्य उपाय हैं: हाथों की नियमित सफाई, समय पर टीकाकरण, जोखिम वाले क्षेत्रों में मच्छरों से बचाव, संतुलित आहार, नियमित व्यायाम, अच्छी नींद और तंबाकू व अत्यधिक शराब से बचना।",
            mr: "प्रतिबंध आजारानुसार बदलतो, पण काही सामान्य उपाय असे आहेत: हात नियमित स्वच्छ धुणे, वेळेवर लसीकरण, जोखमीच्या भागात डासांपासून संरक्षण, संतुलित आहार, नियमित व्यायाम, पुरेशी झोप आणि तंबाखू व जास्त मद्यपान टाळणे."
        };
    } else {
        base = {
            en: "I can help you learn about common diseases, symptoms, and prevention steps.\n\nYou can ask questions like:\n• \"Symptoms of dengue\"\n• \"How to prevent malaria\"\n• \"COVID symptoms\"\n• \"Prevention tips for diabetes\"",
            hi: "मैं आपको आम बीमारियों, उनके लक्षणों और बचाव के तरीकों के बारे में जागरूक करने में मदद कर सकता हूँ।\n\nआप ऐसे सवाल पूछ सकते हैं:\n• \"डेंगू के लक्षण क्या हैं?\"\n• \"मलेरिया से कैसे बचें?\"\n• \"कोविड के लक्षण\"\n• \"डायबिटीज की रोकथाम के उपाय\"",
            mr: "मी तुम्हाला सामान्य आजार, त्यांची लक्षणे आणि प्रतिबंधक उपाय याबद्दल माहिती देऊ शकतो.\n\nतुम्ही असे प्रश्न विचारू शकता:\n• \"डेंगूची लक्षणे कोणती?\"\n• \"मलेरियापासून कशी बचाव करावी?\"\n• \"कोविडची लक्षणे\"\n• \"डायबेटीस टाळण्यासाठी काय करावे?\""
        };
    }

    if (lang === "hi" || lang === "mr") {
        return base[lang] + "\n\n⚠️ यह केवल जागरूकता के लिए है / ही माहिती केवळ जागरूकतेसाठी आहे. गंभीर लक्षणे असल्यास कृपया डॉक्टरांचा सल्ला घ्या.";
    }
    return base.en + "\n\n⚠️ This is for health awareness only and does not replace a doctor.";
}

/* ============== Symptom Checker ============== */

const SYMPTOM_ANALYSIS_API = "/api/symptoms/analyze"; // placeholder

function initSymptomChecker() {
    const symptomTags = document.querySelectorAll(".symptom-tag");
    const analyzeBtn = document.getElementById("analyzeSymptomsBtn");
    const resultContainer = document.getElementById("symptomResults");

    if (!symptomTags.length || !analyzeBtn || !resultContainer) return;

    symptomTags.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
        });
    });

    analyzeBtn.addEventListener("click", async () => {
        const selected = Array.from(symptomTags)
            .filter(btn => btn.classList.contains("active"))
            .map(btn => btn.dataset.symptom);

        resultContainer.innerHTML = "";

        if (selected.length === 0) {
            resultContainer.innerHTML = `<div class="alert alert-info">Please select at least one symptom to analyze.</div>`;
            return;
        }

        const loading = document.createElement("div");
        loading.className = "text-center my-3";
        loading.innerHTML = `<div class="spinner-border text-primary" role="status"></div><p class="small text-muted mt-2 mb-0">Analyzing selected symptoms...</p>`;
        resultContainer.appendChild(loading);

        try {
            // Placeholder mock analysis
            const analysis = getMockSymptomAnalysis(selected);
            // Example call:
            // const response = await fetch(SYMPTOM_ANALYSIS_API, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ symptoms: selected })
            // });
            // const analysis = await response.json();

            resultContainer.innerHTML = "";
            renderSymptomResults(resultContainer, analysis);
        } catch (err) {
            resultContainer.innerHTML = `<div class="alert alert-danger">Unable to analyze symptoms at the moment. Please try again later.</div>`;
        }
    });
}

function getMockSymptomAnalysis(symptoms) {
    // Very simple heuristic mapping for demo purposes only
    const diseases = [];

    const has = (s) => symptoms.includes(s);

    if (has("fever") && has("headache") && has("body pain")) {
        diseases.push({
            name: "Dengue (awareness)",
            likelihood: "Higher match based on your selection",
            description: "Combination of high fever, severe headache, and body pain can be seen in conditions like dengue. Only a medical evaluation can confirm the cause.",
            advice: "Avoid self‑medication, watch for warning signs like abdominal pain or bleeding, and consult a doctor if symptoms worsen.",
            tag: "Mosquito-borne viral illness"
        });
    }

    if (has("fever") && has("cough") && has("fatigue")) {
        diseases.push({
            name: "Respiratory infection (awareness)",
            likelihood: "Possible match",
            description: "Fever with cough and fatigue can be seen in flu, COVID‑19, or other respiratory infections.",
            advice: "Monitor breathing, rest, stay hydrated, and seek medical advice if symptoms are severe or persistent.",
            tag: "Respiratory conditions"
        });
    }

    if (has("nausea")) {
        diseases.push({
            name: "Gastrointestinal upset (awareness)",
            likelihood: "Non‑specific",
            description: "Nausea alone is non‑specific and can occur in many conditions like infections, food intolerance, or medication side‑effects.",
            advice: "If nausea persists, is severe, or is associated with severe abdominal pain or vomiting, contact a healthcare provider.",
            tag: "General symptoms"
        });
    }

    if (diseases.length === 0) {
        diseases.push({
            name: "Non‑specific symptom pattern",
            likelihood: "Needs professional evaluation",
            description: "Your selected symptoms do not strongly suggest a specific disease in this awareness demo.",
            advice: "Use this as a starting point for awareness only and consult a doctor for any ongoing or severe health concerns.",
            tag: "Awareness only"
        });
    }

    return diseases;
}

function renderSymptomResults(container, diseases) {
    diseases.forEach(item => {
        const card = document.createElement("div");
        card.className = "possible-disease-card card";
        card.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="card-title mb-0">${escapeHtml(item.name)}</h5>
                    <span class="badge bg-primary-subtle text-primary possible-disease-badge">${escapeHtml(item.tag)}</span>
                </div>
                <p class="small mb-1"><strong>Interpretation:</strong> ${escapeHtml(item.likelihood)}</p>
                <p class="small mb-1">${escapeHtml(item.description)}</p>
                <p class="small mb-0"><strong>Awareness advice:</strong> ${escapeHtml(item.advice)}</p>
                <p class="small text-muted mt-2 mb-0">
                    This is not a medical diagnosis. Please consult a healthcare professional for any serious concerns.
                </p>
            </div>
        `;
        container.appendChild(card);
    });
}

/* ============== Location-based Health Alerts ============== */

const HEALTH_ALERTS_API = "/api/alerts/nearby"; // placeholder

function initLocationAlerts() {
    const btn = document.getElementById("checkAlertsBtn");
    const result = document.getElementById("alertsResult");
    const btnText = document.getElementById("alertsBtnText");
    const spinner = document.getElementById("alertsLoadingSpinner");

    if (!btn || !result) return;

    btn.addEventListener("click", () => {
        if (!navigator.geolocation) {
            result.innerHTML = `<div class="alert alert-warning">Geolocation is not supported by your browser.</div>`;
            return;
        }

        result.innerHTML = "";
        setLoadingState(true);

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    // Placeholder mock alerts based on coordinates
                    const alerts = getMockAlerts(latitude, longitude);
                    // Example backend call:
                    // const response = await fetch(\`\${HEALTH_ALERTS_API}?lat=\${latitude}&lng=\${longitude}\`);
                    // const alerts = await response.json();
                    renderAlerts(result, alerts, { latitude, longitude });
                } catch (err) {
                    result.innerHTML = `<div class="alert alert-danger">Unable to load health alerts. Please try again later.</div>`;
                } finally {
                    setLoadingState(false);
                }
            },
            (err) => {
                setLoadingState(false);
                if (err.code === err.PERMISSION_DENIED) {
                    result.innerHTML = `<div class="alert alert-warning">Location permission denied. Please allow location access to view nearby health alerts.</div>`;
                } else {
                    result.innerHTML = `<div class="alert alert-danger">Unable to fetch your location. Please try again.</div>`;
                }
            }
        );
    });

    function setLoadingState(isLoading) {
        if (btn) btn.disabled = isLoading;
        if (btnText) btnText.classList.toggle("d-none", isLoading);
        if (spinner) spinner.classList.toggle("d-none", !isLoading);
    }
}

function getMockAlerts(lat, lng) {
    // Simple static alerts with coordinates echoed back
    return [
        {
            level: "Moderate",
            type: "Vector-borne disease awareness",
            description: "Recent reports of mosquito‑borne illnesses in your broader region. Focus on mosquito bite prevention and eliminating stagnant water.",
            advice: "Use mosquito nets, apply repellents, and follow public health advisories.",
            badgeColor: "warning"
        },
        {
            level: "Low",
            type: "Respiratory infection season",
            description: "Mild increase in seasonal flu and respiratory infections expected during this period.",
            advice: "Practice cough etiquette, hand hygiene, and consider recommended vaccinations.",
            badgeColor: "info"
        }
    ];
}

function renderAlerts(container, alerts, coords) {
    const locText = coords
        ? `<p class="small text-muted mb-2">Approximate coordinates: ${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}</p>`
        : "";

    let html = `
        <div class="health-alert-card card border-0 mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="card-title mb-0"><i class="fa-solid fa-bell text-primary me-2"></i>Regional Health Awareness Snapshot</h5>
                    <span class="badge bg-primary-subtle text-primary alert-badge">Demo Data</span>
                </div>
                ${locText}
                <p class="small text-muted mb-3">These alerts are placeholder examples for your mini project. In the final system, they will be powered by live data from the Java Spring Boot backend.</p>
    `;

    alerts.forEach(alert => {
        html += `
            <div class="border-start ps-3 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="fw-semibold">${escapeHtml(alert.type)}</span>
                    <span class="badge bg-${alert.badgeColor}-subtle text-${alert.badgeColor} health-alert-pill">${escapeHtml(alert.level)}</span>
                </div>
                <p class="small mb-1">${escapeHtml(alert.description)}</p>
                <p class="small mb-0"><strong>Advice:</strong> ${escapeHtml(alert.advice)}</p>
            </div>
        `;
    });

    html += `
                <p class="small text-muted mb-0">
                    Always refer to official public health sources and healthcare professionals for verified information.
                </p>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

/* ============== Voice Input ============== */

function initVoiceInput() {
    const btn = document.getElementById("voiceInputBtn");
    const input = document.getElementById("chatFullscreenInput");

    if (!btn || !input) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        btn.disabled = true;
        btn.title = "Speech recognition not supported in this browser.";
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let listening = false;

    recognition.addEventListener("start", () => {
        listening = true;
        btn.classList.add("btn-danger");
        btn.classList.remove("btn-outline-secondary");
        btn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>';
        btn.title = "Listening... click to stop.";
    });

    recognition.addEventListener("end", () => {
        listening = false;
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-outline-secondary");
        btn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        btn.title = "Voice input";
    });

    recognition.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
        input.focus();
    });

    btn.addEventListener("click", () => {
        if (!listening) {
            try {
                recognition.start();
            } catch (e) {
                // ignore repeated calls
            }
        } else {
            recognition.stop();
        }
    });
}

/* ============== Helpers ============== */

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

