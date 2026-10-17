// ========================================================
// AGRI-LINK: DEDICATED LOGIN & AUTHENTICATION ENGINE
// ========================================================

import { i18n, SUPPORTED_LANGUAGES } from './i18n.js';

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

    // Role radio selection visual feedback
    regRoleRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelectorAll('.reg-role-radio').forEach(lbl => lbl.classList.remove('active'));
            const parent = radio.closest('.reg-role-radio');
            if (parent) parent.classList.add('active');
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
    // 3. Login Form Submission
    // ----------------------------------------------------
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideAlert();

            const identifier = (loginEmailInput?.value || '').trim();
            const password = (loginPasswordInput?.value || '').trim();

            if (!identifier || !password) {
                showAlert('Please enter your email/phone and password.');
                return;
            }

            if (btnLoginSubmit) {
                btnLoginSubmit.disabled = true;
                btnLoginSubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Authenticating...`;
            }

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
    // 4. Registration Form Submission
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
                btnRegisterSubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Registering...`;
            }

            try {
                const res = await fetch(`${API_BASE}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        full_name: fullname,
                        fullname: fullname,
                        email_or_phone: email,
                        email: email,
                        password: password,
                        role: role,
                        location: location
                    })
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    localStorage.setItem('agrilink_auth_token', data.token);
                    localStorage.setItem('agrilink_user', JSON.stringify(data.user));
                    localStorage.setItem('agri_role', data.user.role);
                    localStorage.setItem('agri_name', data.user.fullname || data.user.full_name || 'User');
                    localStorage.setItem('agri_district', data.user.location || 'Regional Yard');

                    showAlert('Account created successfully! Entering workstation...', 'success');
                    setTimeout(() => {
                        window.location.href = './index.html';
                    }, 500);
                } else {
                    showAlert(extractErrorMessage(data, 'Registration failed. Email/phone may already be registered.'));
                }
            } catch (err) {
                console.warn('Backend register error:', err);
                showAlert('Connection failed. Please ensure the Python backend server is running.');
            } finally {
                if (btnRegisterSubmit) {
                    btnRegisterSubmit.disabled = false;
                    btnRegisterSubmit.innerHTML = `<i class="fas fa-user-plus"></i> <span data-i18n="auth_btn_register">Register & Enter Workstation</span>`;
                }
            }
        });
    }

    // ----------------------------------------------------
    // 5. 1-Click Fast Demonstration Logins
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

            // Fallback direct demonstration session
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
