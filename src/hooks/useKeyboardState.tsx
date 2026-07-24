import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';
import { IS_IOS } from '../constants/platform';

const keyboardShowEvent = IS_IOS ? 'keyboardWillShow' : 'keyboardDidShow';
const keyboardHideEvent = IS_IOS ? 'keyboardWillHide' : 'keyboardDidHide';

export const useKeyboardState = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHight, setKeyboardHight] = useState(0);

  useEffect(() => {
    // SHOW Keyboard Event
    const showSubscription = Keyboard.addListener(
      keyboardShowEvent,
      (event: KeyboardEvent) => {
        setIsKeyboardVisible(true);
        setKeyboardHight(event.endCoordinates.height);
      },
    );

    // Hide Keyboard Event
    const hideSubscription = Keyboard.addListener(
      keyboardHideEvent,
      (event: KeyboardEvent) => {
        setIsKeyboardVisible(false);
        setKeyboardHight(0);
      },
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return {
    isKeyboardVisible,
    keyboardHight,
  };
};
