// ========================================================
// FIREBASE AUTHENTICATION & FIRESTORE ENGINE (MODULAR SDK v13)
// Connected to Firebase Project: agrilink-d51ae
// Web App: agri-link-web (1:293500685921:web:7d96925bf806813ffd2420)
// Supports:
//   - Email / Password Authentication
//   - Google Sign-In Popup & Token Handling
//   - Password Reset Workflow
//   - Firestore Document & Collection Operations
// ========================================================

import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut as fbSignOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';

// Standard Firebase Configuration (Read from Vite Env with agrilink-d51ae Defaults)
export const firebaseConfig = {
    apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "AIzaSyBnIy-iaKyeSTU_Rd1ZIO5jL97CAL5upoo",
    authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "agrilink-d51ae.firebaseapp.com",
    projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "agrilink-d51ae",
    storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "agrilink-d51ae.firebasestorage.app",
    messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "293500685921",
    appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:293500685921:web:7d96925bf806813ffd2420"
};

// Check if user has set real Firebase credentials in .env
export function isFirebaseConfigured() {
    const key = firebaseConfig.apiKey;
    return Boolean(key && !key.includes('your_') && key !== "AIzaSyAgriLinkMasterKeyDemo2026Secure");
}

// Initialize Firebase App & Services safely
let app;
let auth;
let db;
let googleProvider;

try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
} catch (err) {
    console.warn('Firebase initialization notice:', err);
}

/**
 * Friendly error messages for Firebase auth errors
 */
export function formatFirebaseError(error) {
    if (!error) return 'Authentication failed. Please try again.';
    const code = error.code || '';
    
    switch (code) {
        case 'auth/email-already-in-use':
            return 'This email address is already registered. Please sign in instead.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/weak-password':
            return 'Password is too weak. Please use at least 6 characters.';
        case 'auth/user-not-found':
            return 'No user found with this email. Please check your credentials or create an account.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please verify and try again.';
        case 'auth/invalid-credential':
            return 'Invalid credentials. Please verify your email/phone and password.';
        case 'auth/popup-closed-by-user':
            return 'Sign-in cancelled: The Google sign-in window was closed.';
        case 'auth/cancelled-popup-request':
            return 'Another sign-in prompt is open. Please complete the current window.';
        case 'auth/popup-blocked':
            return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
        case 'auth/network-request-failed':
            return 'Network error connecting to Firebase. Please check your internet connection.';
        case 'auth/too-many-requests':
            return 'Too many attempts. Access is temporarily suspended. Please try again later.';
        case 'auth/unauthorized-domain':
            return `Domain "${typeof window !== 'undefined' ? window.location.hostname : 'current domain'}" is not authorized for Firebase Auth. Please verify that this domain is added in Firebase Console > Authentication > Settings > Authorized Domains.`;
        default:
            return error.message || 'An error occurred during authentication.';
    }
}

/**
 * ----------------------------------------------------
 * 1. GOOGLE SIGN-IN
 * ----------------------------------------------------
 */
export async function signInWithGoogle() {
    if (!auth || !googleProvider) {
        throw new Error('Firebase Auth is not initialized. Please verify configuration.');
    }

    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const idToken = await user.getIdToken();
        
        return {
            uid: user.uid,
            displayName: user.displayName || user.email?.split('@')[0] || 'Google User',
            email: user.email,
            photoURL: user.photoURL,
            token: idToken,
            provider: 'google.com'
        };
    } catch (error) {
        console.error('Google Sign-in Error:', error);
        throw new Error(formatFirebaseError(error));
    }
}

/**
 * ----------------------------------------------------
 * 2. EMAIL / PASSWORD AUTHENTICATION
 * ----------------------------------------------------
 */
export async function signUpWithEmail(email, password, displayName = '') {
    if (!auth) {
        throw new Error('Firebase Auth is not initialized.');
    }

    try {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const user = cred.user;

        if (displayName && displayName.trim()) {
            try {
                await updateProfile(user, { displayName: displayName.trim() });
            } catch (pErr) {
                console.warn('Profile update notice:', pErr);
            }
        }

        const idToken = await user.getIdToken();
        return {
            uid: user.uid,
            displayName: displayName.trim() || user.displayName || email.split('@')[0],
            email: user.email,
            token: idToken,
            provider: 'password'
        };
    } catch (error) {
        console.error('Firebase SignUp Error:', error);
        throw new Error(formatFirebaseError(error));
    }
}

