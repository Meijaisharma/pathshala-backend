import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { scale } from '../utils/responsive';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons'; 

export default function Home() {

  // Grid Icon Component
  const GridItem = ({ icon, label, color }: any) => (
    <TouchableOpacity style={styles.gridItem}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={24} color={color || "#5A4FCF"} />
      </View>
      <Text style={styles.gridLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* 1. Header (Dark) */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#fff" />
        <View style={styles.headerRight}>
          <Ionicons name="gift" size={24} color="#FFD700" style={{marginRight: 15}} />
          <Ionicons name="notifications" size={24} color="#fff" />
        </View>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        
        {/* 2. Yellow Banner (Alert) */}
        <View style={styles.banner}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Ionicons name="time-outline" size={20} color="#000" style={{marginRight:5}} />
            <Text style={styles.bannerText}>7 batches will expire soon!</Text>
          </View>
          <TouchableOpacity style={styles.seeDetailsBtn}>
            <Text style={{fontWeight:'bold', fontSize:10}}>See details</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Batch Card (Dark Box) */}
        <View style={styles.batchContainer}>
          <View style={styles.batchCard}>
            <Text style={styles.batchLabel}>YOUR BATCH</Text>
            <View style={styles.batchRow}>
              <Text style={styles.batchTitle}>Sambhav 2026 Free UPSC...</Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </View>
          </View>
        </View>

        {/* 4. Grid Icons */}
        <View style={styles.gridContainer}>
          <GridItem icon="book" label="All Classes" color="#5A4FCF" />
          <GridItem icon="document-text" label="All Tests" color="#5A4FCF" />
          <GridItem icon="help-circle" label="My Doubts" color="#5A4FCF" />
          <GridItem icon="scan" label="AI Grader" color="#5A4FCF" />
        </View>

        {/* 5. Study Zone */}
        <Text style={styles.sectionTitle}>My Study Zone</Text>
        <View style={styles.studyZoneScroll}>
          {/* Card 1 */}
          <View style={styles.studyCard}>
            <Ionicons name="desktop-outline" size={32} color="#5A4FCF" />
            <Text style={styles.studyCardText}>My Batches</Text>
          </View>
          {/* Card 2 */}
          <View style={styles.studyCard}>
            <Ionicons name="download-outline" size={32} color="#5A4FCF" />
            <Text style={styles.studyCardText}>Downloads</Text>
          </View>
        </View>

      </ScrollView>

      {/* 6. Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={{alignItems:'center'}}>
          <Ionicons name="home" size={24} color={COLORS.textDark} />
          <Text style={{fontSize:10, fontWeight:'bold'}}>Study</Text>
        </View>
        <Ionicons name="videocam-outline" size={24} color="#999" />
        <Ionicons name="play-circle-outline" size={24} color="#999" />
        <Ionicons name="cart-outline" size={24} color="#999" />
        <Ionicons name="person-outline" size={24} color="#999" />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F8' },
  
  // Header
  header: { 
    backgroundColor: '#1A1C1E', height: scale(60), flexDirection: 'row', 
    justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: scale(15) 
  },
  headerRight: { flexDirection: 'row', alignItems: 'center' },

  // Banner
  banner: { 
    backgroundColor: '#FFF9C4', flexDirection: 'row', justifyContent: 'space-between', 
    alignItems: 'center', padding: scale(12), margin: scale(15), 
    marginBottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10
  },
  bannerText: { fontSize: scale(12), fontWeight: 'bold' },
  seeDetailsBtn: { backgroundColor: '#fff', padding: 5, borderRadius: 5, borderWidth:1, borderColor:'#ddd' },

  // Batch Card
  batchContainer: { backgroundColor: '#1A1C1E', paddingBottom: scale(20) }, // Dark background continues
  batchCard: {
    backgroundColor: '#1A1C1E', marginHorizontal: scale(15), 
    padding: scale(10), paddingTop: 0
  },
  batchLabel: { color: '#aaa', fontSize: 10, fontWeight: 'bold', marginBottom: 5 },
  batchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  batchTitle: { color: '#fff', fontSize: scale(16), fontWeight: 'bold' },

  // Grid
  gridContainer: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    padding: scale(20), backgroundColor: '#fff', marginBottom: scale(20) 
  },
  gridItem: { alignItems: 'center', width: '22%' },
  iconCircle: { 
    width: scale(50), height: scale(50), backgroundColor: '#F3F4F6', 
    borderRadius: scale(15), justifyContent: 'center', alignItems: 'center', marginBottom: 8 
  },
  gridLabel: { fontSize: scale(11), fontWeight: '600', textAlign: 'center' },

  // Study Zone
  sectionTitle: { fontSize: scale(18), fontWeight: 'bold', marginLeft: scale(15), marginBottom: scale(15) },
  studyZoneScroll: { flexDirection: 'row', paddingHorizontal: scale(15) },
  studyCard: {
    width: scale(130), height: scale(100), backgroundColor: '#fff',
    borderRadius: 15, marginRight: 15, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#eee'
  },
  studyCardText: { marginTop: 10, fontWeight: '600', fontSize: 12 },

  // Bottom Nav
  bottomNav: {
    position: 'absolute', bottom: 0, width: '100%', height: scale(65),
    backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-around',
    alignItems: 'center', borderTopWidth: 1, borderColor: '#eee'
  }
});

