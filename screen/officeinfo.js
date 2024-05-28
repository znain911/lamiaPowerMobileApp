import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Entypo } from '@expo/vector-icons'; 
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

class OfficeInfo extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        isPickerShow: false,
        date: new Date(),
        month: '',
        year: ''
     
      

 
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

  edit =() => {
      this.props.navigation.navigate('EditOfficeInfo', {
        id:  this.props.navigation.state.params.id,
        district:  this.props.navigation.state.params.district,
        address:  this.props.navigation.state.params.address,
        rent:  this.props.navigation.state.params.rent,
      })
  }

  salary = () => {
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/salaryinfo.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id,
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

                    if (response[0].id === 'No Data'){

                        this.props.navigation.navigate('SalaryInfo',{
                          id: this.props.navigation.state.params.id,
                          salary : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('SalaryInfo',{
                          id: this.props.navigation.state.params.id,
                          salary : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });

  }
  dailyCost =() => {
    var fullDate, month,fullDate1
  
    month = this.state.date.getMonth() + 1;
    fullDate = this.state.date.getFullYear()+"-"+month+"-"+this.state.date.getDate();
    fullDate1 = this.state.date.getDate()+"-"+month+"-"+this.state.date.getFullYear();
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/dailyCost.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id,
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

                    if (response[0].id === 'No Data'){

                        this.props.navigation.navigate('DailyCost',{
                          
                          id: this.props.navigation.state.params.id,
                          date: fullDate1,
                          dailyCost : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('DailyCost',{
                          id: this.props.navigation.state.params.id,
                          date: fullDate1,
                          dailyCost : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
  }
  monthlyCost = () => {
    if(this.state.month === ''){
      alert("Please Select a month first")
    }else {
      var date
      if (this.state.year === ''){
        date = new Date().getFullYear()+"-"+this.state.month;
      }else {
        date = this.state.year+"-"+this.state.month;
      }
      var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/monthlyCost.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id,
                    date: date
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

                    if (response[0].id === 'No Data'){

                        this.props.navigation.navigate('MonthlyCost',{
                          
                          id: this.props.navigation.state.params.id,
                          monthlycost : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('MonthlyCost',{
                          id: this.props.navigation.state.params.id,
                          monthlycost : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });


      
    }

  }
  monthChange =(month) => {
    this.setState({month: month});
  }
  yearChange =(year) => {
    this.setState({year: year});
  }
  costing = () =>{
    this.props.navigation.navigate('AddDailyCosting', {
        id:  this.props.navigation.state.params.id,
      })
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
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('OfficeList')}} style ={styles.back}>
            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Office Information</Text>
        </View>

        <View style ={styles.info}>
            <View style ={styles.infolist}>
                <Text style ={styles.Client}>Office District Location : {this.props.navigation.state.params.district} </Text>
                <Text style ={styles.Client}>Address : {this.props.navigation.state.params.address} </Text>
                <Text style ={styles.Client}>Rent : {this.props.navigation.state.params.rent} tk</Text>
                <TouchableOpacity onPress={this.edit} style ={ styles.button} >
                    <View style ={ styles.passContainer}>
                        <Text style ={styles.passText}>Edit Office Info</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>

        <ScrollView>
        <View style ={styles.info}>
            <TouchableOpacity onPress={this.salary}  style ={styles.infolist2}>
            <Entypo name="credit" size={25} color="#0e2f44" />
            <Text style ={styles.Client}>Salary</Text>
            </TouchableOpacity>
        </View>

        <View style = {styles.main}>
          <View style = {styles.phoneNumber}>
            <TouchableOpacity onPress={this.showPicker} >
              <Text >{fullDate}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style ={styles.info}>
            <TouchableOpacity onPress={this.dailyCost}  style ={styles.infolist2}>
            <Entypo name="credit" size={25} color="#0e2f44" />
            <Text style ={styles.Client}>Daily Cost</Text>
            </TouchableOpacity>
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
          <View style ={styles.pickerContainer}>
            <View style ={styles.picker}>
                <Picker selectedValue={this.state.month} onValueChange= {this.monthChange}>
                <Picker.Item label = 'Month' value = '' />
                <Picker.Item label = 'January' value = '01' />
                <Picker.Item label = 'February' value = '02' />
                <Picker.Item label = 'March' value = '03' />
                <Picker.Item label = 'April' value = '04' />
                <Picker.Item label = 'May' value = '05' />
                <Picker.Item label = 'June' value = '06' />
                <Picker.Item label = 'July' value = '07' />
                <Picker.Item label = 'August' value = '08' />
                <Picker.Item label = 'September' value = '09' />
                <Picker.Item label = 'October' value = '10' />
                <Picker.Item label = 'November' value = '11' />
                <Picker.Item label = 'December' value = '12' />
                </Picker>
            </View>

            <View style ={styles.picker}>
                <Picker selectedValue={this.state.year} onValueChange= {this.yearChange}>
                <Picker.Item label = 'Year' value = '' />
                <Picker.Item label = '2020' value = '2020' />
                <Picker.Item label = '2021' value = '2021' />
                <Picker.Item label = '2022' value = '2022' />
                <Picker.Item label = '2023' value = '2023' />
                <Picker.Item label = '2024' value = '2024' />
                <Picker.Item label = '2025' value = '2025' />
                <Picker.Item label = '2026' value = '2026' />
                <Picker.Item label = '2027' value = '2027' />
                <Picker.Item label = '2028' value = '2028' />
                <Picker.Item label = '2029' value = '2029' />
                <Picker.Item label = '2030' value = '2030' />
                </Picker>
            </View>
          </View>

         <View style ={styles.info}>
            <TouchableOpacity onPress={this.monthlyCost}  style ={styles.infolist2}>
            <Entypo name="credit" size={25} color="#0e2f44" />
            <Text style ={styles.Client}>Monthly Cost</Text>
            </TouchableOpacity>
        </View>

        <View style ={styles.info}>
            <TouchableOpacity onPress={this.costing}  style ={styles.infolist2}>
            <Entypo name="credit" size={25} color="#0e2f44" />
            <Text style ={styles.Client}>Add Cost</Text>
            </TouchableOpacity>
        </View>

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
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color : '#0e2f44'
  },
  back: {
    justifyContent:'center',
    marginRight: '10%'
  },
  main: {
    alignItems : 'center',
    marginTop: '5%'
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
    infolist2: {
      width: '90%',
      padding: 10,
      backgroundColor: '#007982',
      borderColor: '#007982',
      borderRadius: 15,
      marginTop: '6%',
      elevation: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    Client: {
      fontSize: 20,
      marginLeft: '2%',
      fontWeight: 'bold',
      color : '#0e2f44',
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
    phoneNumber:{
      backgroundColor: '#007982',
      borderColor: '#007982',
      borderRadius: 5,
      padding: 5,
      width: '92%',
      alignItems: 'center',
      
    },
    pickerContainer:{
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginTop: '5%'
    },
    picker: {
        width: '40%',
        backgroundColor: '#007982',
        borderColor: '#007982',
        borderRadius: 10,
    },

});

export default OfficeInfo;