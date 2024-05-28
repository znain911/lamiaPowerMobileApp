import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'; 

class Client extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
      
 client2: this.props.navigation.state.params.client[0]
 
    };
 
  }

  getClient = (name,id, address,mobile,date,amount,complete) => {
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/payment.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: id
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

                        this.props.navigation.navigate('Detail',{
                          name: name,
                          id: id,
                          address: address,
                          mobile: mobile,
                          date: date,
                          amount: amount,
                          complete: complete,
                          payment : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('Detail',{
                          name: name,
                          id: id,
                          address: address,
                          mobile: mobile,
                          date: date,
                          amount: amount,
                          complete: complete,
                          payment : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
   
  }

  render(){
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
          <Text style ={styles.headerText}>Client List</Text>
      </View>

      <FlatList 
      data={this.state.client2}
      keyExtractor={(item) => item.id}
      renderItem = {({item}) => (
        <View style ={styles.info}>
        <TouchableOpacity onPress={() => this.getClient(item.name, item.id, item.address, item.mobile,item.date,item.amount,item.complete)} style ={styles.infolist}>
          <Ionicons name="people" size={25} color="#0e2f44" />
          <Text style ={styles.Client}>{item.name}</Text>
        </TouchableOpacity>
      </View>
      )}
      />
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
        alignItems: 'center'
    },
    infolist: {
      width: '90%',
      padding: 10,
      backgroundColor: '#007982',
      borderColor: '#007982',
      borderRadius: 15,
      marginTop: '3%',
      marginBottom: '3%',
      elevation: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    Client: {
      fontSize: 20,
      marginLeft: '2%',
      fontWeight: 'bold',
      color : '#0e2f44',
    }
});

export default Client;