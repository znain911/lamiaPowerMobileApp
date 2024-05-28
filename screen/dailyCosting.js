import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView ,FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Entypo } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';

class DailyCost extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        dailyCost: this.props.navigation.state.params.dailyCost
     
      

 
    };
 
  }
  addOfficeCost =() => {
    this.props.navigation.navigate('AddDailyCosting', {
        id:  this.props.navigation.state.params.id,
      })
  }
  render(){
      var costing
  if ( this.state.dailyCost[0].total === '0') {
    costing = <Text style ={styles.Client}>No Daily Costing recorded</Text>
  }else {
    

    costing = <FlatList 
      data={this.state.dailyCost}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          <TouchableOpacity >
          <View style ={styles.row}>
            <Text style ={styles.data}>{item.type}</Text>
            <Text style ={styles.data}>{item.date}</Text>
            <Text style ={styles.data}>{item.amount}</Text>
            <Text style ={styles.data}>{item.cost_from}</Text>
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
            <Text style ={styles.headerText}>Daily Cost</Text>
        </View>

        <View style ={styles.info}>
            <View style ={styles.infolist}>
                <Text style ={styles.Client}>Office Cost Date : {this.props.navigation.state.params.date} </Text>
                <Text style ={styles.Client}>Total Cost : {this.state.dailyCost[0].total} </Text>
                <TouchableOpacity onPress={this.addOfficeCost} style ={ styles.button} >
                    <View style ={ styles.passContainer}>
                        <Text style ={styles.passText}>Add Office Cost</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>

        <Text style ={styles.pd}>Costing Detail: </Text>
         <View style ={styles.columnHead}>
          <Text style ={styles.heading}>Type </Text>
          <Text style ={styles.heading}>Date </Text>
          <Text style ={styles.heading}>Amount </Text>
          <Text style ={styles.heading}>From </Text>
        </View>
        {costing}
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
export default DailyCost;