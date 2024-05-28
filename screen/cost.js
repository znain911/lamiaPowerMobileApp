import React, {Component} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView,ActivityIndicator, 
  Platform,FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { Ionicons,Feather } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';


class Cost extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        mobile : this.props.navigation.state.params.mobile,
        cost: this.props.navigation.state.params.costing
      
      

 
    };
 
  }

  delete = (idI, item_name,quantity,unit_price,total) => {
  this.props.navigation.navigate('DeleteCosting', {
    idi: idI,
    item_name: item_name,
    quantity: quantity,
    unit_price: unit_price,
    total: total

  })
}
  render(){
      var phone = '0'.concat(this.state.mobile)
    var phone1= 'tel:'.concat(phone)
    const _handlePress = () => {
    Linking.openURL(phone1);
    this.props.onPress && this.props.onPress();
  };

  var costing, totalcost,Pprofit
  if ( this.state.cost[0].total === '0') {
    costing = <Text style ={styles.Client}>No costing recorded</Text>
    totalcost = '0'
  }else {
    totalcost = this.state.cost[0].totalCost
    costing = <FlatList 
      data={this.state.cost}
      keyExtractor={(item) => item.idI}
      renderItem = {({item}) => (
        <View style ={styles.list}>
          <TouchableOpacity onPress={() => this.delete(item.idI, item.item_name, item.quantity, item.unit_price,item.total)}>
            <View style ={styles.row}>
                <Text style ={styles.name}>{item.item_name} </Text>
                <Text style ={styles.quantity}>{item.quantity} </Text>
                <Text style ={styles.data}>{item.unit_price} </Text>
                <Text style ={styles.data}>{item.total} </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      />
  }
  Pprofit = this.props.navigation.state.params.amount - totalcost
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
                <Text style ={styles.headerText}>Costing</Text>
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
                <Text style ={styles.Client}>Total Cost: {totalcost} tk</Text>
                <Text style ={styles.Client}>Present profit: {Pprofit} tk</Text>

              </View>

            </View>

            <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddCosting',{
          id: this.props.navigation.state.params.id,
        })}} style ={ styles.button} >
                <View style ={ styles.passContainer}>
                    <Text style ={styles.passText}>Add Costing</Text>
                </View>
            </TouchableOpacity>
            <Text style ={styles.heading}>Costing Detail:</Text>
            <View style ={styles.columnHead}>
              <Text style ={styles.pd}>Item      </Text>
              <Text style ={styles.qt}>Quantity  </Text>
              <Text style ={styles.pd}>Unit price    </Text>
              <Text style ={styles.pd}>Total</Text>
            </View>
            
            {costing}

        </LinearGradient>
      );
  }
}

const styles = StyleSheet.create({
  main: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        paddingTop: 200,
        justifyContent: 'center'
    },
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
      flexDirection: 'row'
    },
    columnHead: {
      flexDirection: 'row',
      justifyContent : 'center',
      marginLeft: '10%'
    },
    pd: {
      marginTop: '3%',
      fontSize: 15,
      marginBottom: '2%',
      fontWeight: 'bold',
      color: '#79d246'
    },
    qt: {
      marginTop: '3%',
      fontSize: 15,
      marginBottom: '2%',
      fontWeight: 'bold',
      color: '#79d246',
      marginLeft: '8%'
    },
    heading: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      borderBottomWidth: 2,
      marginBottom: '2%'
    },
    button: {
      alignItems: 'center',
      marginTop: '2%'
    },
    passContainer: {
        width: '90%',
        backgroundColor: '#00964E',
        borderWidth: 2,
        borderColor: '#00964E',
        borderRadius: 10,
        elevation: 20
    },
  passText: {
        
        color: '#FFFFFF',
        paddingBottom: '3%',
        paddingLeft: '30%',
        paddingRight: '30%',
        paddingTop: '3%',
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
    width: '21%',
    fontSize: 16,
    fontWeight: 'bold',
    color : '#0e2f44',
    borderWidth: 2,
    padding: 3,
    textAlign: 'center'
    
  },
  quantity: {
    width: '16%',
    fontSize: 16,
    fontWeight: 'bold',
    color : '#0e2f44',
    borderWidth: 2,
    padding: 3,
    textAlign: 'center'
    
  },
  name: {
    width: '42%',
    fontSize: 16,
    fontWeight: 'bold',
    color : '#0e2f44',
    borderWidth: 2,
    padding: 3,
    textAlign: 'center'
    
  },

});

export default Cost;