import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Feather } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

class Detail extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
      mobile : this.props.navigation.state.params.mobile,
      payment: this.props.navigation.state.params.payment,
     
      costValue:[{"total": null}],
      

 
    };
 
  }
costing = () => {
  var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/costing.php";
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

                    if (response[0].id === 'No Data'){

                        
                        this.props.navigation.navigate('Cost',{
                          name: this.props.navigation.state.params.name,
                          id: this.props.navigation.state.params.id,
                          address: this.props.navigation.state.params.address,
                          mobile: this.props.navigation.state.params.mobile,
                          date: this.props.navigation.state.params.date,
                          amount: this.props.navigation.state.params.amount,
                          costing : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('Cost',{
                          name: this.props.navigation.state.params.name,
                          id: this.props.navigation.state.params.id,
                          address: this.props.navigation.state.params.address,
                          mobile: this.props.navigation.state.params.mobile,
                          date: this.props.navigation.state.params.date,
                          amount: this.props.navigation.state.params.amount,
                          costing : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
}

delete = (idP, type,date,amount,recieved_by) => {
  this.props.navigation.navigate('DeletePayment', {
    idp: idP,
    type: type,
    date: date,
    amount: amount,
    recieved_by: recieved_by

  })
}

loan = () => {
  var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/loan.php";
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

                    if (response[0].id === 'No Data'){

                        this.props.navigation.navigate('LoanDetail',{
                          
                          id: this.props.navigation.state.params.id,
                          loan : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('LoanDetail',{
                          
                          id: this.props.navigation.state.params.id,
                          loan : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
}
complete =() => {
  this.props.navigation.navigate('Complete', {
    id: this.props.navigation.state.params.id
  });
}
   

  render(){
    var phone = '0'.concat(this.state.mobile)
    var phone1= 'tel:'.concat(phone)
    const _handlePress = () => {
    Linking.openURL(phone1);
    this.props.onPress && this.props.onPress();
  };
  var due ,complete
  if (parseInt(this.state.payment[0].total) >= parseInt(this.props.navigation.state.params.amount)){
    due = '0'
  }else {
    due = this.props.navigation.state.params.amount - this.state.payment[0].total
  }

  if (this.props.navigation.state.params.complete === 'yes'){
    complete = <Text style ={styles.Client}>Project Completed</Text>
  }else {
    complete = <Text style ={styles.Client}>Project not Completed</Text>
  }

  var payment
  if ( this.state.payment[0].total === '0') {
    payment = <Text style ={styles.Client}>No payment recorded</Text>
  }else {
    

    payment = <FlatList 
      data={this.state.payment}
      keyExtractor={(item) => item.idP}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          <TouchableOpacity onPress={() => this.delete(item.idP, item.type, item.date, item.amount,item.recieved_by)}>
          <View style ={styles.row}>
            <Text style ={styles.data}>{item.date}</Text>
            <Text style ={styles.data}>{item.amount}</Text>
            <Text style ={styles.data}>{item.type}</Text>
            <Text style ={styles.data}>{item.recieved_by}</Text>
          </View>
          </TouchableOpacity>
        </View>
      )}
      />
  }


  
//console.log(this.props.navigation.state.params.complete)
    return(
        <LinearGradient
    colors={['#006c38', '#007982']}
    style={{
      flex: 1,
    }}
    >
      <View style ={styles.header} >
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Client')}} style ={styles.back}>
          <Ionicons name="arrow-back" size={35} color="#0e2f44" />
        </TouchableOpacity>
        <Text style ={styles.headerText}>Client Detail</Text>
      </View>

      <View style ={styles.info}>
        <View style ={styles.infolist}>

          <Text style ={styles.Client}>Name : {this.props.navigation.state.params.name} </Text>
          <Text style ={styles.Client}>Address: {this.props.navigation.state.params.address}</Text>
          <View style ={styles.mcontainer}>
            <Text style ={styles.Client}>Mobile Number: {phone}</Text>
            <TouchableOpacity onPress={_handlePress} style ={styles.mobile} >
            <Feather name="phone-call" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style ={styles.Client}>Deal date: {this.props.navigation.state.params.date}</Text>
          <Text style ={styles.Client}>Deal Amount: {this.props.navigation.state.params.amount} tk</Text>
          <Text style ={styles.Client}>Total payment: {this.state.payment[0].total} tk</Text>
          <Text style ={styles.Client}>Due payment: {due} tk</Text>
          {complete}
          

        </View>

      </View>
      <View style = {styles.mcontainer}>
        <TouchableOpacity onPress={this.costing} style ={ styles.button} >
            <View style ={ styles.passContainer}>
                <Text style ={styles.passText}>Get Costing</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddPayment',{
          id: this.props.navigation.state.params.id,
        })}}  style ={ styles.button} >
            <View style ={ styles.passContainer}>
                <Text style ={styles.passText}>Add Payment</Text>
            </View>
        </TouchableOpacity>
      </View>

      <View style = {styles.mcontainer}>
      <TouchableOpacity onPress={this.loan}  style ={ styles.button} >
          <View style ={ styles.passContainer}>
              <Text style ={styles.passText}>Loan</Text>
          </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.complete}  style ={ styles.button} >
          <View style ={ styles.passContainer}>
              <Text style ={styles.passText}>Complete</Text>
          </View>
      </TouchableOpacity>

     
      </View>

      
      
      

      <Text style ={styles.pd}>Payment Detail: </Text>
      <View style ={styles.columnHead}>
        <Text style ={styles.heading}>Date </Text>
        <Text style ={styles.heading}>Amount </Text>
        <Text style ={styles.heading}>Type </Text>
        <Text style ={styles.heading}>Recieved </Text>
      </View>
      {payment}

      
      
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
    mobile: {
      marginLeft: '2%',
      padding: 5,
      backgroundColor: '#006400',
      borderColor: '#006400',
      borderRadius: 15,
      elevation: 20
    },
    mcontainer: {
      flexDirection: 'row',
      justifyContent: 'center'
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
    recieved: {
      marginTop: '3%',
      fontSize: 15,
      marginBottom: '2%',
      fontWeight: 'bold',
      color: '#79d246',
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
  row: {
    flexDirection: 'row',
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
  

});

export default Detail;