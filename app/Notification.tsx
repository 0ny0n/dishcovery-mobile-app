import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Notification() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notification Page (Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#20515a',
    fontWeight: 'bold',
  },
}); 