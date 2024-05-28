import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView,ActivityIndicator, 
  Platform,TouchableWithoutFeedback, Keyboard } from 'react-native';
  import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; 

class AddLoan extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
        isPickerShow1: false,
        date1: new Date(),
        isPickerShow2: false,
        date2: new Date(),
        ButtonColor: false,
        name: null,
        amount: null
      

 
    };
 
  }
  showPicker1 = () => {
    this.setState({isPickerShow1 : true})
  };

  onChange1 = (event, value) => {
    
    if (Platform.OS === 'android') {
      this.setState({isPickerShow1 : false})
    }
    if(event.type == "set") {          

      this.setState({date1 : value})
    } else {                                    
      return null
    }
  };

  showPicker2 = () => {
    this.setState({isPickerShow2 : true})
  };

  onChange2 = (event, value) => {
    
    if (Platform.OS === 'android') {
      this.setState({isPickerShow2 : false})
    }
    if(event.type == "set") {          

      this.setState({date2 : value})
    } else {                                    
      return null
    }
  };

  addLoan =() => {
      var fullDate1, month1,fullDate2, month2
  
    month1 = this.state.date1.getMonth() + 1;
    fullDate1 = this.state.date1.getFullYear()+"-"+month1+"-"+this.state.date1.getDate();

    month2 = this.state.date2.getMonth() + 1;
    fullDate2 = this.state.date2.getFullYear()+"-"+month2+"-"+this.state.date2.getDate();
    if (this.state.name === null){
      alert('Name should not empty');
    }else{
        if (this.state.amount === null){
      alert('Amount should not empty');
    }else{
      if (this.state.date2.getMonth() === new Date().getMonth() && this.state.date2.getFullYear() === new Date().getFullYear() &&
    this.state.date2.getDate() === new Date().getDate()){
      alert('Please insert a return date');
    }else{
      this.setState({ButtonColor : true})
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/addLoan.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id,
                    name: this.state.name,
                    amount: this.state.amount,
                    date1:fullDate1,
                    date2:fullDate2
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
                        this.setState({name : null})
                        this.setState({amount : null})
                    }else {
                        alert("Insertion Successful");
                        this.setState({ButtonColor : false})
                        this.setState({name : null})
                        this.setState({amount : null})

                        
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

  render(){
      var month1, fullDate1 ,month2, fullDate2

    if(this.state.date1.getMonth() === new Date().getMonth() && this.state.date1.getFullYear() === new Date().getFullYear() &&
    this.state.date1.getDate() === new Date().getDate()) {
      fullDate1 = "Select Date"
    } else{
      month1 = this.state.date1.getMonth() + 1;
      fullDate1 = this.state.date1.getDate()+"-"+month1+"-"+this.state.date1.getFullYear();
    }

    if(this.state.date2.getMonth() === new Date().getMonth() && this.state.date2.getFullYear() === new Date().getFullYear() &&
    this.state.date2.getDate() === new Date().getDate()) {
      fullDate2 = "Select Date"
    } else{
      month2 = this.state.date2.getMonth() + 1;
      fullDate2 = this.state.date2.getDate()+"-"+month2+"-"+this.state.date2.getFullYear();
    }
      return(
          <LinearGradient
    colors={['#006c38', '#007982']}
    style={{
      flex: 1,
    }}
    >
        <View style ={styles.header} >
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Detail')}} style ={styles.back}>
                <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>ADD Loan</Text>
        </View>

        <ScrollView keyboardShouldPersistTaps = 'always'>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
                <View>

                    <Text style ={styles.pd}>Name *: </Text>
                    <View style = {styles.main}>
                        <View style = {styles.phoneNumber}>
                            <TextInput style = {styles.text}
                            placeholder= 'Insert Name'
                             onChangeText = {name => this.setState({name})}
                            />
                        </View>
                    </View>

                    <Text style ={styles.pd}>Amount *: </Text>
                    <View style = {styles.main}>
                        <View style = {styles.phoneNumber}>
                            <TextInput style = {styles.text}
                            placeholder= 'Insert Amount in Taka'
                            keyboardType ="numeric"
                             onChangeText = {amount => this.setState({amount})}
                            />
                        </View>
                    </View>

                    <Text style ={styles.pd}>Loan Date: </Text>
                    <View style = {styles.main}>
                        <View style = {styles.phoneNumber}>
                        <TouchableOpacity onPress={this.showPicker1} >
                            <Text style={styles.pickedDate}>{fullDate1}</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                     {this.state.isPickerShow1 && (
                    <DateTimePicker
                      value={this.state.date1}
                      mode={'date'}
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={true}
                      onChange={this.onChange1}
                      style={styles.datePicker}
                    />
                  )}

                    <Text style ={styles.pd}>Return Date *: </Text>
                    <View style = {styles.main}>
                        <View style = {styles.phoneNumber}>
                        <TouchableOpacity onPress={this.showPicker2} >
                            <Text style={styles.pickedDate}>{fullDate2}</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                   

                  {this.state.isPickerShow2 && (
                    <DateTimePicker
                      value={this.state.date2}
                      mode={'date'}
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={true}
                      onChange={this.onChange2}
                      style={styles.datePicker}
                    />
                  )}

                  <View style = {styles.mainB}>
                    <TouchableOpacity onPress={this.addLoan}>
                    <View style ={this.state.ButtonColor ? styles.passContainerChange : styles.passContainer}>
                        <Text style ={styles.passText}>Add Loan</Text>
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
    mainB: {
    alignItems : 'center',
    marginTop : '5%'
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

export default AddLoan;