import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Feather } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

class WarrantyList extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
      warranty: this.props.navigation.state.params.warranty,
      

 
    };
    }
    warrantyEnd =(id,mobile,address,name,warranty_end ) => {
        this.props.navigation.navigate('WarrantyUpdate', {
      id: id,
      mobile: mobile,
      address: address,
      name: name,
      warranty_end: warranty_end,
    })
    }
    
    render( ){
        var warranty
  if ( this.state.warranty[0].name === 'No Data') {
    warranty = <Text style ={styles.Client}>No warranty lift list recorded now</Text>
  }else {
    

    warranty = <FlatList 
      data={this.state.warranty}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          <TouchableOpacity onPress={() => this.warrantyEnd(item.id, item.mobile, item.address, item.name,item.warranty_end)}>
          <View style ={styles.row}>
            <Text style ={styles.data}>{item.name}</Text>
            <Text style ={styles.data}>{item.mobile}</Text>
            <Text style ={styles.data}>{item.warranty_start}</Text>
            <Text style ={styles.data}>{item.warranty_end}</Text>
          </View>
          </TouchableOpacity>
        </View>
      )}
      />
  }
        return(
            <LinearGradient
    colors={['#006c38', '#007982']}
    style={{
      flex: 1,
    }}
    >
        <View style ={styles.header} >
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('LiftServicing')}} style ={styles.back}>
            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Warranty list</Text>
        </View>

        

        <Text style ={styles.pd}>Warranty List Detail: </Text>
        <View style ={styles.columnHead}>
            <Text style ={styles.heading}>Name</Text>
            <Text style ={styles.heading}>Mobile</Text>
            <Text style ={styles.heading}>Start</Text>
            <Text style ={styles.heading}>End</Text>
        </View>
        {warranty}
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
  pd: {
      textAlign: 'center',
      marginTop: '3%',
      fontSize: 18,
      borderBottomWidth: 2,
      fontWeight: 'bold',
      marginBottom: '2%'
    },
    columnHead: {
      flexDirection: 'row',
      justifyContent : 'space-evenly',
    },
    heading: {
      marginTop: '3%',
      fontSize: 15,
      marginBottom: '2%',
      fontWeight: 'bold',
      color: '#5CF405',
    },
    row: {
    flexDirection: 'row',
  },
  list: {
        marginBottom: '2%',
        width: '98%',
        marginLeft: '1%'
        
    },
  data: {
    width: '25%',
    fontSize: 16,
    fontWeight: 'bold',
    color : '#0e2f44',
    borderWidth: 2,
    padding: 3,
    textAlign: 'center'
    
  },
  Client: {
      fontSize: 20,
      marginLeft: '2%',
      fontWeight: 'bold',
      color : '#0e2f44',
      textAlign: 'center'
    },
    mcontainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    button: {
      alignItems: 'center',
      marginTop: '2%'
    },
    passContainer: {
        backgroundColor: '#00964E',
        borderWidth: 2,
        borderColor: '#00964E',
        borderRadius: 10,
        elevation: 20,
        alignItems: 'center',
        padding: '5%'
    },
  passText: {
        
        color: '#FFFFFF',
        paddingLeft: '5%',
        paddingRight: '5%',
        fontSize: 18,
        textAlign: 'center',
        overflow: 'hidden'
    },
});

export default WarrantyList;