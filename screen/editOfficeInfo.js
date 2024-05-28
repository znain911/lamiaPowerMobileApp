import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView,ActivityIndicator, 
  Platform,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; 

class EditOfficeInfo extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
        district: null,
        address: null,
        rent: null
      

 
    };
  
}

editInfo =() => {
    if ((this.state.district === null || this.state.district === '') && 
    (this.state.address === null || this.state.address === '') && 
    (this.state.rent === null || this.state.rent === '')){
        alert("You didn't change anything");
    }else {
      var district,address,rent
      if (this.state.district === null || this.state.district === ''){
        district = this.props.navigation.state.params.district
      }else {
        district = this.state.district
      }
      if (this.state.address === null || this.state.address === ''){
        address = this.props.navigation.state.params.address
      }else {
        address = this.state.address
      }
      if (this.state.rent === null || this.state.rent === ''){
        rent = this.props.navigation.state.params.rent
      }else {
        rent = this.state.rent
      }

      var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/editOfficeInfo.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id:  this.props.navigation.state.params.id,
                    district: district,
                    address: address,
                    rent: rent,
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

                    if (response[0].message === 'Update Failed'){

                        alert("Insertion failed");
                    }else {
                        alert("Insertion Successful");

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        
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
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Landing')}} style ={styles.back}>
          <Ionicons name="arrow-back" size={35} color="#0e2f44" />
        </TouchableOpacity>
        <Text style ={styles.headerText}>Edit Office edit</Text>
      </View>
      <ScrollView keyboardShouldPersistTaps = 'always'>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
          <View>

          <Text style ={styles.pd}>District *: </Text>
          <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
              <TextInput style = {styles.text}
              placeholder= {this.props.navigation.state.params.district}
              
              onChangeText = {district => this.setState({district})}
              maxLength={30}
              />
            </View>
          </View>

          <Text style ={styles.pd}> Address *: </Text>
          <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
              <TextInput style = {styles.address}
              placeholder= {this.props.navigation.state.params.address}
              onChangeText = {address => this.setState({address})}
              multiline
              />
            </View>
          </View>

          <Text style ={styles.pd}>Rent *: </Text>
          <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
              <TextInput style = {styles.text}
              placeholder= {this.props.navigation.state.params.rent}
              onChangeText = {rent => this.setState({rent})}
              keyboardType ="numeric"
              />
            </View>
          </View>

          <View style = {styles.mainB}>
            <TouchableOpacity onPress={this.editInfo}>
              <View style ={this.state.ButtonColor ? styles.passContainerChange : styles.passContainer}>
                <Text style ={styles.passText}>Change Info</Text>
              </View>
            </TouchableOpacity>
          </View>

          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      
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
  mainB: {
    alignItems : 'center',
    marginTop : '5%'
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

export default EditOfficeInfo;