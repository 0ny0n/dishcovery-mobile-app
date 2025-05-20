import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomTabBar from '../components/BottomTabBar'; // Adjust the path if needed

const user = {
  name: '[Your Name]',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg', // Placeholder avatar
  bio: "[Your description]",
  stats: {
    recipe: 3,
    videos: 13,
    followers: '14K',
    following: 120,
  },
};

const favorites = [
  {
    id: '1',
    title: 'Sunny Egg & Toast Avocado',
    author: 'Alice Fala',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    title: 'Bowl of noodle with beef',
    author: 'James Spader',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    title: 'Easy homemade beef burger',
    author: 'Alice Fala',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    title: 'Half boiled egg sandwich',
    author: 'James Spader',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
  },
];

export default function Profile() {
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={
          <>
            {/* Header Row */}
            <View style={styles.headerRow}>
              <Text style={styles.header}>My Profile</Text>
              <MaterialCommunityIcons name="cog-outline" size={26} color="#22313F" />
            </View>
            {/* Avatar and Edit */}
            <View style={styles.avatarRow}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit profile</Text>
              </TouchableOpacity>
            </View>
            {/* Name and Bio */}
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            {/* Divider */}
            <View style={styles.divider} />
            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.stats.recipe}</Text>
                <Text style={styles.statLabel}>Recipe</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.stats.videos}</Text>
                <Text style={styles.statLabel}>Videos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.stats.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.stats.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
            {/* Divider */}
            <View style={styles.divider} />
            {/* My Favorites */}
            <View style={styles.favHeaderRow}>
              <Text style={styles.favHeader}>My Favorites</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.favCard}>
            <Image source={{ uri: item.image }} style={styles.favImage} />
            <TouchableOpacity style={styles.favLike}>
              <MaterialCommunityIcons name="heart-outline" size={18} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.favTitle}>{item.title}</Text>
            <View style={styles.favAuthorRow}>
              <MaterialCommunityIcons name="account-circle" size={16} color="#8EC6D7" />
              <Text style={styles.favAuthor}>{item.author}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      />
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
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#8EC6D7',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginLeft: 'auto',
  },
  editButtonText: {
    color: '#20515a',
    fontWeight: 'bold',
    fontSize: 14,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#22313F',
    marginBottom: 2,
  },
  bio: {
    color: '#888',
    fontSize: 13,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#22313F',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
  favHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  favHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#22313F',
  },
  seeAll: {
    color: '#8EC6D7',
    fontWeight: 'bold',
    fontSize: 13,
  },
  favCard: {
    backgroundColor: '#f9faf7',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  favImage: {
    width: '100%',
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  favLike: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#8EC6D7',
    borderRadius: 12,
    padding: 4,
    zIndex: 2,
  },
  favTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#22313F',
    marginBottom: 2,
  },
  favAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  favAuthor: {
    color: '#8EC6D7',
    fontSize: 12,
    marginLeft: 4,
  },
}); 