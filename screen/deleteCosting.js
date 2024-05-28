import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView,TouchableWithoutFeedback, Keyboard } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'; 

class DeleteCosting extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
      

 
    };
 
  }

  delete = () => {
  
    
      
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/deleteCosting.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    idi: this.props.navigation.state.params.idi
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

                        alert("Delete failed");
                    }else {
                        alert("Delete Successful");

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
      
    
      
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
            <Text style ={styles.headerText}>Delete Costing</Text>
        </View>

        <ScrollView keyboardShouldPersistTaps = 'always'>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
                <View>
                    <Text style ={styles.heading}>Costing Detail:</Text>
                    <View style ={styles.columnHead}>
                      <Text style ={styles.pd}>Item      </Text>
                      <Text style ={styles.qt}>Quantity  </Text>
                      <Text style ={styles.pd}>Unit price    </Text>
                      <Text style ={styles.pd}>Total</Text>
                    </View>
                    <View style ={styles.list}>
                            <View style ={styles.row}>
                                <Text style ={styles.data}>{this.props.navigation.state.params.item_name}</Text>
                                <Text style ={styles.data}>{this.props.navigation.state.params.quantity}</Text>
                                <Text style ={styles.data}>{this.props.navigation.state.params.unit_price}</Text>
                                <Text style ={styles.data}>{this.props.navigation.state.params.total}</Text>
                                
                            </View>
                    </View>

                    <TouchableOpacity onPress={this.delete}  style ={ styles.button} >
                      <View style ={ styles.passContainer}>
                          <Text style ={styles.passText}>Delete Costing</Text>
                      </View>
                  </TouchableOpacity>
                        
                    
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
  columnHead: {
      flexDirection: 'row',
      justifyContent : 'space-evenly',
    },
    pd: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#79d246'
    },
    qt: {
      fontSize: 15,
      marginBottom: '2%',
      fontWeight: 'bold',
      color: '#79d246',
    },
    heading: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      borderBottomWidth: 2,
      marginBottom: '2%'
    },
    
  
    passContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#007982',
        borderWidth: 2,
        borderColor: '#007982',
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
    button: {
      alignItems: 'center',
      marginTop: '2%',
    },
     row: {
    flexDirection: 'row',
  },
  list: {
        marginBottom: '2%',
        width: '98%',
        marginLeft: '1%',
        marginTop : '5%'
        
    },
  data: {
    width: '25%',
    fontSize: 16,
    fontWeight: 'bold',
    color : '#0e2f44',
    borderWidth: 2,
    padding: 3,
    textAlign: 'center'
    
  },
});

export default DeleteCosting;