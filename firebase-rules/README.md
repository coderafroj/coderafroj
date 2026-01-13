# Firebase Security Rules

This directory contains the Firebase security rules for the notes editing system.

## Setup Instructions

These rules need to be applied in the Firebase Console:

### Firestore Rules
1. Go to Firebase Console > Firestore Database > Rules
2. Copy the contents of `firestore.rules`
3. Paste and publish the rules

### Storage Rules
1. Go to Firebase Console > Storage > Rules
2. Copy the contents of `storage.rules`
3. Paste and publish the rules

## Admin Setup

To set admin claims for a user:
1. Go to Firebase Console > Authentication
2. Find the user
3. Set custom claims using Firebase Admin SDK or Firebase CLI:

```bash
firebase auth:set-custom-user-claims USER_UID '{"admin": true}'
```

Or using Admin SDK:
```javascript
admin.auth().setCustomUserClaims(uid, { admin: true });
```
