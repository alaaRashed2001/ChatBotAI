import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppIcon from '../assets/icons/AppIcon';
import { s, vs } from 'react-native-size-matters';

const EmptyChat = () => {
  return (
    <View style={styles.container}>
      <AppIcon height={vs(100)} width={s(100)} />
      <Text style={styles.title}>Hello,</Text>
      <Text style={styles.subtitle}>What can I help with?</Text>
    </View>
  );
};

export default EmptyChat;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: vs(140),
  },
  title: {
    fontSize: s(24),
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
  },
  subtitle: {
    fontSize: s(18),
  },
});
