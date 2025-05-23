import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import BottomTabBar from '../components/BottomTabBar';
import {  ScrollView, StyleSheet, Text, View } from 'react-native';

type NotificationCardProps = {
  title: string;
  message: string;
  time: string;
};

function NotificationCard({ title, message, time }: NotificationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="bell-outline" size={28} color="#22313F" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardMessage}>{message}</Text>
      </View>
      <Text style={styles.cardTime}>{time}</Text>
      
    </View>
    
  );
  
}

const notifications = {
  today: [
    {
      id: 1,
      title: 'Weekly New Recipes!',
      message: 'Discover our new recipes of the week!',
      time: '2 Min Ago',
    },
    {
      id: 2,
      title: 'Meal Reminder',
      message: 'Time to cook your healthy meal of the day',
      time: '35 Min Ago',
    },
  ],
  wednesday: [
    {
      id: 3,
      title: 'New Update Available',
      message: 'Performance improvements and bug fixes.',
      time: '25 April 2024',
    },
    {
      id: 4,
      title: 'Reminder',
      message: "Don't forget to complete your profile to access all app features",
      time: '25 April 2024',
    },
    {
      id: 5,
      title: 'Important Notice',
      message: 'Remember to change your password regularly to keep your account secure',
      time: '25 April 2024',
    },
  ],
  monday: [
    {
      id: 6,
      title: 'New Update Available',
      message: 'Performance improvements and bug fixes.',
      time: '22 April 2024',
    },
  ],
  
};

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#22313F" style={{ opacity: 0 }} />
        <Text style={styles.header}>Notifications</Text>
        <View style={{ width: 28 }} /> {/* Placeholder for symmetry */}
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={styles.sectionTitle}>Today</Text>
        {notifications.today.map((n) => (
          <NotificationCard key={n.id} {...n} />
        ))}
        <Text style={styles.sectionTitle}>Wednesday</Text>
        {notifications.wednesday.map((n) => (
          <NotificationCard key={n.id} {...n} />
        ))}
        <Text style={styles.sectionTitle}>Monday</Text>
        {notifications.monday.map((n) => (
          <NotificationCard key={n.id} {...n} />
        ))}
      </ScrollView>
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22313F',
    alignSelf: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 8,
    color: '#22313F',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8EC6D7',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    color: '#22313F',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  cardMessage: {
    color: '#22313F',
    fontSize: 13,
    marginBottom: 2,
  },
  cardTime: {
    color: '#22313F',
    fontSize: 11,
    marginLeft: 8,
    alignSelf: 'flex-start',
  },
});