export async function signInWithEmail(email, password) {
    if (!auth) {
        throw new Error('Firebase Auth is not initialized.');
    }

    try {
        const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
        const user = cred.user;
        const idToken = await user.getIdToken();

        return {
            uid: user.uid,
            displayName: user.displayName || email.split('@')[0],
            email: user.email,
            token: idToken,
            provider: 'password'
        };
    } catch (error) {
        console.error('Firebase SignIn Error:', error);
        throw new Error(formatFirebaseError(error));
    }
}

export async function sendPasswordReset(email) {
    if (!auth) {
        throw new Error('Firebase Auth is not initialized.');
    }

    try {
        await sendPasswordResetEmail(auth, email.trim());
        return { success: true };
    } catch (error) {
        console.error('Firebase Password Reset Error:', error);
        throw new Error(formatFirebaseError(error));
    }
}

/**
 * ----------------------------------------------------
 * 3. FIRESTORE DATABASE REPOSITORY
 * ----------------------------------------------------
 */

/**
 * Save / Update user profile in Firestore 'users' collection
 */
export async function saveUserToFirestore(uid, userData) {
    if (!db) return null;
    try {
        const userRef = doc(db, 'users', uid);
        const payload = {
            uid: uid,
            displayName: userData.displayName || userData.fullname || userData.full_name || 'Agri User',
            role: userData.role || 'farmer',
            location: userData.location || 'Regional Mandi',
            email: userData.email || null,
            phoneNumber: userData.phoneNumber || userData.phone || null,
            updatedAt: serverTimestamp()
        };

        // If creating for the first time, attach createdAt
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
            payload.createdAt = serverTimestamp();
        }

        await setDoc(userRef, payload, { merge: true });
        return payload;
    } catch (err) {
        console.warn('saveUserToFirestore notice:', err.message);
        return null;
    }
}

/**
 * Retrieve user profile from Firestore 'users' collection
 */
export async function getUserFromFirestore(uid) {
    if (!db) return null;
    try {
        const userRef = doc(db, 'users', uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
            return snap.data();
        }
        return null;
    } catch (err) {
        console.warn('getUserFromFirestore notice:', err.message);
        return null;
    }
}

/**
 * Add a new Crop Listing to Firestore 'crops' collection
 */
export async function addCropListingFirestore(cropData) {
    if (!db || !auth?.currentUser) return null;
    try {
        const cropsRef = collection(db, 'crops');
        const docRef = await addDoc(cropsRef, {
            ...cropData,
            farmerUid: auth.currentUser.uid,
            createdAt: serverTimestamp(),
            status: cropData.status || 'available'
        });
        return { id: docRef.id, ...cropData };
    } catch (err) {
        console.warn('addCropListingFirestore error:', err.message);
        throw err;
    }
}

/**
 * Real-time listener for available crop listings
 */
export function subscribeCropListingsFirestore(callback) {
    if (!db) return () => {};
    try {
        const cropsRef = collection(db, 'crops');
        const q = query(cropsRef, orderBy('createdAt', 'desc'));
        return onSnapshot(q, (snapshot) => {
            const listings = [];
            snapshot.forEach((d) => listings.push({ id: d.id, ...d.data() }));
            callback(listings);
        }, (err) => {
            console.warn('subscribeCropListingsFirestore listener notice:', err.message);
        });
    } catch (e) {
        console.warn('subscribeCropListingsFirestore setup error:', e);
        return () => {};
    }
}

/**
 * ----------------------------------------------------
 * 5. SESSION MANAGEMENT & LOGOUT
 * ----------------------------------------------------
 */
export async function logoutFirebase() {
    if (auth) {
        try {
            await fbSignOut(auth);
        } catch (e) {
            console.warn('Firebase signout error:', e);
        }
    }
}

export { 
    app, 
    auth, 
    db, 
    onAuthStateChanged,
    doc,
    setDoc,
    getDoc,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp
};
