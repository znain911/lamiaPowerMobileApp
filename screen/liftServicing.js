import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Feather } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

class LiftServicing extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
      lift: this.props.navigation.state.params.lift,
      

 
    };
    }
    warrantyList = () => {
        var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/warrantyInfo.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                }

                fetch(
                    SearchAPI,{
                        method: 'POST',
                        headers: header,
                        body: JSON.stringify(Data)
                    }
                )

                .then((response) => response.json())
                .then((response) => {

                    if (response[0].name === 'No Data'){

                        this.props.navigation.navigate('WarrantyList',{
                          warranty : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('WarrantyList',{
                          
                          warranty : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });

    }
    call = (mobile) => {
      var phone = '0'.concat(mobile)
    var phone1= 'tel:'.concat(phone)
    Linking.openURL(phone1);
    this.props.onPress && this.props.onPress();
    }
    render( ){
        var lift
  if ( this.state.lift[0].name === 'No Data') {
    lift = <Text style ={styles.Client}>No Lift Servicing list recorded</Text>
  }else {
    

    lift = <FlatList 
      data={this.state.lift}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          
          <View style ={styles.row}>
            <Text style ={styles.data}>{item.name}</Text>
            <Text style ={styles.data}>{item.address}</Text>
            <TouchableOpacity onPress={() => this.call(item.mobile)}>
            <Text style ={styles.datam}>{item.mobile}</Text>
            </TouchableOpacity>
            <Text style ={styles.data}>{item.service_cost}</Text>
          </View>
          
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
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Landing')}} style ={styles.back}>
            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Lift Servicing list</Text>
        </View>

        <View style = {styles.mcontainer}>
            <TouchableOpacity onPress={this.warrantyList} style ={ styles.button} >
                <View style ={ styles.passContainer}>
                    <Text style ={styles.passText}>Warranty List</Text>
                </View>
            </TouchableOpacity>
        </View>

        <Text style ={styles.pd}>Lift Servising List Detail: </Text>
        <View style ={styles.columnHead}>
            <Text style ={styles.heading}>Name </Text>
            <Text style ={styles.heading}>Address </Text>
            <Text style ={styles.heading}>Mobile </Text>
            <Text style ={styles.heading}>Service Cost </Text>
        </View>
        {lift}
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
      marginLeft: '3%'
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
  datam: {
    width: '100%',
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

export default LiftServicing;