import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView,ActivityIndicator, 
  Platform,TouchableWithoutFeedback, Keyboard } from 'react-native';
  import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'; 

class AddCosting extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
        isPickerShow: false,
        date: new Date(),
        ButtonColor: false,
        Item: null,
        Quantity: null,
        Unit: null
      

 
    };
 
  }

  Item = (Item) => {
     this.setState({Item: Item});
  }

  save = () => {
    var fullDate, month
  
    month = this.state.date.getMonth() + 1;
    fullDate = this.state.date.getFullYear()+"-"+month+"-"+this.state.date.getDate();
    if (this.state.Item === null){
      alert('Item should not empty');
    }else{
      if (this.state.Quantity === null){
      alert('Quantity should not empty');
    }else{
        if (this.state.Unit === null){
      alert('Unit price should not empty');
    }else{
      this.setState({ButtonColor : true})
       var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/addCosting.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id,
                    itemName: this.state.Item,
                    quantity: this.state.Quantity,
                    unitPrice: this.state.Unit
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
                        this.setState({Payment : null})
                        this.setState({amount : null})
                    }else {
                        alert("Insertion Successful");
                        this.setState({ButtonColor : false})
                        this.setState({Quantity : null})
                        this.setState({Item : null})
                        this.setState({Unit : null})

                        
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
  render () {
    


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
            <Text style ={styles.headerText}>ADD Costing</Text>
        </View>

        <ScrollView keyboardShouldPersistTaps = 'always'>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
                <View>
                    <Text style ={styles.pd}>Item *: </Text>
                    <View style ={styles.picker}>
                        <Picker selectedValue={this.state.Item} onValueChange= {this.Item}>
                        <Picker.Item label = '' value = '' />
                        <Picker.Item label = 'Gearless Machine Mona' value = 'Gearless Machine Mona' />
                        <Picker.Item label = 'Travelling Cable' value = 'Travelling Cable' />
                        <Picker.Item label = 'Controller' value = 'Controller' />
                        <Picker.Item label = 'Cabin 6 person' value = 'Cabin 6 person' />
                        <Picker.Item label = 'Suspension Rod' value = 'Suspension Rod' />
                        <Picker.Item label = 'Guidrail Main 10 mm' value = 'Guidrail Main 10 mm' />
                        <Picker.Item label = 'Guidrail Holo 16 mm' value = 'Guidrail Holo 16 mm' />
                        <Picker.Item label = 'Header' value = 'Header' />
                        <Picker.Item label = 'Operator 700 mm' value = 'Operator 700 mm' />
                        <Picker.Item label = 'Steel Rope' value = 'Steel Rope' />
                        <Picker.Item label = 'Door' value = 'Door' />
                        <Picker.Item label = 'LOP GF' value = 'LOP GF' />
                        <Picker.Item label = 'LOP Middle' value = 'LOP Middle' />
                        <Picker.Item label = 'LOP TF' value = 'LOP TF' />
                        <Picker.Item label = 'Level Switch' value = 'Level Switch' />
                        <Picker.Item label = 'COP 6/6 stops with call card' value = 'COP 6/6 stops with call card' />
                        <Picker.Item label = 'Limit Switch' value = 'Limit Switch' />
                        <Picker.Item label = 'Full Hight Photocell' value = 'Full Hight Photocell' />
                        <Picker.Item label = 'Speed Govornor' value = 'Speed Govornor' />
                        <Picker.Item label = 'Intercom' value = 'Intercom' />
                        <Picker.Item label = 'Arrival Gong' value = 'Arrival Gong' />
                        <Picker.Item label = 'Inspection Box' value = 'Inspection Box' />
                        <Picker.Item label = 'Anchor Bolt' value = 'Anchor Bolt' />
                        <Picker.Item label = 'Plastic Oil Pot' value = 'Plastic Oil Pot' />
                        <Picker.Item label = 'Car Top PCB' value = 'Car Top PCB' />
                        </Picker>
                    </View>

                    <Text style ={styles.pd}>Quantity *: </Text>
                        <View style = {styles.main}>
                            <View style = {styles.phoneNumber}>
                                <TextInput style = {styles.text}
                                placeholder= 'Insert Quantity'
                                onChangeText = {Quantity => this.setState({Quantity})}
                                keyboardType ="numeric"
                                />
                            </View>
                        </View>
                    
                    <Text style ={styles.pd}>Unit Price *: </Text>
                    <View style = {styles.main}>
                        <View style = {styles.phoneNumber}>
                            <TextInput style = {styles.text}
                            placeholder= 'Insert per unit price in Taka'
                            onChangeText = {Unit => this.setState({Unit})}
                            keyboardType ="numeric"
                            />
                        </View>
                    </View>

                  <View style = {styles.mainB}>
                        <TouchableOpacity onPress={this.save}>
                        <View style ={this.state.ButtonColor ? styles.passContainerChange : styles.passContainer}>
                            <Text style ={styles.passText}>Add Costing</Text>
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
    picker: {
        width: '90%',
        backgroundColor: '#007982',
        borderColor: '#007982',
        borderRadius: 10,
        marginLeft: '5%'
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

export default AddCosting;