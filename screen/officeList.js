import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

class OfficeList extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        office: this.props.navigation.state.params.office[0]
        
      

 
    };
 
  }
officeInfo = (id,district, address,rent) => {
    

    this.props.navigation.navigate('OfficeInfo',{
      
      id:  id,
      district:  district,
      address: address,
      rent: rent,
    })
                        
                    
   
  }
  render(){
      return(
           <LinearGradient
    colors={['#006c38', '#007982']}
    style={{
      flex: 1,
    }}>
        <View style ={styles.header} >
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Landing')}} style ={styles.back}>
          <Ionicons name="arrow-back" size={35} color="#0e2f44" />
        </TouchableOpacity>
        <Text style ={styles.headerText}>Office List</Text>
      </View>

      <FlatList 
      data={this.state.office}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.info}>
        <TouchableOpacity onPress={() => this.officeInfo(item.id, item.district, item.address, item.rent)}  style ={styles.infolist}>
          <MaterialCommunityIcons name="office-building" size={25} color="#0e2f44" />
          <Text style ={styles.Client}>{item.district}</Text>
        </TouchableOpacity>
      </View>
      )}
      />

    </LinearGradient>
      );
  }
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
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color : '#0e2f44'
  },
  back: {
    justifyContent:'center',
    marginRight: '10%'
  },
  info: {
        alignItems: 'center'
    },
    infolist: {
      width: '90%',
      padding: 10,
      backgroundColor: '#007982',
      borderColor: '#007982',
      borderRadius: 15,
      marginTop: '3%',
      marginBottom: '3%',
      elevation: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    Client: {
      fontSize: 20,
      marginLeft: '2%',
      fontWeight: 'bold',
      color : '#0e2f44',
    }

})

export default OfficeList;