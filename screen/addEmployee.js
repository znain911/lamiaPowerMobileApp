import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView,ActivityIndicator, 
  Platform,TouchableWithoutFeedback, Keyboard } from 'react-native';
  import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; 

class AddEmployee extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
        isPickerShow: false,
        date: new Date(),
        name: '',
        designation: '',
        salary: '',
        ButtonColor: false,

 
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

  addEmployee = () => {
    var fullDate, month
  
    month = this.state.date.getMonth() + 1;
    fullDate = this.state.date.getFullYear()+"-"+month+"-"+this.state.date.getDate();
    if (this.state.name === ''){
      alert('Name should not empty');
    }else{
            if (this.state.designation === ''){
        alert('Designation should not empty');
        }else{
                if (this.state.salary === ''){
            alert('Salary should not empty');
            }else{
                this.setState({ButtonColor : true})
                var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/addEmployee.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    OfficeId: this.props.navigation.state.params.OfficeId,
                    name: this.state.name,
                    designation: this.state.designation,
                    salary: this.state.salary,
                    joining:fullDate
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
                        this.setState({name : ''})
                        this.setState({salary : ''})
                    }else {
                        alert("Insertion Successful");
                        this.setState({ButtonColor : false})
                        this.setState({name : ''})
                        this.setState({salary : ''})

                        
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
    var month, fullDate 

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
        <ScrollView keyboardShouldPersistTaps = 'always'>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
                <View >
                    <View style ={styles.header} >
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('OfficeInfo')}} style ={styles.back}>
                            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
                        </TouchableOpacity>
                        <Text style ={styles.headerText}>ADD Employee</Text>
                    </View>

                    <View style ={styles.margin}>
                        <Text style ={styles.pd}>Name *: </Text>
                        <View style = {styles.main}>
                            <View style = {styles.phoneNumber}>
                                <TextInput style = {styles.text}
                                placeholder= 'Insert Name'
                                onChangeText = {name => this.setState({name})}
                                />
                            </View>
                        </View>

                        <Text style ={styles.pd}>Designation *: </Text>
                        <View style = {styles.main}>
                            <View style = {styles.phoneNumber}>
                                <TextInput style = {styles.text}
                                placeholder= 'Insert Designation'
                                 onChangeText = {designation => this.setState({designation})}
                                />
                            </View>
                        </View>

                        <Text style ={styles.pd}>Salary *: </Text>
                        <View style = {styles.main}>
                            <View style = {styles.phoneNumber}>
                                <TextInput style = {styles.text}
                                placeholder= 'Insert Salary'
                                keyboardType ="numeric"
                                onChangeText = {salary => this.setState({salary})}
                                />
                            </View>
                        </View>

                        <Text style ={styles.pd}>Joining Date: </Text>
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
                            <TouchableOpacity onPress={this.addEmployee}>
                            <View style ={this.state.ButtonColor ? styles.passContainerChange : styles.passContainer}>
                                <Text style ={styles.passText}>Add Employee</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>
        </View>
        </TouchableWithoutFeedback>
    </ScrollView>

    </LinearGradient>
      );
  }
}

const styles = StyleSheet.create({
    margin: {
        marginTop: '5%',
        marginBottom: '20%'
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

export default AddEmployee;