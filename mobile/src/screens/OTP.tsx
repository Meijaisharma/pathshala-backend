import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { scale } from '../utils/responsive';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons'; // Pencil icon ke liye

export default function OTP({ navigation }: any) {
  const [timer, setTimer] = useState(20);

  // Timer logic (Fake countdown)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      
      {/* 1. Title + Badge */}
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: scale(10)}}>
        <Text style={styles.title}>Enter OTP</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>•••</Text>
        </View>
      </View>

      {/* 2. Subtitle + Edit Number */}
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: scale(40)}}>
        <Text style={styles.subtitle}>4 digit code sent to </Text>
        <Text style={[styles.subtitle, {fontWeight: 'bold', color: '#000'}]}>9057658170</Text>
        <Ionicons name="pencil" size={16} color={COLORS.primary} style={{marginLeft: 5}} />
      </View>

      {/* 3. Four Input Boxes (Visual Only for now) */}
      <View style={styles.otpContainer}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={styles.otpBox} />
        ))}
      </View>

      {/* 4. Timer */}
      <Text style={styles.timer}>00:{timer < 10 ? `0${timer}` : timer}</Text>

      {/* 5. Success Toast (Niche wala black popup) */}
      <View style={styles.toast}>
        <Ionicons name="checkmark-circle" size={20} color="#fff" style={{marginRight: 8}} />
        <Text style={styles.toastText}>OTP sent successfully</Text>
      </View>

      {/* 6. Lime Green Button */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')} 
      >
        <Text style={styles.buttonText}>Verify & Proceed</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.card, 
    padding: scale(20), 
    paddingTop: scale(60) 
  },
  title: { 
    fontSize: scale(26), 
    fontWeight: 'bold', 
    color: COLORS.textDark 
  },
  badge: {
    backgroundColor: '#E8F5E9', // Halka Green background
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9'
  },
  badgeText: { color: '#2E7D32', fontWeight: 'bold', fontSize: 12 },
  subtitle: { fontSize: scale(14), color: COLORS.textLight },
  
  // OTP Boxes
  otpContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: scale(20),
    paddingHorizontal: scale(10)
  },
  otpBox: {
    width: scale(60), 
    height: scale(60),
    borderWidth: 1.5, 
    borderColor: '#E0E0E0', 
    borderRadius: scale(15),
    backgroundColor: '#FAFAFA'
  },
  
  timer: { 
    fontSize: scale(14), 
    fontWeight: 'bold', 
    color: COLORS.textLight, 
    marginTop: scale(10) 
  },
  
  // Toast Notification
  toast: {
    position: 'absolute',
    bottom: scale(100),
    alignSelf: 'center',
    backgroundColor: '#1A1C1E', // Dark Black
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(12),
    paddingHorizontal: scale(20),
    borderRadius: scale(30),
    elevation: 5
  },
  toastText: { color: '#fff', fontSize: scale(14), fontWeight: '500' },

  // Bottom Button
  button: {
    position: 'absolute',
    bottom: scale(30),
    left: scale(20),
    right: scale(20),
    backgroundColor: COLORS.primary, // LIME GREEN
    height: scale(55), 
    borderRadius: scale(30),
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: { 
    fontSize: scale(18), 
    fontWeight: 'bold', 
    color: COLORS.primaryText 
  }
});

