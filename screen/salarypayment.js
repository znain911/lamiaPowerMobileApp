import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Entypo } from '@expo/vector-icons'; 

class SalaryPayment extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        salaryDetail: this.props.navigation.state.params.salaryDetail,
     
      

 
    };
 
  }
  AddSalary = () => {
    this.props.navigation.navigate('AddSalary', {
      officeid: this.props.navigation.state.params.id
    })
  }
  deleteSalary =(id,name,date,amount,payment_from) => {
    this.props.navigation.navigate('DeleteSalary', {
      id: id,
      name: name,
      date: date,
      amount: amount,
      payment_from: payment_from,
    })
  }
  render(){
    var salary
  if ( this.state.salaryDetail[0].id === 'No Data') {
    salary = <Text style ={styles.Client}>No data recorded</Text>
  }else {
    

    salary = <FlatList 
      data={this.state.salaryDetail}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          <TouchableOpacity onPress={() => this.deleteSalary(item.id,item.name,item.date,item.amount,item.payment_from)}>
          <View style ={styles.row}>
            <Text style ={styles.data}>{item.name}</Text>
            <Text style ={styles.data}>{item.date}</Text>
            <Text style ={styles.data}>{item.amount}</Text>
            <Text style ={styles.data}>{item.payment_from}</Text>
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
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('SalaryInfo')}} style ={styles.back}>
            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Salary Payment Info</Text>
            
        </View>

        <TouchableOpacity onPress={this.AddSalary} style ={ styles.button} >
            <View style ={ styles.passContainer}>
                <Text style ={styles.passText}>Add payment</Text>
            </View>
        </TouchableOpacity>

        <Text style ={styles.pd}>Salary Detail: </Text>
         <View style ={styles.columnHead}>
          <Text style ={styles.heading}>Name </Text>
          <Text style ={styles.heading}>Date </Text>
          <Text style ={styles.heading}>Amount </Text>
          <Text style ={styles.heading}>From </Text>
        </View>
        {salary}
    </LinearGradient>
    )
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
      marginLeft: '2%'
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
});

export default SalaryPayment;