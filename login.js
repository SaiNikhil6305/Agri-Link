// ========================================================
// AGRI-LINK: DEDICATED LOGIN & AUTHENTICATION ENGINE
// ========================================================

import { i18n, SUPPORTED_LANGUAGES } from './i18n.js';
import { 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail, 
    sendPasswordReset, 
    saveUserToFirestore,
    isFirebaseConfigured, 
    formatFirebaseError 
} from './firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const authAlertBox = document.getElementById('auth-alert-box');

    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const btnToggleLoginPwd = document.getElementById('btn-toggle-login-pwd');
    const btnLoginSubmit = document.getElementById('btn-login-submit');

    const regFullname = document.getElementById('reg-fullname');
    const regEmail = document.getElementById('reg-email');
    const regLocation = document.getElementById('reg-location');
    const regPassword = document.getElementById('reg-password');
    const regConfirmPassword = document.getElementById('reg-confirm-password');
    const btnToggleRegPwd = document.getElementById('btn-toggle-reg-pwd');
    const btnRegisterSubmit = document.getElementById('btn-register-submit');
    const regRoleRadios = document.querySelectorAll('input[name="reg-role"]');

    const btnLoginLang = document.getElementById('btn-login-lang');
    const loginLangDropdown = document.getElementById('login-lang-dropdown');
    const loginLangLabel = document.getElementById('login-lang-label');
    const loginLangOpts = document.querySelectorAll('.login-lang-opt');

    const demoButtons = document.querySelectorAll('.btn-demo-quick');

    const API_BASE = window.__AGRI_API_BASE__
        ? `${window.__AGRI_API_BASE__}/auth`
        : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://127.0.0.1:5000/api/auth'
            : '/api/auth');

    // ----------------------------------------------------
    // 1. Language Initialization & Synchronization
    // ----------------------------------------------------
    let activeLang = localStorage.getItem('agrilink_site_lang') || 'en';
    
    function applyLanguage(langCode) {
        activeLang = langCode;
        localStorage.setItem('agrilink_site_lang', activeLang);
        
        if (i18n && i18n.setLanguage) {
            i18n.setLanguage(activeLang);
        }

        const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === activeLang) || SUPPORTED_LANGUAGES[0];
        if (loginLangLabel) {
            loginLangLabel.textContent = `${langMeta.native} (${langMeta.label})`;
        }

        loginLangOpts.forEach(btn => {
            if (btn.dataset.lang === activeLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    applyLanguage(activeLang);

    // Language selector dropdown toggle
    if (btnLoginLang && loginLangDropdown) {
        btnLoginLang.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = loginLangDropdown.style.display === 'block';
            loginLangDropdown.style.display = isOpen ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (!loginLangDropdown.contains(e.target) && e.target !== btnLoginLang && !btnLoginLang.contains(e.target)) {
                loginLangDropdown.style.display = 'none';
            }
        });

        loginLangOpts.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const code = btn.dataset.lang;
                if (code) {
                    applyLanguage(code);
                }
                loginLangDropdown.style.display = 'none';
            });
        });
    }

    // Check if user is already authenticated
    const existingToken = localStorage.getItem('agrilink_auth_token');
    const existingUser = JSON.parse(localStorage.getItem('agrilink_user') || 'null');
    if (existingToken && existingUser) {
        showAlert(`Currently signed in as ${existingUser.fullname || existingUser.full_name || 'User'} (${existingUser.role}). <a href="./index.html" style="color:#059669; font-weight:700; text-decoration:underline; margin-left:8px;">Continue to Workstation &rarr;</a>`, 'success');
    }

    // ----------------------------------------------------
    // 2. Tab Navigation: Sign In / Create Account
    // ----------------------------------------------------
    function extractErrorMessage(err, fallback = 'Operation failed') {
        if (!err) return fallback;
        if (typeof err === 'string') return err;
        if (typeof err.detail === 'string') return err.detail;
        if (Array.isArray(err.detail)) {
            return err.detail.map(d => `${d.loc ? d.loc.filter(x => x !== 'body').join('.') + ': ' : ''}${d.msg}`).join(', ');
        }
        if (err.detail && typeof err.detail === 'object') {
            return JSON.stringify(err.detail);
        }
        if (err.message && typeof err.message === 'string') return err.message;
        return fallback;
    }

    function showAlert(msg, type = 'error') {
        if (!authAlertBox) return;
        authAlertBox.className = `auth-alert ${type}`;
        authAlertBox.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> <span>${msg}</span>`;
        authAlertBox.style.display = 'flex';
    }

    function hideAlert() {
        if (authAlertBox) authAlertBox.style.display = 'none';
    }

    if (tabLogin && tabRegister) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            if (formLogin) formLogin.style.display = 'block';
            if (formRegister) formRegister.style.display = 'none';
            hideAlert();
        });

        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            if (formRegister) formRegister.style.display = 'block';
            if (formLogin) formLogin.style.display = 'none';
            hideAlert();
        });
    }

    // Show/Hide password toggles
    if (btnToggleLoginPwd && loginPasswordInput) {
        btnToggleLoginPwd.addEventListener('click', () => {
            const isPwd = loginPasswordInput.type === 'password';
            loginPasswordInput.type = isPwd ? 'text' : 'password';
            btnToggleLoginPwd.innerHTML = `<i class="fas ${isPwd ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
        });
    }

    if (btnToggleRegPwd && regPassword) {
        btnToggleRegPwd.addEventListener('click', () => {
            const isPwd = regPassword.type === 'password';
            regPassword.type = isPwd ? 'text' : 'password';
            btnToggleRegPwd.innerHTML = `<i class="fas ${isPwd ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
        });
    }

    // Role radio selection visual feedback (supports reg-role and google-role)
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const groupName = radio.name;
            document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
                r.closest('.reg-role-radio')?.classList.remove('active');
            });
            radio.closest('.reg-role-radio')?.classList.add('active');
        });
    });

    // ----------------------------------------------------
    // Location Auto-Detection Engine (GPS + IP Fallback)
    // ----------------------------------------------------
    const btnDetectRegLocation = document.getElementById('btn-detect-reg-location');
    const btnDetectRegLocationLink = document.getElementById('btn-detect-reg-location-link');
    const regLocationStatus = document.getElementById('reg-location-status');

    function formatLocationFromData(data, source = 'gps') {
        const locality = data.locality || data.city || '';
        let district = '';
        if (data.localityInfo && data.localityInfo.administrative) {
            const distItem = data.localityInfo.administrative.find(item => 
                (item.description && item.description.toLowerCase().includes('district')) ||
                (item.name && item.name.toLowerCase().includes('district'))
            );
            if (distItem) {
                district = distItem.name.replace(/\s*district\s*/i, '').trim();
            }
        }
        const state = data.principalSubdivision || '';
        const parts = [];
        if (locality) parts.push(locality);
        if (district && (!locality || district.toLowerCase() !== locality.toLowerCase())) parts.push(district);
        if (state && (!district || state.toLowerCase() !== district.toLowerCase())) parts.push(state);
        
        let locString = parts.join(', ');
        if (!locString && data.countryName) locString = `${data.city || data.locality || 'Regional Hub'}, ${data.countryName}`;
        return { location: locString, source };
    }

    async function reverseGeocodeCoords(lat, lon) {
        // 1. Primary: BigDataCloud Reverse Geocoding Client
        try {
            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                const formatted = formatLocationFromData(data, 'gps');
                if (formatted.location) return formatted;
            }
        } catch (e) {
            console.warn('BigDataCloud reverse geocode error:', e);
        }

        // 2. Fallback: OpenStreetMap Nominatim
        try {
            const nomUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
            const nomRes = await fetch(nomUrl, { headers: { 'Accept': 'application/json' } });
            if (nomRes.ok) {
                const nomData = await nomRes.json();
                const a = nomData.address || {};
                const town = a.city || a.town || a.village || a.suburb || a.county || '';
                const state = a.state || '';
                const dist = a.state_district ? a.state_district.replace(/\s*district\s*/i, '').trim() : '';
                const parts = [town, dist, state].filter(Boolean);
                const clean = [...new Set(parts)];
                if (clean.length > 0) return { location: clean.join(', '), source: 'gps' };
            }
        } catch (e) {
            console.warn('Nominatim reverse geocode error:', e);
        }

        return { location: `Mandi Hub (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E), India`, source: 'coords' };
    }

    async function detectLocationByIP() {
        try {
            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                const formatted = formatLocationFromData(data, 'network');
                if (formatted.location) return formatted;
            }
        } catch (e) {
            console.warn('IP reverse geocode error:', e);
        }

        try {
            const ipRes = await fetch('https://ipapi.co/json/');
            if (ipRes.ok) {
                const ipData = await ipRes.json();
                const city = ipData.city || '';
                const region = ipData.region || '';
                const parts = [city, region].filter(Boolean);
                if (parts.length > 0) return { location: parts.join(', '), source: 'network' };
            }
        } catch (e) {
            console.warn('ipapi fallback error:', e);
        }

        return null;
    }

    async function handleAutoDetectLocation() {
        if (!regLocation) return;

        const setButtonState = (loading, success = false) => {
            const labelText = i18n?.t ? i18n.t('auth_auto_detect', 'Auto Detect') : 'Auto Detect';
            const detectingText = i18n?.t ? i18n.t('auth_auto_detecting', 'Detecting...') : 'Detecting...';

            [btnDetectRegLocation, btnDetectRegLocationLink].forEach(btn => {
                if (!btn) return;
                btn.disabled = loading;
                if (loading) {
                    btn.classList.remove('success');
                    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>${detectingText}</span>`;
                } else if (success) {
                    btn.classList.add('success');
                    btn.innerHTML = `<i class="fas fa-check"></i> <span>${i18n?.t ? i18n.t('auth_location_detected', 'Detected') : 'Detected'}</span>`;
                } else {
                    btn.classList.remove('success');
                    btn.innerHTML = `<i class="fas fa-crosshairs"></i> <span>${labelText}</span>`;
                }
            });
        };

        const setStatus = (msg, type) => {
            if (!regLocationStatus) return;
            if (!msg) {
                regLocationStatus.style.display = 'none';
                return;
            }
            regLocationStatus.style.display = 'flex';
            regLocationStatus.className = `location-detect-status ${type}`;
            regLocationStatus.innerHTML = msg;
        };

        setButtonState(true);
        setStatus('<i class="fas fa-spinner fa-spin"></i> Requesting GPS / Network location...', 'loading');

        try {
            let result = null;

            // 1. Try Browser GPS first with 6s timeout
            if (navigator.geolocation) {
                const getGpsPosition = () => new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        resolve,
                        reject,
                        { enableHighAccuracy: true, timeout: 6000, maximumAge: 30000 }
                    );
                });

                try {
                    const position = await getGpsPosition();
                    setStatus('<i class="fas fa-spinner fa-spin"></i> Resolving district & mandi details...', 'loading');
                    result = await reverseGeocodeCoords(position.coords.latitude, position.coords.longitude);
                } catch (gpsErr) {
                    console.info('GPS not granted or timed out, switching to IP network detection:', gpsErr?.message || gpsErr);
                }
            }

            // 2. If GPS failed or was unavailable, use IP network geolocation
            if (!result || !result.location) {
                setStatus('<i class="fas fa-spinner fa-spin"></i> Connecting to regional network registry...', 'loading');
                result = await detectLocationByIP();
            }

            if (result && result.location) {
                regLocation.value = result.location;
                regLocation.dispatchEvent(new Event('input', { bubbles: true }));
                regLocation.dispatchEvent(new Event('change', { bubbles: true }));

                // Add visual flash effect
                regLocation.classList.add('input-flash-green');
                setTimeout(() => regLocation.classList.remove('input-flash-green'), 1200);

                const srcBadge = result.source === 'gps' ? '<i class="fas fa-crosshairs"></i> GPS Verified' : '<i class="fas fa-wifi"></i> Network GeoIP';
                setStatus(`<i class="fas fa-check-circle"></i> Auto-detected: <strong>${result.location}</strong> (${srcBadge})`, 'success');
                setButtonState(false, true);

                setTimeout(() => {
                    setButtonState(false, false);
                }, 3000);
            } else {
                throw new Error('Location could not be determined.');
            }
        } catch (err) {
            console.warn('Auto-detect location failed:', err);
            setStatus('<i class="fas fa-exclamation-triangle"></i> Could not auto-detect location. Please enter district manually.', 'error');
            setButtonState(false, false);
            setTimeout(() => {
                if (regLocationStatus && regLocationStatus.classList.contains('error')) {
                    regLocationStatus.style.display = 'none';
                }
            }, 5000);
        }
    }

    if (btnDetectRegLocation) {
        btnDetectRegLocation.addEventListener('click', (e) => {
            e.preventDefault();
            handleAutoDetectLocation();
        });
    }

    if (btnDetectRegLocationLink) {
        btnDetectRegLocationLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleAutoDetectLocation();
        });
    }

    // ----------------------------------------------------
    // 3. Password Reset via Firebase
    // ----------------------------------------------------
    const btnForgotPassword = document.getElementById('btn-forgot-password');
    if (btnForgotPassword) {
        btnForgotPassword.addEventListener('click', async (e) => {
            e.preventDefault();
            hideAlert();
            let email = (loginEmailInput?.value || '').trim();
            if (!email || !email.includes('@')) {
                email = prompt("Enter your registered email address to receive password reset instructions:", "");
            }
            if (!email || !email.trim()) return;

            try {
                showAlert('<i class="fas fa-spinner fa-spin"></i> Contacting Firebase to send password reset email...', 'loading');
                await sendPasswordReset(email.trim());
                showAlert(`Password reset email sent to <strong>${email.trim()}</strong>! Please check your inbox or spam folder.`, 'success');
            } catch (err) {
                console.error('Password reset error:', err);
                showAlert(err.message || 'Could not send password reset email.');
            }
        });
    }

    // ----------------------------------------------------
    // 4. Login Form Submission (Firebase + SQLite Dual Engine)
    // ----------------------------------------------------
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideAlert();

            const identifier = (loginEmailInput?.value || '').trim();
            const password = (loginPasswordInput?.value || '').trim();

            if (!identifier || !password) {
                showAlert('Please enter your email and password.');
                return;
            }

            if (btnLoginSubmit) {
                btnLoginSubmit.disabled = true;
                btnLoginSubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Authenticating...`;
            }

            // Dual Engine Strategy:
            // 1. If it's an email and Firebase is configured, try Firebase Auth first!
            let authenticatedWithFirebase = false;
            if (identifier.includes('@') && isFirebaseConfigured()) {
                try {
                    const fbUser = await signInWithEmail(identifier, password);
                    authenticatedWithFirebase = true;
                    
                    // Sync Firebase session with backend workstation
                    const syncRes = await fetch(`${API_BASE}/firebase-login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: fbUser.email,
                            full_name: fbUser.displayName,
                            fullname: fbUser.displayName,
                            token: fbUser.token,
                            id_token: fbUser.token,
                            role: 'farmer' // Default or will retain existing role from backend
                        })
                    });
                    
                    const syncData = await syncRes.json();
                    if (syncRes.ok && syncData.success) {
                        localStorage.setItem('agrilink_auth_token', syncData.token);
                        localStorage.setItem('agrilink_user', JSON.stringify(syncData.user));
                        localStorage.setItem('agri_role', syncData.user.role);
                        localStorage.setItem('agri_name', syncData.user.fullname || syncData.user.full_name || 'User');
                        localStorage.setItem('agri_district', syncData.user.location || 'Regional Yard');

                        // Sync profile to Firestore
                        saveUserToFirestore(fbUser.uid, {
                            displayName: syncData.user.fullname || fbUser.displayName,
                            email: fbUser.email,
                            role: syncData.user.role || 'farmer',
                            location: syncData.user.location || 'Regional Yard'
                        });

                        showAlert(`Firebase verified! Welcome back, ${syncData.user.fullname || 'User'}! Redirecting...`, 'success');
                        setTimeout(() => {
                            window.location.href = './index.html';
                        }, 500);
                        return;
                    }
                } catch (fbErr) {
                    console.warn('Firebase login check notice:', fbErr);
                    // If error is invalid password or blocked account, report it immediately
                    if (fbErr.message && !fbErr.message.includes('No user found')) {
                        showAlert(fbErr.message);
                        if (btnLoginSubmit) {
                            btnLoginSubmit.disabled = false;
                            btnLoginSubmit.innerHTML = `<i class="fas fa-sign-in-alt"></i> <span data-i18n="auth_btn_login">Sign In to Workstation</span>`;
                        }
                        return;
                    }
                    // If user was not found in Firebase, proceed to backend direct DB login (supports seeded demo users)
                }
            }

            // 2. Standard / Seeded Demo User Backend Authentication
            try {
                const res = await fetch(`${API_BASE}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email_or_phone: identifier, identifier: identifier, password: password })
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    localStorage.setItem('agrilink_auth_token', data.token);
                    localStorage.setItem('agrilink_user', JSON.stringify(data.user));
                    localStorage.setItem('agri_role', data.user.role);
                    localStorage.setItem('agri_name', data.user.fullname || data.user.full_name || 'User');
                    localStorage.setItem('agri_district', data.user.location || 'Regional Yard');

                    showAlert(`Welcome back, ${data.user.fullname || data.user.full_name || 'User'}! Redirecting to workstation...`, 'success');
                    setTimeout(() => {
                        window.location.href = './index.html';
                    }, 500);
                } else {
                    showAlert(extractErrorMessage(data, 'Invalid credentials. Please verify your username and password.'));
                }
            } catch (err) {
                console.warn('Backend login connection error:', err);
                showAlert('Backend server unreachable. Make sure the Python server is running on port 5000.');
            } finally {
                if (btnLoginSubmit) {
                    btnLoginSubmit.disabled = false;
                    btnLoginSubmit.innerHTML = `<i class="fas fa-sign-in-alt"></i> <span data-i18n="auth_btn_login">Sign In to Workstation</span>`;
                }
            }
        });
    }

    // ----------------------------------------------------
    // 5. Registration Form Submission (Firebase Auth + SQLite Sync)
    // ----------------------------------------------------
    if (formRegister) {
        formRegister.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideAlert();

            const fullname = (regFullname?.value || '').trim();
            const email = (regEmail?.value || '').trim();
            const location = (regLocation?.value || '').trim();
            const password = (regPassword?.value || '').trim();
            const confirmPwd = (regConfirmPassword?.value || '').trim();

            let role = 'farmer';
            const selectedRadio = document.querySelector('input[name="reg-role"]:checked');
            if (selectedRadio) role = selectedRadio.value;

            if (!fullname || !email || !password) {
                showAlert('Please fill in all required fields.');
                return;
            }

            if (password.length < 6) {
                showAlert('Password must be at least 6 characters long.');
                return;
            }

            if (password !== confirmPwd) {
                showAlert('Password and confirmation do not match.');
                return;
            }

            if (btnRegisterSubmit) {
                btnRegisterSubmit.disabled = true;
                btnRegisterSubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Creating Account...`;
            }

            // 1. If email registration and Firebase is configured, create in Firebase Auth
            let fbToken = null;
            if (email.includes('@') && isFirebaseConfigured()) {
                try {
                    const fbUser = await signUpWithEmail(email, password, fullname);
                    fbToken = fbUser.token;
                } catch (fbErr) {
                    console.error('Firebase registration error:', fbErr);
                    showAlert(fbErr.message || 'Firebase registration error.');
                    if (btnRegisterSubmit) {
                        btnRegisterSubmit.disabled = false;
                        btnRegisterSubmit.innerHTML = `<i class="fas fa-user-plus"></i> <span data-i18n="auth_btn_register">Register & Enter Workstation</span>`;
                    }
                    return;
                }
            }

            // 2. Persist profile & role in backend database
            try {
                const endpoint = fbToken ? `${API_BASE}/firebase-login` : `${API_BASE}/register`;
                const payload = fbToken ? {
                    email: email,
                    full_name: fullname,
                    fullname: fullname,
                    role: role,
                    location: location || 'Regional Mandi',
                    token: fbToken,
                    id_token: fbToken
                } : {
                    full_name: fullname,
                    fullname: fullname,
                    email_or_phone: email,
                    email: email,
                    password: password,
                    role: role,
                    location: location
                };

                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    localStorage.setItem('agrilink_auth_token', data.token);
                    localStorage.setItem('agrilink_user', JSON.stringify(data.user));
                    localStorage.setItem('agri_role', data.user.role);
                    localStorage.setItem('agri_name', data.user.fullname || data.user.full_name || 'User');
                    localStorage.setItem('agri_district', data.user.location || 'Regional Yard');

                    showAlert('Account created & verified successfully! Entering workstation...', 'success');
                    setTimeout(() => {
                        window.location.href = './index.html';
                    }, 500);
                } else {
                    showAlert(extractErrorMessage(data, 'Registration failed. Email/phone may already be registered.'));
                }
            } catch (err) {
                console.warn('Backend register error:', err);
                showAlert('Connection failed. Please ensure the backend server is running.');
            } finally {
                if (btnRegisterSubmit) {
                    btnRegisterSubmit.disabled = false;
                    btnRegisterSubmit.innerHTML = `<i class="fas fa-user-plus"></i> <span data-i18n="auth_btn_register">Register & Enter Workstation</span>`;
                }
            }
        });
    }

    // ----------------------------------------------------
    // 5. Google Authentication (Firebase Modular SDK)
    // ----------------------------------------------------
    const btnGoogleAuth = document.getElementById('btn-google-auth');
    if (btnGoogleAuth) {
        btnGoogleAuth.addEventListener('click', async () => {
            hideAlert();
            const originalHTML = btnGoogleAuth.innerHTML;
            btnGoogleAuth.disabled = true;
            btnGoogleAuth.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Connecting to Google...</span>`;

            try {
                // 1. Authenticate with Google Popup via Firebase
                const googleUser = await signInWithGoogle();
                
                // 2. Read selected operational role (Farmer, Aggregator, Buyer)
                const selectedRadio = document.querySelector('input[name="google-role"]:checked') || document.querySelector('input[name="reg-role"]:checked');
                const role = selectedRadio ? selectedRadio.value : 'farmer';

                // 2b. Sync profile to Cloud Firestore
                await saveUserToFirestore(googleUser.uid, {
                    displayName: googleUser.displayName,
                    email: googleUser.email,
                    role: role,
                    location: 'Regional Mandi'
                });
                
                showAlert(`Google verified as ${googleUser.displayName}. Establishing workstation session...`, 'success');

                // 3. Register or Login on backend SQLite
                try {
                    const res = await fetch(`${API_BASE}/google`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: googleUser.email,
                            full_name: googleUser.displayName,
                            fullname: googleUser.displayName,
                            role: role,
                            location: 'Regional Mandi',
                            google_token: googleUser.token,
                            token: googleUser.token,
                            id_token: googleUser.token
                        })
                    });

                    const data = await res.json();
                    if (res.ok && data.success) {
                        localStorage.setItem('agrilink_auth_token', data.token);
                        localStorage.setItem('agrilink_user', JSON.stringify(data.user));
                        localStorage.setItem('agri_role', data.user.role);
                        localStorage.setItem('agri_name', data.user.fullname || data.user.full_name || googleUser.displayName);
                        localStorage.setItem('agri_district', data.user.location || 'Regional Mandi');
                        
                        showAlert(`Welcome, ${data.user.fullname}! Entering ${data.user.role.toUpperCase()} portal...`, 'success');
                        setTimeout(() => {
                            window.location.href = './index.html';
                        }, 500);
                        return;
                    }
                } catch (apiErr) {
                    console.warn('Backend Google sync note, using verified client session:', apiErr);
                }

                // Client-side fallback session if backend is momentarily unreachable
                const fallbackToken = 'ggl-token-' + Date.now();
                const fallbackUser = {
                    id: 'USR-GGL-' + googleUser.uid.substring(0, 8),
                    fullname: googleUser.displayName,
                    email: googleUser.email,
                    role: role,
                    location: 'Regional Mandi'
                };
                localStorage.setItem('agrilink_auth_token', fallbackToken);
                localStorage.setItem('agrilink_user', JSON.stringify(fallbackUser));
                localStorage.setItem('agri_role', role);
                localStorage.setItem('agri_name', googleUser.displayName);
                localStorage.setItem('agri_district', 'Regional Mandi');

                showAlert(`Welcome, ${googleUser.displayName}! Entering ${role.toUpperCase()} portal...`, 'success');
                setTimeout(() => {
                    window.location.href = './index.html';
                }, 500);

            } catch (err) {
                console.error('Google Auth Failed:', err);
                showAlert(extractErrorMessage(err, 'Google Sign-In failed or was cancelled. Please try again.'));
            } finally {
                btnGoogleAuth.disabled = false;
                btnGoogleAuth.innerHTML = originalHTML;
            }
        });
    }

    // ----------------------------------------------------
    // 6. Fast Demonstration Fallbacks
    // ----------------------------------------------------
    demoButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const demoRole = btn.dataset.demo;
            const creds = {
                farmer: { id: 'farmer@agrilink.in', pwd: 'farmer123', name: 'Ramesh Kumar', loc: 'Ludhiana, Punjab' },
                aggregator: { id: 'aggregator@agrilink.in', pwd: 'aggregator123', name: 'Malwa FPO (Aggregator)', loc: 'Sangrur, Punjab' },
                buyer: { id: 'buyer@agrilink.in', pwd: 'buyer123', name: 'AgroCorp Trade Desk', loc: 'Delhi Central Mandi' }
            }[demoRole] || { id: 'farmer@agrilink.in', pwd: 'farmer123', name: 'Ramesh Kumar', loc: 'Ludhiana, Punjab' };

            showAlert(`Logging in as ${creds.name}...`, 'success');

            try {
                const res = await fetch(`${API_BASE}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier: creds.id, password: creds.pwd })
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    localStorage.setItem('agrilink_auth_token', data.token);
                    localStorage.setItem('agrilink_user', JSON.stringify(data.user));
                    localStorage.setItem('agri_role', data.user.role);
                    localStorage.setItem('agri_name', data.user.fullname);
                    localStorage.setItem('agri_district', data.user.location);
                    setTimeout(() => {
                        window.location.href = './index.html';
                    }, 400);
                    return;
                }
            } catch (e) {
                console.warn('Fast demo API login fallback:', e);
            }

            localStorage.setItem('agrilink_auth_token', 'demo-fast-token-' + demoRole);
            localStorage.setItem('agrilink_user', JSON.stringify({
                fullname: creds.name,
                email: creds.id,
                role: demoRole,
                location: creds.loc
            }));
            localStorage.setItem('agri_role', demoRole);
            localStorage.setItem('agri_name', creds.name);
            localStorage.setItem('agri_district', creds.loc);

            setTimeout(() => {
                window.location.href = './index.html';
            }, 400);
        });
    });
});
