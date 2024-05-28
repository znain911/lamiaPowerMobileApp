import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView,TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';


class Complete extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
      isPickerShow1: false,
      isPickerShow2: false,
        date1: new Date(),
        date2: new Date(),
        warrantyyear : '0'

 
    };
 
  }
  showPicker1 = () => {
    this.setState({isPickerShow1 : true})
  };
  showPicker2 = () => {
    this.setState({isPickerShow2 : true})
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

  

  complete =() => {
      var fullDate1, month1, month2, fullDate2
  
    month1 = this.state.date1.getMonth() + 1;
    month2 = this.state.date2.getMonth() + 1;
    fullDate1 = this.state.date1.getFullYear()+"-"+month1+"-"+this.state.date1.getDate();
    fullDate2 = this.state.date2.getFullYear()+"-"+month2+"-"+this.state.date2.getDate();
    if(this.state.date2.getMonth() === new Date().getMonth() && this.state.date2.getFullYear() === new Date().getFullYear() &&
    this.state.date2.getDate() === new Date().getDate()) {
      alert('Please select an end date of warranty')
    }else {
    
      var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/warranty.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id,
                    date1: fullDate1,
                    date2: fullDate2,
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
                    }else {
                        alert("Insertion Successful");

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({ButtonColor : false})
                });

    }

  }
  render() {
      var month1, month2
    var fullDate1, fullDate2

    if(this.state.date1.getMonth() === new Date().getMonth() && this.state.date1.getFullYear() === new Date().getFullYear() &&
    this.state.date1.getDate() === new Date().getDate()) {
      fullDate1 = "Select Date"
    } else{
      month1 = this.state.date1.getMonth() + 1;
      fullDate1 =this.state.date1.getDate()+"-"+month1+"-"+this.state.date1.getFullYear();
    }

    if(this.state.date2.getMonth() === new Date().getMonth() && this.state.date2.getFullYear() === new Date().getFullYear() &&
    this.state.date2.getDate() === new Date().getDate()) {
      fullDate2 = "Select Date"
    } else{
      month2 = this.state.date2.getMonth() + 1;
      fullDate2 =this.state.date2.getDate()+"-"+month2+"-"+this.state.date2.getFullYear();
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
            <Text style ={styles.headerText}>Project Complete Confirmation</Text>
        </View>

        <View style ={styles.info}>
            <View style ={styles.infolist}>
                <Text style ={styles.Client}>Note: Please Select a warranty start date or it will take the present date as the starting date of warranty</Text>

            </View>
        </View>


        <Text style ={styles.pd}>Warranty start Date: </Text>
        <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
            <TouchableOpacity onPress={this.showPicker1} >
                <Text style={styles.pickedDate}>{fullDate1}</Text>
            </TouchableOpacity>
            </View>
        </View>

        <Text style ={styles.pd}>Warranty end Date: </Text>
        <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
            <TouchableOpacity onPress={this.showPicker2} >
                <Text style={styles.pickedDate}>{fullDate2}</Text>
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
        />
        )}

        {this.state.isPickerShow2 && (
        <DateTimePicker
            value={this.state.date2}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={this.onChange2}
        />
        )}

        <View style = {styles.mainB}>
            <TouchableOpacity onPress={this.complete} >
            <View style ={styles.passContainer}>
                <Text style ={styles.passText}>Confirm</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color : '#0e2f44',
    marginTop: '2%'
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
      color : '#800000',
      textAlign: 'center'
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

export default Complete;