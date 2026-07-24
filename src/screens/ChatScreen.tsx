import { FlatList, StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '../components/AppHeader';
import SentMessageCard from '../components/SentMessageCard';
import ResponseMessageCard from '../components/ResponseMessageCard';
import { s } from 'react-native-size-matters';
import { RECEIVED, SENT } from '../constants/chat';
import ChatInput from '../components/ChatInput';
import EmptyChat from '../components/EmptyChat';

interface IChatScreen {
  id: number;
  message: string;
  type: string;
}
const ChatScreen = () => {
  const [messagesData, setMessagesData] = useState<IChatScreen[]>([]);
  const [msgInput, setMsgInput] = useState('');

  // Function to send a new Message to AI
  const onMessageSent = () => {
    console.log('user type', msgInput);

    setMessagesData(prevMessages => {
      return [
        ...prevMessages,
        {
          message: msgInput,
          id: prevMessages.length + 1,
          type: SENT,
        },
      ];
    });

    setTimeout(() => {
      onGetResponse('Hello, I am AI Assistant, How can I help you today?');
    }, 2000);
  };

  // Function to receive statice response
  const onGetResponse = (response: string) => {
    setMessagesData(prevMessages => {
      return [
        ...prevMessages,
        {
          message: response,
          id: prevMessages.length + 1,
          type: RECEIVED,
        },
      ];
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <AppHeader />

        <FlatList
          data={messagesData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return item.type === SENT ? (
              <SentMessageCard message={item.message} />
            ) : (
              <ResponseMessageCard message={item.message} />
            );
          }}
          contentContainerStyle={{ paddingHorizontal: s(8) }}
          ListEmptyComponent={<EmptyChat />}
        />

        <ChatInput
          messageValue={msgInput}
          setMessageValue={setMsgInput}
          onMessageSent={onMessageSent}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
