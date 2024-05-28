import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Feather } from '@expo/vector-icons'; 

class RepayDetail extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
      
      repay: this.props.navigation.state.params.repay,
      

 
    };
 
  }

  delete =(name,amount,date,return_from,id) => {

    this.props.navigation.navigate('DeleteRepay',{
      name: name,
      amount: amount,
      date: date,
      return_from: return_from,
      id: id
    });
  }
  render(){
    if (this.state.repay[0].id === 'No Data'){
      repay =<Text style ={styles.Client}>No Payment Recorded</Text>
    }else{
    var repay
    repay = <FlatList 
      data={this.state.repay}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          <TouchableOpacity onPress={() => this.delete(item.name,item.amount,item.date, item.return_from, item.id)}>
          <View style ={styles.row}>
            <Text style ={styles.data}>{item.name}</Text>
            <Text style ={styles.data}>{item.date}</Text>
            <Text style ={styles.data}>{item.amount}</Text>
            <Text style ={styles.data}>{item.return_from}</Text>
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
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('LoanDetail')}} style ={styles.back}>
            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Repay Detail</Text>
        </View>

        <TouchableOpacity onPress={() => {this.props.navigation.navigate('RepayLoan',{
          id: this.props.navigation.state.params.id,
        })}} style ={ styles.button} >
              <View style ={ styles.passContainer}>
                  <Text style ={styles.passText}>Repay Loan</Text>
              </View>
          </TouchableOpacity>

        <Text style ={styles.pd}>Payment Detail: </Text>
        <View style ={styles.columnHead}>
            <Text style ={styles.heading}>Name </Text>
            <Text style ={styles.heading}>Date </Text>
            <Text style ={styles.heading}>Amount </Text>
            <Text style ={styles.heading}>From </Text>
        </View>
        {repay}
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
      color: '#5CF405',
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
    Client: {
      fontSize: 20,
      marginLeft: '2%',
      fontWeight: 'bold',
      color : '#0e2f44',
      textAlign: 'center'
    },
});
export default RepayDetail;