import React, {Component} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView,ActivityIndicator, 
  Platform,FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { Ionicons,Feather } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

class ResetPass extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
     ButtonColor: false,
    FirstPass: '',
    SecondPass: ''

 
    };
 
  }

  pass = () => {
    if (this.state.FirstPass === '' && this.state.SecondPass === ''){
      alert("Please insert password within 6-15 digit");
    }else {
      var FirstPass = this.state.FirstPass
      var SecondPass = this.state.SecondPass
      if (FirstPass.length < 6 || SecondPass.length < 6){
        alert("Password should be 6-15 digit");
      }else {
        if (FirstPass === SecondPass){
          this.setState({ButtonColor : true})
          var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/editpass.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                    var Data = {
                        name: this.props.navigation.state.params.name,
                        Password: FirstPass
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

                        if (response[0].message === 'New password insert failed'){

                            alert("Network error");
                            this.setState({ButtonColor : false})
                        }else {
                            alert('New password inserted');
                            this.setState({ButtonColor : false})
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.setState({ButtonColor : false})
                    });

        }else {
          alert("Please did not matched");
        }
      }
    }
  }

  render(){

    return(
    <LinearGradient
    colors={['#006c38', '#007982']}
    style={{
      flex: 1,
    }}
    >
        <View style ={styles.header} >
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Landing')}}  style ={styles.back}>
             <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Change Password</Text>
        </View>

        <Text style ={styles.pd}>Insert Password *: </Text>
        <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
                <TextInput style = {styles.text}
                placeholder= 'Insert Password (6-15) characters'
                onChangeText={FirstPass => this.setState({FirstPass})}
                maxLength={15}
                />
            </View>
        </View>

        <Text style ={styles.pd}>Re-enter Password *: </Text>
        <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
                <TextInput style = {styles.text}
                placeholder= 'Insert Password (6-15) characters'
                onChangeText={SecondPass => this.setState({SecondPass})}
                maxLength={15}
                />
            </View>
        </View>

        <View style = {styles.mainB}>
            <TouchableOpacity onPress={this.pass} >
                <View style ={this.state.ButtonColor ? styles.passContainerChange : styles.passContainer}>
                <Text style ={styles.passText}>Change Password</Text>
                </View>
            </TouchableOpacity>
        </View>

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

  mainB: {
    alignItems : 'center',
    marginTop : '5%'
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
      marginTop: '10%',
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

  passContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#006c38',
        borderWidth: 2,
        borderColor: '#006c38',
        borderRadius: 10,
        marginBottom: '6%' ,
        elevation: 15
    },
    passContainerChange: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#00914C',
        borderWidth: 2,
        borderColor: '#00914C',
        borderRadius: 10,
        marginBottom: '6%' 
    },
    passText: {
        
        color: '#FFFFFF',
        paddingBottom: '3%',
        paddingLeft: '30%',
        paddingRight: '30%',
        paddingTop: '3%',
        fontSize:  18,
        textAlign: 'center',
        overflow: 'hidden'
    },

});

export default ResetPass;