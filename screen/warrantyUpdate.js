import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Feather } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

class WarrantyUpdate extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        mobile : this.props.navigation.state.params.mobile,
        cost: '',
    };
    }
    
    update = () => {
     if (this.state.cost === ''){
         alert('Please Insert a amount before update')
     }else{
        var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/warrantyOff.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id,
                    cost: this.state.cost
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

                    if (response[0].message === 'No Data'){

                        alert('Insertion Failed')
                        
                    }else {
                        alert('Warranty set to off successful')
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
     }
    }
    render( ){
        var phone = '0'.concat(this.state.mobile)
    var phone1= 'tel:'.concat(phone)
    const _handlePress = () => {
    Linking.openURL(phone1);
    this.props.onPress && this.props.onPress();
  };
        
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
            <Text style ={styles.headerText}>Update Warranty Info</Text>
        </View>

        <View style ={styles.info}>
          <View style ={ styles.infolist}>
               <Text style ={styles.Client}>Name : {this.props.navigation.state.params.name} </Text>
               <View style ={styles.mcontainer}>
                   <Text style ={styles.Client}>Mobile Number: {phone}</Text>
                   <TouchableOpacity onPress={_handlePress} style ={styles.mobile} >
                    <Feather name="phone-call" size={20} color="black" />
                    </TouchableOpacity>
               </View>

               <Text style ={styles.Client}>Address : {this.props.navigation.state.params.address} </Text>
               <Text style ={styles.Client}>Warranty End Date : {this.props.navigation.state.params.warranty_end} </Text>

          </View>
        </View>

        <Text style ={styles.pd}>Service Cost per month *: </Text>
        <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
                <TextInput style = {styles.text}
                placeholder= 'Insert Cost'
                keyboardType ="numeric"
                onChangeText = {cost => this.setState({cost})}
                />
            </View>
        </View>

        <TouchableOpacity onPress={this.update} style ={ styles.button} >
            <View style ={ styles.passContainer}>
                <Text style ={styles.passText}>End Warranty</Text>
            </View>
        </TouchableOpacity>

        
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
   
  Client: {
      fontSize: 20,
      marginLeft: '2%',
      fontWeight: 'bold',
      color : '#0e2f44',
      textAlign: 'center'
    },
    info: {
        alignItems: 'center',
        marginBottom: '2%'
    },
    infolist: {
      width: '90%',
      padding: 10,
      backgroundColor: '#007982',
      borderColor: '#007982',
      borderRadius: 15,
      marginTop: '6%',
      elevation: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    mcontainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    mobile: {
      marginLeft: '2%',
      padding: 5,
      backgroundColor: '#006400',
      borderColor: '#006400',
      borderRadius: 15,
      elevation: 20
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
     pd: {
      marginTop: '3%',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: '1%',
      marginLeft: '4%'
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
});

export default WarrantyUpdate;