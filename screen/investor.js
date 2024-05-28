import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Feather } from '@expo/vector-icons'; 

class Investor extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
      
      invest: this.props.navigation.state.params.invest,
      

 
    };
 
  }
  editInvest = (name,amount,date,id) => {
    this.props.navigation.navigate('EditInvest', {
    name: name,
    amount: amount,
    date: date,
    id: id,
    updateBy: this.props.navigation.state.params.updateBy,

  })
  }

  loan =() => {
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/investorLoan.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
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

                        
                        this.props.navigation.navigate('InvestorLoan',{
                          
                          loan : response
                        })
                    }else {
                        this.props.navigation.navigate('InvestorLoan',{
                          
                          loan : response[0]
                        })

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
              

  }
  addLoan = () => {
     this.props.navigation.navigate('AddInvestorLoan');
  }
  render(){
    var invest
    invest = <FlatList 
      data={this.state.invest}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          <TouchableOpacity onPress={() => this.editInvest(item.name,item.amount,item.date,item.id)}>
          <View style ={styles.row}>
            <Text style ={styles.data}>{item.name}</Text>
            <Text style ={styles.data}>{item.amount}</Text>
            <Text style ={styles.data}>{item.date}</Text>
          </View>
          </TouchableOpacity>
        </View>
      )}
      />
      return(
          <LinearGradient
    colors={['#006c38', '#007982']}
    style={{
      flex: 1,
    }}
    >
        <View style ={styles.header} >
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Landing')}} style ={styles.back}>
            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Investor</Text>
        </View>

        <View style ={styles.info}>
          <View style ={ styles.infolist}>
              <Text style ={styles.Client}>Total Invest : {this.state.invest[0].total} tk </Text>
              <TouchableOpacity onPress={this.loan} style ={ styles.button} >
                <View style ={ styles.passContainer}>
                    <Text style ={styles.passText}>Investor Loan</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.addLoan} style ={ styles.button} >
                <View style ={ styles.passContainer}>
                    <Text style ={styles.passText}>Add Loan</Text>
                </View>
            </TouchableOpacity>

          </View>
        </View>

        <Text style ={styles.pd}>Investor Detail: </Text>
         <View style ={styles.columnHead}>
          <Text style ={styles.heading}>Name </Text>
          <Text style ={styles.heading}>Amount </Text>
          <Text style ={styles.heading}>Update Date </Text>
        </View>
        {invest}

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
export default Investor;