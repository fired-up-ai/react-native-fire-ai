import { Firestore } from "firebase/firestore";
import FirebaseCore from "../core/FirebaseCore";

export default abstract class AbstractFirestore {
    protected firestore: Firestore;

    constructor() {
        this.firestore = FirebaseCore.getInstance().getFirebase().firestore;
    }

    public getFirestore(): Firestore {
        return this.firestore;
    }

    public abstract createDoc(collectionName: string, data: any): Promise<void>;
    public abstract updateDoc(collectionName: string, docId: string, data: any): Promise<void>;
    public abstract deleteDoc(collectionName: string, docId: string): Promise<void>;
    public abstract getDoc(collectionName: string, docId: string): Promise<any>;
    public abstract getDocs(collectionName: string): Promise<any>;
}