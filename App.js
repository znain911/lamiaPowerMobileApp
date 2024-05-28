import * as React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView,ActivityIndicator, 
  Platform,FlatList,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome,Entypo,AntDesign,Ionicons,Feather } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navigator from './navigation/navigator';






export default function App() {

   const persistenceKey = 'persistenceKey'; 
const persistNavigationState = async navState  => {
  try {
    await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState));
  } catch (err) {
    // handle the error according to your needs
  }
};
const loadNavigationState = async () => {
  const jsonString = await AsyncStorage.getItem(persistenceKey);
  return JSON.parse(jsonString);
};


  return (
    
    
     <Navigator 
      persistNavigationState={persistNavigationState}
    loadNavigationState={loadNavigationState}
      
    />
  );
}

const styles = StyleSheet.create({
 
  header: {
      width: '100%',
      paddingTop:  '8%',
      paddingBottom:  '2%',
      paddingLeft: '5%',
      paddingRight: '5%',
      backgroundColor: '#007982',
      flexDirection: 'row',
      justifyContent:'center'
    },
  
  back: {
    justifyContent:'center',
    marginRight: '10%'
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color : '#0e2f44'
  },
  main: {
    alignItems : 'center'
  },
  phoneNumber:{
      backgroundColor: '#007982',
      borderColor: '#007982',
      borderRadius: 5,
      padding: 5,
      width: '92%',
      alignItems: 'center',
      
    },
    pd: {
      marginTop: '3%',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: '1%',
      marginLeft: '4%'
    },
    text: {

      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    },
    address: {
      backgroundColor: '#007982',
      borderColor: '#007982',
      borderRadius: 5,
      padding: 5,
      width: '92%',
      height: 100,
      marginLeft: '1%',
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center'
    },

});
