import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView,TouchableWithoutFeedback, Keyboard } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'; 

class DeleteEmployee extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
      isPickerShow: false,
        date: new Date(),
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

  resign = () => {
    var fullDate, month
  
    month = this.state.date.getMonth() + 1;
    fullDate = this.state.date.getFullYear()+"-"+month+"-"+this.state.date.getDate();
    this.setState({ButtonColor : true})
                var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/deleteEmployee.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id,
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
                        alert("Employee resigned");
                        this.setState({ButtonColor : false})

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({ButtonColor : false})
                });

  }
  render() {
      var month, fullDate 

    if(this.state.date.getMonth() === new Date().getMonth() && this.state.date.getFullYear() === new Date().getFullYear() &&
    this.state.date.getDate() === new Date().getDate()) {
      fullDate = "Select Date"
    } else{
      month = this.state.date.getMonth() + 1;
      fullDate = this.state.date.getDate()+"-"+month+"-"+this.state.date.getFullYear();
    }
      return(
          <LinearGradient
    colors={['#006c38', '#007982']}
    style={{
      flex: 1,
    }}
    >
        <View style ={styles.header} >
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('OfficeInfo')}} style ={styles.back}>
            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Delete Employee</Text>
            
        </View>

        <View style ={styles.info}>
            <View style ={styles.infolist}>
                 <Text style ={styles.Client}>Name: {this.props.navigation.state.params.name}</Text>
                 <Text style ={styles.Client}>Designation: {this.props.navigation.state.params.designation}</Text>
                 <Text style ={styles.Client}>Salary: {this.props.navigation.state.params.salary}</Text>

            </View>
        </View>

        <Text style ={styles.pd}>Resign Date: </Text>
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
            <TouchableOpacity onPress={this.resign}>
            <View style ={this.state.ButtonColor ? styles.passContainerChange : styles.passContainer}>
                <Text style ={styles.passText}>Resign</Text>
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
  
  back: {
    justifyContent:'center',
    marginRight: '10%'
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color : '#0e2f44'
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
export default DeleteEmployee;