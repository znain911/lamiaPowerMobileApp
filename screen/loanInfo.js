import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Feather } from '@expo/vector-icons'; 

class LoanDetail extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
      loan: this.props.navigation.state.params.loan,
    };
 
  }

  delete =(name,amount,date,return_date,id) => {

    this.props.navigation.navigate('DeleteLoan',{
      name: name,
      amount: amount,
      date: date,
      return_date: return_date,
      id: id
    });
  }

  repayDetail =  () => {
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/repayDetail.php";
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

                        this.props.navigation.navigate('RepayDetail',{
                          
                          id: this.props.navigation.state.params.id,
                          repay : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('RepayDetail',{
                          
                          id: this.props.navigation.state.params.id,
                          repay : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });

  }
  render(){
      var due 
  if (parseInt(this.state.loan[0].back) >= parseInt(this.state.loan[0].total)|| this.state.loan[0].total === '0'){
    due = '0'
  }else {
    due = this.state.loan[0].total - this.state.loan[0].back
  }

  var loan
  if ( this.state.loan[0].total === '0') {
    loan = <Text style ={styles.Client}>No Loan recorded</Text>
  }else {
    

    loan = <FlatList 
      data={this.state.loan}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          <TouchableOpacity onPress={() => this.delete(item.name,item.amount,item.date, item.return_date, item.id)} >
          <View style ={styles.row}>
            <Text style ={styles.data}>{item.name}</Text>
            <Text style ={styles.data}>{item.amount}</Text>
            <Text style ={styles.data}>{item.date}</Text>
            <Text style ={styles.data}>{item.return_date}</Text>
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
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Detail')}} style ={styles.back}>
            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Loan Detail</Text>
        </View>

        <View style ={styles.info}>
            <View style ={styles.infolist}>
                <Text style ={styles.Client}>Total Loan: {this.state.loan[0].total} tk</Text>
                <Text style ={styles.Client}>Loan Repay: {this.state.loan[0].back} tk</Text>
                <Text style ={styles.Client}>Present Loan: {due} tk</Text>

            </View>
        </View>

        <View style = {styles.mcontainer}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddLoan',{
          id: this.props.navigation.state.params.id,
        })}} style ={ styles.button} >
              <View style ={ styles.passContainer}>
                  <Text style ={styles.passText}>Add New Loan</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.repayDetail}   style ={ styles.button} >
              <View style ={ styles.passContainer}>
                  <Text style ={styles.passText}>Paid Loan</Text>
              </View>
          </TouchableOpacity>
        </View>

        <Text style ={styles.pd}>Loan Detail: </Text>
        <View style ={styles.columnHead}>
            <Text style ={styles.heading}>Name </Text>
            <Text style ={styles.heading}>Amount </Text>
            <Text style ={styles.heading}>Date </Text>
            <Text style ={styles.heading}>Return Date </Text>
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
  mcontainer: {
      flexDirection: 'row',
      justifyContent: 'center'
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

});

export default LoanDetail;