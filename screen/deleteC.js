import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Feather } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

class DeleteC extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
      mobile : this.props.navigation.state.params.mobile,
      payment: this.props.navigation.state.params.payment,
      

 
    };
 
  }

deleteClient =() => {
  var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/deleteClient.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id
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

                        alert("Delete failed");
                    }else {
                        alert("Delete Successful");

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
      

}

   

  render(){
    var phone = '0'.concat(this.state.mobile)
    var phone1= 'tel:'.concat(phone)
    const _handlePress = () => {
    Linking.openURL(phone1);
    this.props.onPress && this.props.onPress();
  };
//console.log(this.state.payment)
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
        <Text style ={styles.headerText}>Client Detail</Text>
      </View>

      <View style ={styles.info}>
        <View style ={styles.infolist}>

          <Text style ={styles.Client}>Name : {this.props.navigation.state.params.name} </Text>
          <Text style ={styles.Client}>Address: {this.props.navigation.state.params.address}</Text>
          <View style ={styles.mcontainer}>
            <Text style ={styles.Client}>Mobile Number: {phone}</Text>
            <TouchableOpacity onPress={_handlePress} style ={styles.mobile} >
            <Feather name="phone-call" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style ={styles.Client}>Deal date: {this.props.navigation.state.params.date}</Text>
          <Text style ={styles.Client}>Deal Amount: {this.props.navigation.state.params.amount} tk</Text>

        </View>

      </View>
      <View style = {styles.mcontainer}>
        <TouchableOpacity onPress={this.deleteClient} style ={ styles.button} >
            <View style ={ styles.passContainer}>
                <Text style ={styles.passText}>Delete Client</Text>
            </View>
        </TouchableOpacity>
      </View>

      
      
    </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  main: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        paddingTop: 200,
        justifyContent: 'center'
    },
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
    Client: {
      fontSize: 20,
      marginLeft: '2%',
      fontWeight: 'bold',
      color : '#0e2f44',
      textAlign: 'center'
    },
    mobile: {
      marginLeft: '2%',
      padding: 5,
      backgroundColor: '#006400',
      borderColor: '#006400',
      borderRadius: 15,
      elevation: 20
    },
    mcontainer: {
      flexDirection: 'row',
      justifyContent: 'center'
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
      color: '#79d246',
      marginLeft: '5%'
    },
    recieved: {
      marginTop: '3%',
      fontSize: 15,
      marginBottom: '2%',
      fontWeight: 'bold',
      color: '#79d246',
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

export default DeleteC;