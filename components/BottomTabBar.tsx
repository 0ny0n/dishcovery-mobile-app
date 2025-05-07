import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity onPress={() => router.replace('/HomePage')} style={styles.tabButton}>
        <Feather name="home" size={26} color={pathname === '/HomePage' ? '#20515a' : '#b0b0b0'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/Search')} style={styles.tabButton}>
        <Feather name="search" size={26} color={pathname === '/Search' ? '#20515a' : '#b0b0b0'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('./ChefHat')} style={styles.chefHatButton}>
        <MaterialCommunityIcons name="chef-hat" size={32} color="#fff" style={{ backgroundColor: '#20515a', borderRadius: 32, padding: 8 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('./Notification')} style={styles.tabButton}>
        <Feather name="bell" size={26} color={pathname === '/Notification' ? '#20515a' : '#b0b0b0'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('./Profile')} style={styles.tabButton}>
        <Feather name="user" size={26} color={pathname === '/Profile' ? '#20515a' : '#b0b0b0'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  chefHatButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    flex: 1,
  },
}); 