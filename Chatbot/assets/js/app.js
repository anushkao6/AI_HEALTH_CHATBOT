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
            chat_disclaimer: "This assistant provides educational health awareness and should not replace professional medical advice.",
            // Disease labels
            symptoms_label: "Symptoms:",
            causes_label: "Causes:",
            prevention_label: "Prevention:",
            // Symptom Checker
            symptom_checker_title: "Smart Symptom Checker",
            symptom_checker_desc: "Select your symptoms to get educational insights on possible conditions.",
            select_symptoms: "Select your symptoms:",
            fever: "Fever",
            headache: "Headache",
            cough: "Cough",
            fatigue: "Fatigue",
            nausea: "Nausea",
            body_pain: "Body Pain",
            analyze_symptoms: "Analyze Symptoms",
            symptom_disclaimer: "This feature provides awareness-based suggestions only and is not a diagnostic tool.",
            // Disease Info
            disease_info_title: "Disease Awareness",
            disease_info_desc: "Learn about common diseases, their symptoms, causes, and prevention strategies.",
            dengue_title: "Dengue",
            dengue_subtitle: "Mosquito-borne viral infection",
            dengue_symptoms: "High fever, severe headache, pain behind the eyes, joint and muscle pain, nausea, skin rash.",
            dengue_causes: "Spread through the bite of infected Aedes mosquitoes.",
            dengue_prevention: "Avoid mosquito bites, remove stagnant water, use mosquito nets and repellents.",
            malaria_title: "Malaria",
            malaria_subtitle: "Parasitic mosquito-borne disease",
            malaria_symptoms: "Fever with chills, sweating, headache, nausea, vomiting, fatigue.",
            malaria_causes: "Caused by Plasmodium parasites transmitted through Anopheles mosquitoes.",
            malaria_prevention: "Use mosquito nets, repellents, indoor spraying, and follow local health guidance.",
            covid_title: "COVID-19",
            covid_subtitle: "Respiratory viral infection",
            covid_symptoms: "Fever, dry cough, tiredness, loss of taste or smell, sore throat, difficulty breathing.",
            covid_causes: "Caused by SARS-CoV-2 virus, spread via respiratory droplets and aerosols.",
            covid_prevention: "Vaccination, masks in crowded places, hand hygiene, good ventilation, physical distancing.",
            diabetes_title: "Diabetes",
            diabetes_subtitle: "Chronic metabolic disorder",
            diabetes_symptoms: "Increased thirst, frequent urination, fatigue, blurred vision, slow-healing sores.",
            diabetes_causes: "Insufficient insulin production or ineffective insulin use; influenced by genetics and lifestyle.",
            diabetes_prevention: "Healthy diet, regular exercise, weight management, routine health check-ups.",
            influenza_title: "Influenza (Flu)",
            influenza_subtitle: "Seasonal viral infection",
            influenza_symptoms: "Sudden fever, chills, cough, sore throat, muscle aches, fatigue.",
            influenza_causes: "Infection with influenza viruses, spread through droplets when people cough or sneeze.",
            influenza_prevention: "Annual flu vaccination, hand hygiene, covering coughs and sneezes, staying home when sick.",
            // Prevention Tips
            prevention_title: "Prevention Tips",
            prevention_desc: "Small daily actions can make a big difference in protecting your health and community.",
            hand_hygiene_title: "Hand Hygiene",
            hand_hygiene_desc: "Wash hands regularly with soap and water for at least 20 seconds, especially before eating and after contact with public surfaces.",
            vaccination_title: "Vaccination Awareness",
            vaccination_desc: "Stay informed about recommended vaccines for your age and region, and follow your local health authority's guidelines.",
            mosquito_title: "Mosquito Protection",
            mosquito_desc: "Remove stagnant water around your home, use nets and repellents, and wear long-sleeved clothing in mosquito-prone areas.",
            lifestyle_title: "Healthy Lifestyle",
            lifestyle_desc: "Eat a balanced diet, exercise regularly, sleep well, and manage stress to strengthen your immune system.",
            // Health Alerts
            alerts_title: "Location-Based Health Alerts",
            alerts_desc: "Check placeholder health alerts for your area. This will connect to live data from the backend in the future.",
            alerts_check_title: "Check Health Alerts Near Me",
            alerts_check_desc: "We use your approximate location to show region-specific public health awareness alerts.",
            check_alerts_btn: "Check Alerts Near Me",
            // FAQ
            faq_title: "Frequently Asked Questions",
            faq_desc: "Quick answers to common health awareness questions.",
            faq_q1: "What should I do if I have fever?",
            faq_a1: "If you develop a fever, monitor your temperature, stay hydrated, rest, and avoid self-medication with antibiotics. Seek medical advice if the fever persists, becomes very high, or is accompanied by warning signs such as difficulty breathing, chest pain, severe headache, rash, or confusion.",
            faq_q2: "How does dengue spread?",
            faq_a2: "Dengue spreads through the bite of infected Aedes mosquitoes, which usually bite during the day. The virus is not spread directly from person to person. Preventing mosquito breeding and avoiding mosquito bites are key strategies to reduce dengue transmission.",
            faq_q3: "When should I consult a doctor?",
            faq_a3: "You should consult a doctor if your symptoms are severe, persistent, or worsening; if you have difficulty breathing, chest pain, confusion, or persistent high fever; or if you belong to a higher-risk group such as young children, older adults, or people with chronic health conditions.",
            // Footer
            footer_about: "An AI-driven public health awareness chatbot for educational purposes, developed as a Java Full Stack mini project.",
            footer_frontend: "Frontend: HTML5, CSS3, JavaScript, Bootstrap 5",
            footer_backend: "Backend (planned): Java Spring Boot REST APIs",
            footer_team_title: "Project Team",
            footer_team_member1: "Team Member 1 (Developer)",
            footer_team_member2: "Team Member 2 (Developer)",
            footer_team_member3: "Team Member 3 (Testing & Documentation)",
            footer_disclaimer_title: "Disclaimer",
            footer_disclaimer1: "This chatbot provides educational health awareness information and should not replace professional medical advice, diagnosis, or treatment.",
            footer_disclaimer2: "For any serious or emergency symptoms, please consult a qualified healthcare professional immediately.",
            footer_copyright: "© [YEAR] HealthGuard AI. All rights reserved.",
            footer_project: "College Mini Project • Java Full Stack"
        },
        hi: {
            emergency_banner: "यदि लक्षण गंभीर हो जाएँ, तो कृपया तुरंत किसी स्वास्थ्य विशेषज्ञ से संपर्क करें।",
            nav_home: "होम",
            nav_chatbot: "चैटबॉट",
            nav_symptom_checker: "लक्षण जांच",
            nav_disease_info: "रोग जानकारी",
            nav_prevention: "रोकथाम टिप्स",
            nav_faq: "सामान्य प्रश्न",
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
            chat_disclaimer: "यह सहायक केवल स्वास्थ्य जागरूकता के लिए है और डॉक्टर की सलाह का विकल्प नहीं है।",
            // Disease labels
            symptoms_label: "लक्षण:",
            causes_label: "कारण:",
            prevention_label: "रोकथाम:",
            // Symptom Checker
            symptom_checker_title: "स्मार्ट लक्षण जांचक",
            symptom_checker_desc: "संभावित स्थितियों पर शैक्षिक अंतर्दृष्टि प्राप्त करने के लिए अपने लक्षण चुनें।",
            select_symptoms: "अपने लक्षण चुनें:",
            fever: "बुखार",
            headache: "सिरदर्द",
            cough: "खांसी",
            fatigue: "थकान",
            nausea: "जी मिचलाना",
            body_pain: "शरीर दर्द",
            analyze_symptoms: "लक्षण विश्लेषण करें",
            symptom_disclaimer: "यह सुविधा केवल जागरूकता-आधारित सुझाव प्रदान करती है और एक नैदानिक उपकरण नहीं है।",
            // Disease Info
            disease_info_title: "रोग जागरूकता",
            disease_info_desc: "सामान्य बीमारियों, उनके लक्षणों, कारणों और रोकथाम रणनीतियों के बारे में जानें।",
            dengue_title: "डेंगू",
            dengue_subtitle: "मच्छर-जनित वायरल संक्रमण",
            dengue_symptoms: "उच्च बुखार, गंभीर सिरदर्द, आंखों के पीछे दर्द, जोड़ और मांसपेशियों का दर्द, जी मिचलाना, त्वचा पर दाने।",
            dengue_causes: "संक्रमित एडीज मच्छर के काटने से फैलता है।",
            dengue_prevention: "मच्छर के काटने से बचें, खड़ा पानी हटाएं, मच्छरदानी और रेपेलेंट का उपयोग करें।",
            malaria_title: "मलेरिया",
            malaria_subtitle: "परजीवी मच्छर-जनित रोग",
            malaria_symptoms: "ठंड के साथ बुखार, पसीना, सिरदर्द, जी मिचलाना, उल्टी, थकान।",
            malaria_causes: "प्लाज्मोडियम परजीवियों द्वारा एंफेलीज मच्छरों के माध्यम से फैलता है।",
            malaria_prevention: "मच्छरदानी, रेपेलेंट, घर के अंदर स्प्रे का उपयोग करें, और स्थानीय स्वास्थ्य मार्गदर्शन का पालन करें।",
            covid_title: "कोविड-19",
            covid_subtitle: "श्वसन वायरल संक्रमण",
            covid_symptoms: "बुखार, सूखी खांसी, थकान, स्वाद या गंध की हानि, गले में खराश, सांस लेने में कठिनाई।",
            covid_causes: "SARS-CoV-2 वायरस द्वारा, श्वसन बूंदों और एरोसोल के माध्यम से फैलता है।",
            covid_prevention: "टीकाकरण, भीड़भाड़ वाली जगहों पर मास्क, हाथ स्वच्छता, अच्छी वेंटिलेशन, शारीरिक दूरी।",
            diabetes_title: "मधुमेह",
            diabetes_subtitle: "जीर्ण चयापचय विकार",
            diabetes_causes: "अपर्याप्त इंसुलिन उत्पादन या अप्रभावी इंसुलिन उपयोग; आनुवंशिकी और जीवनशैली से प्रभावित।",
            diabetes_prevention: "स्वस्थ आहार, नियमित व्यायाम, वजन प्रबंधन, नियमित स्वास्थ्य जांच।",
            diabetes_symptoms: "प्यास में वृद्धि, बार-बार पेशाब, थकान, धुंधली दृष्टि, धीरे-धीरे ठीक होने वाले घाव।",
            influenza_title: "इन्फ्लुएंजा (फ्लू)",
            influenza_subtitle: "मौसमी वायरल संक्रमण",
            influenza_symptoms: "अचानक बुखार, ठंड, खांसी, गले में खराश, मांसपेशियों में दर्द, थकान।",
            influenza_causes: "इन्फ्लुएंजा वायरस से संक्रमण, जब लोग खांसते या छींकते हैं तो बूंदों के माध्यम से फैलता है।",
            influenza_prevention: "वार्षिक फ्लू टीकाकरण, हाथ स्वच्छता, खांसी और छींक को ढकना, बीमार होने पर घर पर रहना।",
            // Prevention Tips
            prevention_title: "रोकथाम टिप्स",
            prevention_desc: "छोटी दैनिक क्रियाएं आपके स्वास्थ्य और समुदाय की रक्षा में बड़ा अंतर ला सकती हैं।",
            hand_hygiene_title: "हाथ स्वच्छता",
            hand_hygiene_desc: "खाना खाने से पहले और सार्वजनिक सतहों से संपर्क करने के बाद विशेष रूप से साबुन और पानी से कम से कम 20 सेकंड तक हाथ धोएं।",
            vaccination_title: "टीकाकरण जागरूकता",
            vaccination_desc: "अपनी उम्र और क्षेत्र के लिए अनुशंसित टीकों के बारे में सूचित रहें, और अपने स्थानीय स्वास्थ्य अधिकारी के मार्गदर्शिकाओं का पालन करें।",
            mosquito_title: "मच्छर सुरक्षा",
            mosquito_desc: "अपने घर के आसपास खड़ा पानी हटाएं, जाली और रेपेलेंट का उपयोग करें, और मच्छर वाले क्षेत्रों में लंबी बाजू वाली कपड़े पहनें।",
            lifestyle_title: "स्वस्थ जीवनशैली",
            lifestyle_desc: "संतुलित आहार खाएं, नियमित व्यायाम करें, अच्छी नींद लें, और अपनी प्रतिरक्षा प्रणाली को मजबूत करने के लिए तनाव प्रबंधित करें।",
            // Health Alerts
            alerts_title: "स्थान-आधारित स्वास्थ्य अलर्ट",
            alerts_desc: "अपने क्षेत्र के लिए प्लेसहोल्डर स्वास्थ्य अलर्ट जांचें। भविष्य में यह बैकएंड से लाइव डेटा से कनेक्ट होगा।",
            alerts_check_title: "मेरे पास स्वास्थ्य अलर्ट जांचें",
            alerts_check_desc: "हम क्षेत्र-विशिष्ट सार्वजनिक स्वास्थ्य जागरूकता अलर्ट दिखाने के लिए आपके अनुमानित स्थान का उपयोग करते हैं।",
            check_alerts_btn: "मेरे पास अलर्ट जांचें",
            // FAQ
            faq_title: "सामान्य प्रश्न",
            faq_desc: "सामान्य स्वास्थ्य जागरूकता प्रश्नों के त्वरित उत्तर।",
            faq_q1: "यदि मुझे बुखार है तो मुझे क्या करना चाहिए?",
            faq_a1: "यदि आपको बुखार आता है, तो अपना तापमान मॉनिटर करें, हाइड्रेटेड रहें, आराम करें, और एंटीबायोटिक्स के साथ स्व-दवा से बचें। यदि बुखार बना रहता है, बहुत अधिक हो जाता है, या सांस लेने में कठिनाई, छाती में दर्द, गंभीर सिरदर्द, दाने, या भ्रम जैसे चेतावनी संकेतों के साथ होता है तो चिकित्सा सलाह लें।",
            faq_q2: "डेंगू कैसे फैलता है?",
            faq_a2: "डेंगू संक्रमित एडीज मच्छर के काटने से फैलता है, जो आमतौर पर दिन के दौरान काटते हैं। वायरस व्यक्ति से व्यक्ति सीधे नहीं फैलता। मच्छर पैदा करने को रोकना और मच्छर के काटने से बचना डेंगू प्रसार को कम करने की प्रमुख रणनीतियां हैं।",
            faq_q3: "मुझे कब डॉक्टर से सलाह लेनी चाहिए?",
            faq_a3: "यदि आपके लक्षण गंभीर, लगातार या बिगड़ रहे हैं; यदि आपको सांस लेने में कठिनाई, छाती में दर्द, भ्रम, या लगातार उच्च बुखार है; या यदि आप उच्च जोखिम वाले समूह से संबंधित हैं जैसे छोटे बच्चे, बुजुर्ग, या पुरानी स्वास्थ्य स्थितियों वाले लोग तो आपको डॉक्टर से सलाह लेनी चाहिए।",
            // Footer
            footer_about: "शैक्षिक उद्देश्यों के लिए एक AI-चालित सार्वजनिक स्वास्थ्य जागरूकता चैटबॉट, जिसे जावा फुल स्टैक मिनी प्रोजेक्ट के रूप में विकसित किया गया है।",
            footer_frontend: "फ्रंटएंड: HTML5, CSS3, JavaScript, Bootstrap 5",
            footer_backend: "बैकएंड (योजनाबद्ध): Java Spring Boot REST APIs",
            footer_team_title: "प्रोजेक्ट टीम",
            footer_team_member1: "टीम सदस्य 1 (डेवलपर)",
            footer_team_member2: "टीम सदस्य 2 (डेवलपर)",
            footer_team_member3: "टीम सदस्य 3 (टेस्टिंग और दस्तावेजीकरण)",
            footer_disclaimer_title: "अस्वीकरण",
            footer_disclaimer1: "यह चैटबॉट शैक्षिक स्वास्थ्य जागरूकता जानकारी प्रदान करता है और पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं होना चाहिए।",
            footer_disclaimer2: "किसी भी गंभीर या आपातकालीन लक्षणों के लिए, कृपया तुरंत एक योग्य स्वास्थ्य पेशेवर से सलाह लें।",
            footer_copyright: "© [YEAR] HealthGuard AI. सर्वाधिकार सुरक्षित।",
            footer_project: "कॉलेज मिनी प्रोजेक्ट • जावा फुल स्टैक"
        },
        mr: {
            emergency_banner: "लक्षण गंभीर झाल्यास कृपया त्वरितपणे आरोग्यतज्ज्ञांचा सल्ला घ्या.",
            nav_home: "होम",
            nav_chatbot: "चॅटबॉट",
            nav_symptom_checker: "लक्षण तपासणी",
            nav_disease_info: "रोग माहिती",
            nav_prevention: "प्रतिबंध टिप्स",
            nav_faq: "सामान्य प्रश्न",
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
            chat_disclaimer: "ही माहिती केवळ आरोग्य जागरूकतेसाठी आहे आणि डॉक्टरांच्या सल्ल्याचा पर्याय नाही.",
            // Disease labels
            symptoms_label: "लक्षणे:",
            causes_label: "कारणे:",
            prevention_label: "प्रतिबंध:",
            // Symptom Checker
            symptom_checker_title: "स्मार्ट लक्षण तपासणी",
            symptom_checker_desc: "संभाव्य स्थितींवर शैक्षणिक अंतर्दृष्टी मिळविण्यासाठी तुमची लक्षणे निवडा.",
            select_symptoms: "तुमची लक्षणे निवडा:",
            fever: "ताप",
            headache: "डोकेदुखी",
            cough: "खोकला",
            fatigue: "थकवा",
            nausea: "मळमळ",
            body_pain: "शरीर दुखी",
            analyze_symptoms: "लक्षणे विश्लेषण करा",
            symptom_disclaimer: "ही सुविधा केवळ जागरूकता-आधारित सूचना प्रदान करते आणि एक निदानात्मक साधन नाही.",
            // Disease Info
            disease_info_title: "रोग जागरूकता",
            disease_info_desc: "सामान्य आजार, त्यांची लक्षणे, कारणे आणि प्रतिबंधक धोरणे जाणून घ्या.",
            dengue_title: "डेंगू",
            dengue_subtitle: "मच्छर-जनित विषाणूजन्य संसर्ग",
            dengue_symptoms: "उच्च ताप, गंभीर डोकेदुखी, डोळ्यांच्या मागे दुखी, सांधे आणि स्नायू दुखी, मळमळ, त्वचेवर पुरळ.",
            dengue_causes: "संक्रमित एडीज मच्छरांच्या चावण्याद्वारे पसरते.",
            dengue_prevention: "मच्छरांच्या चावण्यापासून दूर रहा, उभे पाणी काढून टाका, मच्छरदाण्या आणि प्रतिबंधक वापरा.",
            malaria_title: "मलेरिया",
            malaria_subtitle: "परजीवी मच्छर-जनित रोग",
            malaria_symptoms: "थंडी सह ताप, घाम, डोकेदुखी, मळमळ, उलट्या, थकवा.",
            malaria_causes: "प्लाज्मोडियम परजीव्याद्वारे एंफेलीज मच्छरांच्या माध्यमातून पसरते.",
            malaria_prevention: "मच्छरदाण्या, प्रतिबंधक, घरात फवारणी वापरा आणि स्थानिक आरोग्य मार्गदर्शनाचे पालन करा.",
            covid_title: "कोविड-19",
            covid_subtitle: "श्वसन विषाणूजन्य संसर्ग",
            covid_symptoms: "ताप, कोरडा खोकला, थकवा, चव किंवा वास हरवणे, घशात खरखर, श्वास घेण्यात अडचण.",
            covid_causes: "SARS-CoV-2 विषाणूद्वारे, श्वसन बिंदू आणि एरोसोलद्वारे पसरते.",
            covid_prevention: "लसीकरण, गर्दीच्या ठिकाणी मास्क, हात स्वच्छता, चांगली व्हेंटिलेशन, शारीरिक अंतर.",
            diabetes_title: "मधुमेह",
            diabetes_subtitle: "कालव्यापी चयापचय विकार",
            diabetes_symptoms: "तहान वाढणे, वारंवार लघवी, थकवा, धुंद दृष्टी, हळूहळू बरे होणारे व्रण.",
            diabetes_causes: "अपर्याप्त इन्सुलिन उत्पादन किंवा अप्रभावी इन्सुलिन वापर; वंशपरंपरा आणि जीवनशैलीने प्रभावित.",
            diabetes_prevention: "निरोगी आहार, नियमित व्यायाम, वजन व्यवस्थापन, नियमित आरोग्य तपासणी.",
            influenza_title: "इन्फ्लुएंझा (फ्लू)",
            influenza_subtitle: "हंगामी विषाणूजन्य संसर्ग",
            influenza_symptoms: "अचानक ताप, थंडी, खोकला, घशात खरखर, स्नायू दुखी, थकवा.",
            influenza_causes: "इन्फ्लुएंझा विषाणूंशी संसर्ग, लोक खोकतात किंवा शिंकतात तेव्हा बिंदूद्वारे पसरते.",
            influenza_prevention: "वार्षिक फ्लू लसीकरण, हात स्वच्छता, खोकला आणि शिंकणे झाकणे, आजारी असताना घरी राहणे.",
            // Prevention Tips
            prevention_title: "प्रतिबंध टिप्स",
            prevention_desc: "लहान दैनंदिन क्रिया तुमच्या आरोग्य आणि समुदायाच्या संरक्षणात मोठा फरक करू शकतात.",
            hand_hygiene_title: "हात स्वच्छता",
            hand_hygiene_desc: "जेवण करण्यापूर्वी आणि सार्वजनिक पृष्ठभागांशी संपर्क साधल्यानंतर विशेषतः साबण आणि पाण्याने किमान 20 सेकंद हात धुवा.",
            vaccination_title: "लसीकरण जागरूकता",
            vaccination_desc: "तुमच्या वय आणि प्रदेशासाठी शिफारस केलेल्या लसींबद्दल माहिती ठेवा आणि तुमच्या स्थानिक आरोग्य अधिकाऱ्याच्या मार्गदर्शक तत्त्वांचे पालन करा.",
            mosquito_title: "मच्छर संरक्षण",
            mosquito_desc: "तुमच्या घराभोवती उभे पाणी काढून टाका, जाळ्या आणि प्रतिबंधक वापरा आणि मच्छर-प्रवण भागात लांब बाहीचे कपडे घाला.",
            lifestyle_title: "निरोगी जीवनशैली",
            lifestyle_desc: "संतुलित आहार घ्या, नियमित व्यायाम करा, चांगली झोप घ्या आणि तुमची रोगप्रतिकारक शक्ती मजबूत करण्यासाठी तणाव व्यवस्थापित करा.",
            // Health Alerts
            alerts_title: "स्थान-आधारित आरोग्य अलर्ट",
            alerts_desc: "तुमच्या प्रदेशासाठी प्लेसहोल्डर आरोग्य अलर्ट तपासा. भविष्यात हे बॅकएंडमधून लाइव्ह डेटाशी कनेक्ट होईल.",
            alerts_check_title: "माझ्या जवळील आरोग्य अलर्ट तपासा",
            alerts_check_desc: "आम्ही प्रदेश-विशिष्ट सार्वजनिक आरोग्य जागरूकता अलर्ट दाखवण्यासाठी तुमचे अंदाजे स्थान वापरतो.",
            check_alerts_btn: "माझ्या जवळील अलर्ट तपासा",
            // FAQ
            faq_title: "सामान्य प्रश्न",
            faq_desc: "सामान्य आरोग्य जागरूकता प्रश्नांची जलद उत्तरे.",
            faq_q1: "मला ताप आला तर मी काय करावे?",
            faq_a1: "तुम्हाला ताप आला तर तुमचा तापमान मॉनिटर करा, हायड्रेटेड राहा, आराम करा आणि अँटीबायोटिक्ससह स्वयं-औषध टाळा. ताप कायम राहिल्यास, खूप उच्च झाल्यास किंवा श्वास घेण्यात अडचण, छाती दुखी, गंभीर डोकेदुखी, पुरळ किंवा गोंधळ यांसारख्या चेतावणी चिन्हांसह झाल्यास वैद्यकीय सल्ला घ्या.",
            faq_q2: "डेंगू कसा पसरतो?",
            faq_a2: "डेंगू संक्रमित एडीज मच्छरांच्या चावण्याद्वारे पसरतो, जे सहसा दिवसभर चावतात. विषाणू व्यक्तीला व्यक्तीला थेट पसरत नाही. मच्छर पालन रोखणे आणि मच्छरांच्या चावण्यापासून दूर राहणे हे डेंगू प्रसार कमी करण्याच्या प्रमुख धोरण आहेत.",
            faq_q3: "मला कधी डॉक्टरांचा सल्ला घ्यायला हवा?",
            faq_a3: "तुमची लक्षणे गंभीर, सतत किंवा वाढत असल्यास; तुम्हाला श्वास घेण्यात अडचण, छाती दुखी, गोंधळ किंवा सतत उच्च ताप असल्यास; किंवा तुम्ही उच्च जोखिम गटाशी संबंधित असल्यास जसे लहान मुले, वृद्ध किंवा कालव्यापी आरोग्य स्थिती असलेले लोक तर तुम्ही डॉक्टरांचा सल्ला घ्या.",
            // Footer
            footer_about: "शैक्षणिक उद्देशांसाठी एक AI-चालित सार्वजनिक आरोग्य जागरूकता चॅटबॉट, ज्याला Java Full Stack मिनी प्रोजेक्ट म्हणून विकसित केले आहे.",
            footer_frontend: "फ्रंटएंड: HTML5, CSS3, JavaScript, Bootstrap 5",
            footer_backend: "बॅकएंड (योजनाबद्ध): Java Spring Boot REST APIs",
            footer_team_title: "प्रोजेक्ट टीम",
            footer_team_member1: "टीम सदस्य 1 (डेवलपर)",
            footer_team_member2: "टीम सदस्य 2 (डेवलपर)",
            footer_team_member3: "टीम सदस्य 3 (चाचणी आणि दस्तऐवजीकरण)",
            footer_disclaimer_title: "अस्वीकरण",
            footer_disclaimer1: "हा चॅटबॉट शैक्षणिक आरोग्य जागरूकता माहिती प्रदान करतो आणि व्यावसायिक वैद्यकीय सल्ला, निदान किंवा उपचाराचा पर्याय असू नये.",
            footer_disclaimer2: "कोणत्याही गंभीर किंवा आणीबाणीच्या लक्षणांसाठी, कृपया त्वरित योग्य आरोग्य व्यावसायिकांचा सल्ला घ्या.",
            footer_copyright: "© [YEAR] HealthGuard AI. सर्व हक्क राखीव.",
            footer_project: "कॉलेज मिनी प्रोजेक्ट • Java Full Stack"
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
            const container = document.createElement("div");
            container.className = "chat-history-item-wrapper";
            container.style.display = "flex";
            container.style.alignItems = "center";
            container.style.gap = "0.5rem";
            
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "chat-history-item " + (c.id === state.activeId ? "active" : "");
            btn.style.flex = "1";
            btn.innerHTML = `
                <div class="chat-history-title">${escapeHtml(c.title || defaultConversationTitle(chatConfig.language))}</div>
                <div class="chat-history-meta">${formatDateShort(c.updatedAt)}</div>
            `;
            btn.addEventListener("click", () => {
                state.activeId = c.id;
                saveChats(state);
                renderAll();
            });
            container.appendChild(btn);
            
            const deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.className = "btn btn-sm btn-outline-danger";
            deleteBtn.style.padding = "0.35rem 0.5rem";
            deleteBtn.title = "Delete this conversation";
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteConversation(c.id);
            });
            container.appendChild(deleteBtn);
            
            historyList.appendChild(container);
        });
    }

    function deleteConversation(id) {
        state.conversations = state.conversations.filter(c => c.id !== id);
        if (state.activeId === id) {
            state.activeId = state.conversations.length > 0 ? state.conversations[0].id : null;
            if (!state.activeId && state.conversations.length === 0) {
                const now = new Date().toISOString();
                const newConvo = {
                    id: cryptoRandomId(),
                    title: "",
                    updatedAt: now,
                    messages: seedWelcomeMessages(chatConfig.language).map(m => ({
                        sender: m.sender,
                        text: m.text,
                        timestamp: now
                    }))
                };
                state.conversations.push(newConvo);
                state.activeId = newConvo.id;
            }
        }
        saveChats(state);
        renderAll();
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
        // Let messages flow naturally - no auto-scroll
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
        // Let new messages appear naturally at bottom - no auto-scroll
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

    async function handleSubmit(text) {
        if (!text) return;
        pushMessage("user", text);
        setLoading(true);

        // query the AI (or fallback to mock if no key/connection)
        try {
            const reply = await getChatbotReply(text, chatConfig.language);
            pushMessage("bot", reply);
        } catch (err) {
            console.error("Error getting chatbot reply", err);
            pushMessage("bot", "I'm having trouble reaching the AI service right now. Please try again later.");
        } finally {
            setLoading(false);
        }
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

// ---------------------------------------------------
// rule-based healthcare knowledge (no external APIs)
// ---------------------------------------------------

// track last mentioned disease for follow-up
let lastDisease = null;

// dataset of common diseases
const healthData = {
    dengue: {
        symptoms: "High fever, severe headache, pain behind the eyes, joint and muscle pain, nausea, and skin rash.",
        precautions: "Use mosquito repellents, wear full-sleeve clothing, remove stagnant water around the house, and use mosquito nets.",
        awareness: "Dengue is a mosquito-borne viral infection spread by Aedes mosquitoes. Early detection and prevention of mosquito breeding are important.",
        causes: "It is caused by the dengue virus transmitted through mosquito bites.",
        treatment: "There is no specific cure, but proper hydration, rest, and medical supervision help manage symptoms."
    },
    malaria: {
        symptoms: "High fever, chills, sweating, headache, nausea, and fatigue.",
        precautions: "Use mosquito nets, mosquito repellents, and avoid stagnant water areas.",
        awareness: "Malaria is transmitted by infected Anopheles mosquitoes and is common in tropical regions.",
        causes: "It is caused by Plasmodium parasites transmitted through mosquito bites.",
        treatment: "Antimalarial medications prescribed by doctors are used for treatment."
    },
    diabetes: {
        symptoms: "Frequent urination, excessive thirst, fatigue, blurred vision, and slow healing wounds.",
        precautions: "Maintain a balanced diet, exercise regularly, monitor blood sugar levels, and avoid excessive sugar.",
        awareness: "Diabetes is a chronic condition that affects how the body processes blood sugar.",
        causes: "It occurs when the body cannot produce enough insulin or cannot use insulin effectively.",
        treatment: "Treatment includes lifestyle changes, medications, and insulin therapy if required."
    }
};

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getChatbotReply(userText, lang) {
    const text = userText.toLowerCase();
    for (const disease of Object.keys(healthData)) {
        if (text.includes(disease)) {
            lastDisease = disease;
            const info = healthData[disease];
            return `${capitalize(disease)} Information:\n\n` +
                `Symptoms: ${info.symptoms}\n` +
                `Precautions: ${info.precautions}\n` +
                `Causes: ${info.causes}\n` +
                `Treatment: ${info.treatment}\n` +
                `Awareness: ${info.awareness}`;
        }
    }
    if (lastDisease) {
        const info = healthData[lastDisease];
        if (/symptoms?/.test(text)) return info.symptoms;
        if (/precautions?/.test(text)) return info.precautions;
        if (/causes?/.test(text)) return info.causes;
        if (/treatment/.test(text)) return info.treatment;
        if (/spread|how.*spread/.test(text)) return info.awareness;
    }
    return "I am a healthcare awareness chatbot. You can ask about diseases such as dengue, malaria, diabetes, fever, hypertension, etc.";
}

function getMockChatbotReply(userText, lang) {
    return getChatbotReply(userText, lang);
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
            // Let messages flow naturally - no auto-scroll
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
                reply = await getChatbotReply(text, chatConfig.language);
            } catch (err) {
                console.error("Error fetching reply", err);
                reply = "I'm having trouble reaching the AI service right now. Please try again later or contact your healthcare provider if it's urgent.";
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
    // Enhanced heuristic mapping for demo purposes
    const diseases = [];

    const has = (s) => symptoms.includes(s);

    // Provide a dedicated entry for each individual symptom
    if (has("fever")) {
        diseases.push({
            name: "Fever (awareness)",
            likelihood: "Common symptom",
            description: "Fever may be caused by infections, inflammation, or other medical conditions. It signals that the body is fighting something.",
            advice: "Stay hydrated, rest, and seek medical advice if temperature exceeds 39°C (102°F) or persists beyond a couple of days.",
            tag: "General symptom"
        });
    }

    if (has("headache")) {
        diseases.push({
            name: "Headache (awareness)",
            likelihood: "Common symptom",
            description: "Headaches can result from stress, dehydration, sinus issues, or more serious conditions.",
            advice: "Rest in a quiet, dark room, stay hydrated, and consult a healthcare professional if the headache is sudden, severe, or accompanied by other warning signs.",
            tag: "General symptom"
        });
    }

    if (has("cough")) {
        diseases.push({
            name: "Cough (awareness)",
            likelihood: "Common symptom",
            description: "A cough can be triggered by viral or bacterial infections, allergies, or irritants in the air. It helps clear the airway.",
            advice: "Monitor for changes in color or duration, use soothing fluids, and see a doctor if it persists beyond a week or is accompanied by difficulty breathing.",
            tag: "Respiratory symptom"
        });
    }

    if (has("fatigue")) {
        diseases.push({
            name: "Fatigue (awareness)",
            likelihood: "Non-specific",
            description: "Fatigue may stem from lack of sleep, stress, nutritional deficiencies, or underlying illnesses such as viral infections or anemia.",
            advice: "Ensure adequate rest, balanced nutrition, and consult a healthcare provider if fatigue is unexplained or interferes with daily life.",
            tag: "General symptom"
        });
    }

    if (has("nausea")) {
        diseases.push({
            name: "Nausea (awareness)",
            likelihood: "Non-specific",
            description: "Nausea can be caused by gastrointestinal upset, motion sickness, infections, or medication side effects.",
            advice: "Eat bland foods, stay hydrated, and seek medical attention if nausea is severe, persistent, or accompanied by vomiting.",
            tag: "General symptom"
        });
    }

    if (has("body pain")) {
        diseases.push({
            name: "Body pain (awareness)",
            likelihood: "Non-specific",
            description: "Body aches may occur with viral illnesses like flu, overexertion, or inflammatory conditions.",
            advice: "Rest, use over-the-counter pain relievers if appropriate, and consult a doctor if pain is intense or localized.",
            tag: "General symptom"
        });
    }

    // Specific combinations still produce targeted suggestions
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

    // Fallback if nothing matched (should not occur now)
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

