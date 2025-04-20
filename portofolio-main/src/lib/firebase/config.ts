const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // BUKAN process.env.API_KEY
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, // BUKAN process.env.AUTH_DOMAIN
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // BUKAN process.env.PROJECT_ID
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // BUKAN process.env.STORAGE_BUCKET
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // BUKAN process.env.MESSAGING_SENDER_ID
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, // BUKAN process.env.APP_ID
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

type Config = typeof config;

export function getFirebaseConfig(): Config {
  if (Object.values(config).some((value) => !value))
    throw new Error('Firebase config is not set or incomplete');
  return config;
}
