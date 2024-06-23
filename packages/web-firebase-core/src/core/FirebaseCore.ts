import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, FirebaseStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, Functions, connectFunctionsEmulator } from 'firebase/functions';
import portConfig from '../../../../firebase.json';


export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

export interface Firebase {
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
    storage: FirebaseStorage;
    functions: Functions;
}

export default class FirebaseCore {
    private static instance: FirebaseCore;
    private firebase: Firebase;


    private constructor() {
        const config: FirebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY || '',
            authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
            projectId: process.env.FIREBASE_PROJECT_ID || '',
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
            appId: process.env.FIREBASE_APP_ID || '',
            measurementId: process.env.FIREBASE_MEASUREMENT_ID || ''
        };
        
        const app = initializeApp(config);
        this.firebase = {
            app,
            auth: getAuth(app),
            firestore: getFirestore(app),
            storage: getStorage(app),
            functions: getFunctions(app),
        };
        console.log("Use Emulators?: ", process.env.USE_FIREBASE_EMULATOR)
        if (process.env.USE_FIREBASE_EMULATOR === "true") {
            console.log("Using Firebase Emulators...");
            if (typeof process.env.EMULATOR_HOST !== 'string') {
                throw new Error('EMULATOR_HOST is not set');
            }
            connectAuthEmulator(
                this.firebase.auth, 
                `http://${process.env.EMULATOR_HOST}:${portConfig.emulators.auth.port}`
            );
            connectFirestoreEmulator(
                this.firebase.firestore, 
                process.env.EMULATOR_HOST, 
                portConfig.emulators.firestore.port
            );
            connectStorageEmulator(
                this.firebase.storage, 
                process.env.EMULATOR_HOST, 
                portConfig.emulators.storage.port
            );
            connectFunctionsEmulator(
                this.firebase.functions, 
                process.env.EMULATOR_HOST, 
                portConfig.emulators.functions.port
            );

        }
    }
    
    public static getInstance(): FirebaseCore {
        if (!FirebaseCore.instance) {
            FirebaseCore.instance = new FirebaseCore();
        }
        return FirebaseCore.instance;
    }

    public getFirebase(): Firebase {
        return this.firebase;
    }
}