import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Feather } from '@expo/vector-icons'; 

class InvestorLoan extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
      
      loan: this.props.navigation.state.params.loan,
      

 
    };
 
  }
editloan = (name,amount,date,id) => {
    this.props.navigation.navigate('InvestorLoanPay', {
    name: name,
    amount: amount,
    date: date,
    id: id,

  })
}
  render(){
      var loan
      if (this.state.loan[0].id === 'No Data'){
          loan = <Text style ={styles.Client}>No Loan recorded</Text>
      }else{
    loan = <FlatList 
      data={this.state.loan}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          <TouchableOpacity onPress={() => this.editloan(item.name,item.amount,item.date,item.id)}>
          <View style ={styles.row}>
            <Text style ={styles.data}>{item.name}</Text>
            <Text style ={styles.data}>{item.amount}</Text>
            <Text style ={styles.data}>{item.date}</Text>
          </View>
          </TouchableOpacity>
        </View>
      )}
      />
      }
      return(
          <LinearGradient
    colors={['#006c38', '#007982']}
    style={{
      flex: 1,
    }}
    >
        <View style ={styles.header} >
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Investor')}} style ={styles.back}>
            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Investor Loan</Text>
        </View>

        <Text style ={styles.pd}>Investor Loan: </Text>
         <View style ={styles.columnHead}>
          <Text style ={styles.heading}>Name </Text>
          <Text style ={styles.heading}>Amount </Text>
          <Text style ={styles.heading}>Update Date </Text>
        </View>
        {loan}

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
      color: '#79d246',
      marginLeft: '3%'
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
  Client: {
      fontSize: 20,
      marginLeft: '2%',
      fontWeight: 'bold',
      color : '#0e2f44',
    },
});
export default InvestorLoan;