import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView,ActivityIndicator, 
  Platform,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; 

class NewClient extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
        isPickerShow: false,
        date: new Date(),
        ButtonColor: false,
        name: null,
        address: null,
        mobile: '',
        amount: null
      

 
    };
 
  }

  showPicker = () => {
    this.setState({isPickerShow : true})
  };

  onChange = (event, value) => {
    
    if (Platform.OS === 'android') {
      this.setState({isPickerShow : false})
    }
    if(event.type == "set") {          

      this.setState({date : value})
    } else {                                    
      return null
    }
  };
AddClient = () => {
  var fullDate, month
  
  month = this.state.date.getMonth() + 1;
  fullDate = this.state.date.getFullYear()+"-"+month+"-"+this.state.date.getDate();
  if (this.state.name === null || this.state.name === '') {
    alert("Name field can't be empty");
  }else{
    if (this.state.address === null || this.state.address === '') {
    alert("adress field can't be empty");
  }else{
    if (this.state.mobile.length == 0 || this.state.mobile.length < 10 ) {
    alert("mobile number should be 11 digit");
  }else{
    if (this.state.amount === null || this.state.amount === '') {
    alert("Insert amount to add client");
  }else{
    this.setState({ButtonColor : true})
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/addClient.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    name: this.state.name,
                    address: this.state.address,
                    mobile: this.state.mobile,
                    amount: this.state.amount,
                    date:fullDate
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

                        alert("Insertion failed");
                        this.setState({ButtonColor : false})
                    }else {
                        alert("Insertion Successful");
                        this.setState({ButtonColor : false})

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({ButtonColor : false})
                });
    
  }
    
  }
    
  }
    
  }
      
}
  render(){
      var month
    var fullDate

    if(this.state.date.getMonth() === new Date().getMonth() && this.state.date.getFullYear() === new Date().getFullYear() &&
    this.state.date.getDate() === new Date().getDate()) {
      fullDate = "Select Date"
    } else{
      month = this.state.date.getMonth() + 1;
      fullDate = this.state.date.getFullYear()+"-"+month+"-"+this.state.date.getDate();
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
        <Text style ={styles.headerText}>ADD Client</Text>
      </View>
      <ScrollView keyboardShouldPersistTaps = 'always'>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
          <View>

          <Text style ={styles.pd}>Client Name *: </Text>
          <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
              <TextInput style = {styles.text}
              placeholder= 'Insert Client Name'
              onChangeText = {name => this.setState({name})}
              maxLength={30}
              />
            </View>
          </View>

          <Text style ={styles.pd}>Client Address *: </Text>
          <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
              <TextInput style = {styles.address}
              placeholder= 'Insert Client Address'
              onChangeText = {address => this.setState({address})}
              multiline
              />
            </View>
          </View>

          <Text style ={styles.pd}>Contact Number *: </Text>
          <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
              <TextInput style = {styles.text}
              placeholder= 'Insert Mobile Number'
              onChangeText = {mobile => this.setState({mobile})}
              maxLength={11}
              keyboardType ="numeric"
              />
            </View>
          </View>

          <Text style ={styles.pd}>Amount *: </Text>
          <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
              <TextInput style = {styles.text}
              placeholder= 'Insert Amount in Taka'
              onChangeText = {amount => this.setState({amount})}
              keyboardType ="numeric"
              />
            </View>
          </View>

          <Text style ={styles.pd}>Deal Date: </Text>
          <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
              <TouchableOpacity onPress={this.showPicker} >
                <Text style={styles.pickedDate}>{fullDate}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {this.state.isPickerShow && (
                    <DateTimePicker
                      value={this.state.date}
                      mode={'date'}
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={true}
                      onChange={this.onChange}
                      style={styles.datePicker}
                    />
                  )}
          <View style = {styles.mainB}>
            <TouchableOpacity onPress={this.AddClient}>
              <View style ={this.state.ButtonColor ? styles.passContainerChange : styles.passContainer}>
                <Text style ={styles.passText}>Add Client</Text>
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

export default NewClient;