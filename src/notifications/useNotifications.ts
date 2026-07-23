import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import {
  getMessaging,
  getToken,
  onMessage,
} from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const requestUserPermissions = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('✅ Notification permission granted.');
  } else {
    console.log('❌ Notification permission denied by the user.');
  }
};

const getFCMToken = async () => {
  try {
    const messaging = getMessaging();
    const token = await getToken(messaging);
    console.log('✅ FCM Token:', token);
  } catch (e) {
    console.error('❌ Failed to get FCM token:', e);
  }
};

export const useNotifications = () => {
  useEffect(() => {
    requestUserPermissions();
    getFCMToken();
  }, []);

  useEffect(() => {
    const messaging = getMessaging();
    const unsubscribe = onMessage(messaging, async remoteMessage => {
      const title = remoteMessage.notification?.title || 'No Title';
      const body = remoteMessage.notification?.body || 'No Body';
      Alert.alert(title, body);
    });
    return unsubscribe;
  }, []);
};
