import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Entypo } from '@expo/vector-icons'; 

class SalaryInfo extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        salary: this.props.navigation.state.params.salary,
     
      

 
    };
 
  }

  AddEmployee = () => {
    this.props.navigation.navigate('AddEmployee', {
      OfficeId:this.props.navigation.state.params.id
    })
  }

  deactiveEmployee = (id,name,designation,salary) => {
    this.props.navigation.navigate('DeleteEmployee', {
      id: id,
      name: name,
      designation: designation,
      salary: salary
    })
  } 
Payment =() => {
  var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/salaryDetailInfo.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.state.salary[0].office_id
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

                        this.props.navigation.navigate('SalaryPayment',{
                          
                          id: this.state.salary[0].office_id,
                          salaryDetail : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('SalaryPayment',{
                          
                          id: this.state.salary[0].office_id,
                          salaryDetail : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
  
}
  render(){
    var salary
  if ( this.state.salary[0].total === '0') {
    salary = <Text style ={styles.Client}>No payment recorded</Text>
  }else {
    

    salary = <FlatList 
      data={this.state.salary}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          <TouchableOpacity onPress={() => this.deactiveEmployee(item.id,item.name,item.designation,item.salary)}>
          <View style ={styles.row}>
            <Text style ={styles.data}>{item.name}</Text>
            <Text style ={styles.data}>{item.designation}</Text>
            <Text style ={styles.data}>{item.salary}</Text>
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
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('OfficeInfo')}} style ={styles.back}>
            <Ionicons name="arrow-back" size={35} color="#0e2f44" />
            </TouchableOpacity>
            <Text style ={styles.headerText}>Salary Information</Text>
            
        </View>

        <View style ={styles.info}>
          <View style ={ styles.infolist}>
            <Text style ={styles.Client}>Slary Cost Per Month : {this.state.salary[0].total} tk </Text>
            <TouchableOpacity onPress={this.AddEmployee} style ={ styles.button} >
                <View style ={ styles.passContainer}>
                    <Text style ={styles.passText}>Add Employee</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.Payment} style ={ styles.button} >
                <View style ={ styles.passContainer}>
                    <Text style ={styles.passText}>Payment detail</Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>

         <Text style ={styles.pd}>Salary Detail: </Text>
         <View style ={styles.columnHead}>
          <Text style ={styles.heading}>Name </Text>
          <Text style ={styles.heading}>Designation </Text>
          <Text style ={styles.heading}>Amount </Text>
        </View>
        {salary}

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
      marginLeft: '2%'
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

export default SalaryInfo;