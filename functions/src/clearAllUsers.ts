import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// export const clearUsers = functions.https.onRequest(async (req, res) => {
//   try {
//     const auth = admin.auth();
//     const listUsersResult = await auth.listUsers();
//     const deletePromises = listUsersResult.users.map((userRecord) => auth.deleteUser(userRecord.uid));
//     await Promise.all(deletePromises);
//     res.status(200).send('All users deleted');
//   } catch (error) {
//     console.error('Error deleting users:', error);
//     res.status(500).send('Error deleting users');
//   }
// });

export const deleteAllUsers = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can delete users');
    }
    
    try {
        const auth = admin.auth();
        const listUsersResult = await auth.listUsers();
        const deletePromises = listUsersResult.users.map((userRecord) => auth.deleteUser(userRecord.uid));
        await Promise.all(deletePromises);
        return 'All users deleted';
    } catch (error) {
        console.error('Error deleting users:', error);
        throw new functions.https.HttpsError('internal', 'Error deleting users');
    }
});
