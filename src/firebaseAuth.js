// src/firebaseAuth.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, deleteUser, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { getDatabase, ref, set, get, remove, push, update } from "firebase/database";

const readEnv = (key) => String(import.meta.env[key] ?? "").trim();

const firebaseEnv = {
  VITE_FIREBASE_API_KEY: readEnv("VITE_FIREBASE_API_KEY"),
  VITE_FIREBASE_AUTH_DOMAIN: readEnv("VITE_FIREBASE_AUTH_DOMAIN"),
  VITE_FIREBASE_DATABASE_URL: readEnv("VITE_FIREBASE_DATABASE_URL"),
  VITE_FIREBASE_PROJECT_ID: readEnv("VITE_FIREBASE_PROJECT_ID"),
  VITE_FIREBASE_STORAGE_BUCKET: readEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  VITE_FIREBASE_MESSAGING_SENDER_ID: readEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  VITE_FIREBASE_APP_ID: readEnv("VITE_FIREBASE_APP_ID"),
};

const missingFirebaseEnv = Object.entries(firebaseEnv)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingFirebaseEnv.length) {
  throw new Error(
    `Missing Firebase web config: ${missingFirebaseEnv.join(", ")}. ` +
    "Create a project-root .env file before running the frontend."
  );
}

const firebaseConfig = {
  apiKey: firebaseEnv.VITE_FIREBASE_API_KEY,
  authDomain: firebaseEnv.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: firebaseEnv.VITE_FIREBASE_DATABASE_URL,
  projectId: firebaseEnv.VITE_FIREBASE_PROJECT_ID,
  storageBucket: firebaseEnv.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebaseEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: firebaseEnv.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export async function signUp(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: username });
    {
      const idToken = await user.getIdToken();
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestType: 'VERIFY_EMAIL', idToken, canHandleCodeInApp: false, continueUrl: (typeof window !== 'undefined' ? window.location.origin : undefined) })
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.error?.message || 'Failed to send verification email');
      }
    }
    const userData = {
      username: username,
      email: user.email,
      createdAt: new Date().toISOString(),
      emailVerified: false
    };
    await set(ref(db, `/users/${user.uid}`), userData);
    return { ...userData, uid: user.uid, verificationSent: true };
  } catch (error) {
    throw error;
  }
}

export async function login(email, password, { remember } = { remember: false }) {
  try {
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.emailVerified) {
      await auth.signOut();
      throw new Error("Email not verified. Please check your inbox and verify your email before logging in.");
    }
    const userRef = ref(db, `/users/${user.uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return { ...snapshot.val(), uid: user.uid };
    } else {
      return { email: user.email, username: user.displayName, uid: user.uid };
    }
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect password");
    } else if (error.code === "auth/user-not-found") {
      throw new Error("No user found with this email");
    } else if (error.code === "auth/invalid-credential") {
      throw new Error("Invalid email or password. Please try again.");
    } else {
      throw new Error(error.message);
    }
  }
}

export async function deleteAccount() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not authenticated.");
  }
  // Remove user data from Realtime Database (ignore if not present)
  try {
    await remove(ref(db, `/users/${user.uid}`));
  } catch (_) {
    // No-op if record doesn't exist
  }
  // Delete the auth user
  try {
    await deleteUser(user);
  } catch (error) {
    if (error && error.code === 'auth/requires-recent-login') {
      throw new Error('Please log in again to delete your account.');
    }
    throw new Error(error?.message || 'Failed to delete account.');
  }
}

// Update username and/or password for the current user
export async function updateAccount({ username, currentPassword, newPassword }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated.');

  // Update display name and DB username if provided
  if (typeof username === 'string' && username.trim() !== '') {
    await updateProfile(user, { displayName: username.trim() });
    await update(ref(db, `/users/${user.uid}`), { username: username.trim() });
  }

  // Update password if requested
  if (newPassword && newPassword.length >= 6) {
    // Re-authenticate using current password
    const { EmailAuthProvider, reauthenticateWithCredential, updatePassword } = await import('firebase/auth');
    if (!currentPassword) {
      throw new Error('Current password is required to change password.');
    }
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  }

  // Return latest profile snapshot
  const snap = await get(ref(db, `/users/${user.uid}`));
  const dbData = snap.exists() ? snap.val() : {};
  return { uid: user.uid, email: user.email, username: user.displayName || dbData.username || '', ...dbData };
}

// History helpers under /history/{uid}/{id}
export async function saveHistoryItem({ filename, slides, templateName }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated.');
  const item = {
    filename,
    templateName: templateName || 'Classic Classroom',
    slides: Array.isArray(slides) ? slides : [],
    generatedAt: new Date().toISOString(),
  };
  const listRef = ref(db, `/history/${user.uid}`);
  const newRef = await push(listRef, item);
  return { id: newRef.key, ...item };
}

export async function fetchHistoryItems() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated.');
  const listRef = ref(db, `/history/${user.uid}`);
  const snap = await get(listRef);
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.keys(val).map(id => ({ id, ...val[id] })).sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt));
}

export async function renameHistoryItem(id, newFilename) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated.');
  await update(ref(db, `/history/${user.uid}/${id}`), { filename: newFilename });
}

export async function deleteHistoryItem(id) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated.');
  await remove(ref(db, `/history/${user.uid}/${id}`));
}

export { auth, db };
