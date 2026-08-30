import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

let db = null;

try {
  const serviceAccount = JSON.parse(
    readFileSync(new URL('./serviceAccountKey.json', import.meta.url))
  );

  initializeApp({
    credential: cert(serviceAccount),
  });

  db = getFirestore();
} catch (error) {
  console.warn('Firestore unavailable:', error.message);
}

export { db };
