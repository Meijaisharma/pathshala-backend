import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { scale } from '../utils/responsive';
import { COLORS } from '../constants/colors';

export default function Login({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      
      {/* 1. Top Logo Section */}
      <View style={styles.logoContainer}>
         {/* Abhi ke liye ek Lime Circle hai, baad mein Image laga sakte hain */}
        <View style={styles.logoCircle}>
          <Text style={{fontSize: 30, fontWeight:'bold', color: COLORS.textDark}}>P<Text style={{fontSize:15}}>X</Text></Text>
        </View>
      </View>

      {/* 2. Heading Text */}
      <Text style={styles.title}>
        Please Enter Your{'\n'}Mobile Number <View style={styles.dot}/>
      </Text>

      {/* 3. Input Field (PW Style: Bordered Box) */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>IN +91 ▼</Text>
          {/* Chota sa danda (divider) */}
          <View style={styles.divider} />
          <TextInput 
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            placeholderTextColor="#999"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
          />
        </View>
      </View>

      {/* 4. Footer Section (Terms + Lime Button) */}
      <View style={styles.footer}>
        <Text style={styles.terms}>
          By continuing you agree to our <Text style={{color: '#007AFF', fontWeight:'bold'}}>Terms of Use</Text>
        </Text>
        
        {/* LIME GREEN BUTTON */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('OTP')}
        >
          <Text style={styles.buttonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.card, // White Background
    padding: scale(20), 
    justifyContent: 'center' 
  },
  
  // Logo Styles
  logoContainer: { alignItems: 'center', marginBottom: scale(40) },
  logoCircle: {
    width: scale(80), 
    height: scale(80), 
    backgroundColor: COLORS.primary, // Lime Green Circle
    borderRadius: scale(40), 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2, 
    borderColor: '#000'
  },
  
  // Heading Styles
  title: { 
    fontSize: scale(24), 
    fontWeight: '800', 
    textAlign: 'center', 
    color: COLORS.textDark, 
    marginBottom: scale(40),
    lineHeight: scale(32)
  },
  dot: { 
    width: 30, 
    height: 8, 
    backgroundColor: COLORS.primary, // Lime line next to text
    borderRadius: 4 
  },
  
  // Input Styles
  inputWrapper: { marginBottom: scale(50) },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 1.5, 
    borderColor: COLORS.secondary, // Dark Border (PW Style)
    borderRadius: scale(12), 
    height: scale(55), 
    paddingHorizontal: scale(15),
    backgroundColor: '#fff'
  },
  countryCode: { 
    fontWeight: 'bold', 
    fontSize: scale(16), 
    color: COLORS.textDark 
  },
  divider: { 
    width: 1, 
    height: '50%', 
    backgroundColor: '#ccc', 
    marginHorizontal: scale(15) 
  },
  input: { 
    flex: 1, 
    fontSize: scale(18), 
    fontWeight: '600',
    color: COLORS.textDark
  },
  
  // Footer Styles
  footer: { 
    position: 'absolute', 
    bottom: scale(30), 
    left: scale(20), 
    right: scale(20) 
  },
  terms: { 
    textAlign: 'center', 
    color: '#666', 
    fontSize: scale(12), 
    marginBottom: scale(20) 
  },
  button: {
    backgroundColor: COLORS.primary, // LIME GREEN
    height: scale(55), 
    borderRadius: scale(30),
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 3, // Android Shadow
    shadowColor: '#000', // iOS Shadow
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4}
  },
  buttonText: { 
    fontSize: scale(18), 
    fontWeight: 'bold', 
    color: COLORS.primaryText // Black Text
  }
});

