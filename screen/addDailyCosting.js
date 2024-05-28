import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView,ActivityIndicator, 
  Platform,TouchableWithoutFeedback, Keyboard } from 'react-native';
  import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; 

class AddDailyCosting extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
        isPickerShow: false,
        date: new Date(),
        ButtonColor: false,
        type: '',
        amount: '',
        recievedBy: null,
        
      

 
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

  RecievedBY = (recievedBy) => {
     this.setState({recievedBy: recievedBy});
  }

  addDailyCosting = () => {
    var fullDate, month
  
    month = this.state.date.getMonth() + 1;
    fullDate = this.state.date.getFullYear()+"-"+month+"-"+this.state.date.getDate();
    if (this.state.type === ''){
      alert('Type should not empty');
    }else{
            if (this.state.amount === ''){
        alert('Amount should not empty');
        }else{
          if (this.state.recievedBy === null){
        alert('Given by should not empty');
        }else{
          this.setState({ButtonColor : true})
       var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/addOfficeCosting.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id,
                    type: this.state.type,
                    amount: this.state.amount,
                    from: this.state.recievedBy,
                    date: fullDate
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
                        this.setState({type : ''})
                        this.setState({amount : ''})
                    }else {
                        alert("Insertion Successful");
                        this.setState({ButtonColor : false})
                        this.setState({type : ''})
                        this.setState({amount : ''})

                        
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
      var month
    var fullDate

    if(this.state.date.getMonth() === new Date().getMonth() && this.state.date.getFullYear() === new Date().getFullYear() &&
    this.state.date.getDate() === new Date().getDate()) {
      fullDate = "Select Date"
    } else{
      month = this.state.date.getMonth() + 1;
      fullDate =this.state.date.getDate()+"-"+month+"-"+this.state.date.getFullYear();
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
            <Text style ={styles.headerText}>ADD Daily Costing</Text>
        </View>

        <Text style ={styles.pd}>Type *: </Text>
        <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
                <TextInput style = {styles.text}
                placeholder= 'Insert type Of Cost'
                onChangeText = {type => this.setState({type})}
                />
            </View>
        </View>

        <Text style ={styles.pd}>Amount *: </Text>
        <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
                <TextInput style = {styles.text}
                placeholder= 'Insert amount in Taka'
                onChangeText = {amount => this.setState({amount})}
                keyboardType ="numeric"
                />
            </View>
        </View>

        <Text style ={styles.pd}>Given by *: </Text>
        <View style ={styles.picker}>
            <Picker selectedValue={this.state.recievedBy} onValueChange= {this.RecievedBY}>
            <Picker.Item label = '' value = '' />
            <Picker.Item label = 'Shoikot' value = 'Shoikot' />
            <Picker.Item label = 'Dolon' value = 'Dolon' />
            </Picker>
        </View>

        <Text style ={styles.pd}>Date: </Text>
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
        />
        )}

        <View style = {styles.mainB}>
            <TouchableOpacity onPress={this.addDailyCosting} >
            <View style ={this.state.ButtonColor ? styles.passContainerChange : styles.passContainer}>
                <Text style ={styles.passText}>Add Costing</Text>
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
    picker: {
        width: '90%',
        backgroundColor: '#007982',
        borderColor: '#007982',
        borderRadius: 10,
        marginLeft: '5%'
    },
});
export default AddDailyCosting;