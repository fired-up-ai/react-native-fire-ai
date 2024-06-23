import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';


export default class FirebaseAdmin {
    private static instance: FirebaseAdmin;
    private admin: admin.app.App;

    private constructor() {
        const keyPath = path.resolve(__dirname, '../../../../service-account-key.json');
        const key = fs.readFileSync(keyPath, 'utf8');
        const serviceAccount = JSON.parse(key);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
        this.admin = admin.app();
        if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
            process.env.FIREBASE_AUTH_EMULATOR_HOST = `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`;
            console.log('Using Emulator at: ', process.env.FIREBASE_AUTH_EMULATOR_HOST);
        }
    }

    public static getInstance(): FirebaseAdmin {
        if (!FirebaseAdmin.instance) {
            FirebaseAdmin.instance = new FirebaseAdmin();
        }
        return FirebaseAdmin.instance;
    }

    public getAdmin(): admin.app.App {
        return this.admin;
    }
}