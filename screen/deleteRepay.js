import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView,TouchableWithoutFeedback, Keyboard } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'; 

class DeleteRepay extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
      

 
    };
 
  }

  delete = () => {
  
    
      
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/deleteRepay.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id
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
            <Text style ={styles.headerText}>Delete Loan Repay</Text>
        </View>

        <Text style ={styles.pd}>Payment Detail: </Text>
        <View style ={styles.columnHead}>
            <Text style ={styles.heading}>Name </Text>
            <Text style ={styles.heading}>Date </Text>
            <Text style ={styles.heading}>Amount </Text>
            <Text style ={styles.heading}>From </Text>
        </View>

        <View style ={styles.list}>
          
          <View style ={styles.row}>
            <Text style ={styles.data}>{this.props.navigation.state.params.name}</Text>
            <Text style ={styles.data}>{this.props.navigation.state.params.date}</Text>
            <Text style ={styles.data}>{this.props.navigation.state.params.amount}</Text>
            <Text style ={styles.data}>{this.props.navigation.state.params.return_from}</Text>
          </View>
        </View>

        

        <TouchableOpacity onPress={this.delete}  style ={ styles.button} >
            <View style ={ styles.passContainer}>
                <Text style ={styles.passText}>Delete Repay</Text>
            </View>
        </TouchableOpacity>

        
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
      textAlign: 'center',
      marginTop: '3%',
      fontSize: 18,
      borderBottomWidth: 2,
      fontWeight: 'bold',
      marginBottom: '2%'
    },
    columnHead: {
      flexDirection: 'row',
      justifyContent : 'space-evenly',
    },
    heading: {
      marginTop: '3%',
      fontSize: 15,
      marginBottom: '2%',
      fontWeight: 'bold',
      color: '#5CF405',
      marginLeft: '5%'
    },

    row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  list: {
        marginBottom: '2%',
        width: '98%',
        marginLeft: '1%'
        
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
});

export default DeleteRepay;