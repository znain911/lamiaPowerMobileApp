import React, {Component} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome,Entypo,AntDesign,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons'; 



class Landing extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
      
 
    };
 
  }
 

  GetClient = () => {
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/client.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    name: 'empty'
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

                    if (response[0].name === 'No Data'){

                        alert("No Client Recorded");
                        this.setState({ButtonColor : false})
                    }else {
                        this.props.navigation.navigate('Client',{
                            client : response,
                        });
                        

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
  }

  deleteClient = () => {
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/client.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    name: 'empty'
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

                    if (response[0].name === 'No Data'){

                        alert("Please insert a valid login Information");
                        this.setState({ButtonColor : false})
                    }else {
                        this.props.navigation.navigate('DeletClient',{
                            client : response,
                        });
                        

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
  }

  officeList =() => {
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/officelist.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    name: 'empty'
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

                    if (response[0].name === 'No Data'){

                        alert("network error");
                        this.setState({ButtonColor : false})
                    }else {
                        this.props.navigation.navigate('OfficeList',{
                            office : response,
                        });
                        

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });

  }
  investment = () => {
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/investor.php";
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

                        this.props.navigation.navigate('Investor',{
                          updateBy: this.props.navigation.state.params.name,
                          invest : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('Investor',{
                          
                          updateBy: this.props.navigation.state.params.name,
                          invest : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
  }
  servicing = () => {
    var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/liftServicing.php";
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

                    if (response[0].name === 'No Data'){

                        this.props.navigation.navigate('LiftServicing',{
                          lift : response
                        })
                        
                    }else {
                        this.props.navigation.navigate('LiftServicing',{
                          
                          lift : response[0]
                        })
                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
  }

  render(){
    
    var pic,name
    if (this.props.navigation.state.params.name === 'mishu'){
      pic = <Image source={require('../assets/zulkar1.jpeg')} style ={styles.image} />
      name = <Text style ={styles.detail}>Zulkar Nain</Text>
    } else if(this.props.navigation.state.params.name === 'dolon'){
      pic = <Image source={require('../assets/dolon.jpeg')} style ={styles.image} />
      name = <Text style ={styles.detail}>MD : S.M Abu sayed Dolon</Text>
    }
    else {
      pic = <Image source={require('../assets/shoikot.jpeg')} style ={styles.image} />
      name = <Text style ={styles.detail}>MD : Mahfuzul alam</Text>
    }

      return(
        <LinearGradient
    colors={['#006c38', '#007982']}
    style={{
      flex: 1,
    }}
    >
      <View style ={styles.header} >
          <Text style ={styles.headerText}>Lamia Power Co.</Text>
      </View>

      <View style ={styles.ownerinfo}>
        <View style ={styles.picContainer}>
           {pic}
        </View>
        <View style ={styles.infoContainer}>
          <Text style ={styles.infoHeader}>Profile Detail</Text>
          {name}
          <Text style ={styles.detail}>Lamia Power Co.</Text>

        </View>
      </View>
      <ScrollView>
      <View style ={styles.info}>
        <TouchableOpacity onPress={this.GetClient} style ={styles.infolist}>
          <FontAwesome name="list-alt" size={25} color="#0e2f44" />
          <Text style ={styles.Client}>Client List</Text>
        </TouchableOpacity>
      </View>

      <View style ={styles.info}>
        <TouchableOpacity onPress={this.officeList}  style ={styles.infolist}>
          <Entypo name="credit" size={25} color="#0e2f44" />
          <Text style ={styles.Client}>Office Maintenance</Text>
        </TouchableOpacity>
      </View>

      <View style ={styles.info}>
        <TouchableOpacity  onPress={this.investment} style ={styles.infolist}>
          <FontAwesome name="money" size={25} color="black" />
          <Text style ={styles.Client}>Investment</Text>
        </TouchableOpacity>
      </View>

      <View style ={styles.info}>
        <TouchableOpacity  onPress={this.servicing} style ={styles.infolist}>
          <MaterialIcons name="miscellaneous-services" size={25} color="black" />
          <Text style ={styles.Client}>Lift Servicing</Text>
        </TouchableOpacity>
      </View>

      <View style ={styles.info}>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('NewClient')}} style ={styles.infolist}>
          <AntDesign name="adduser" size={25} color="#0e2f44" />
          <Text style ={styles.Client}>Add New Client</Text>
        </TouchableOpacity>
      </View>

      <View style ={styles.info}>
        <TouchableOpacity onPress={this.deleteClient}  style ={styles.infolist}>
          <AntDesign name="delete" size={25} color="black" />
          <Text style ={styles.Client}>Delete Client</Text>
        </TouchableOpacity>
      </View>

      {/* <View style ={styles.info}>
        <TouchableOpacity style ={styles.infolist}>
          <AntDesign name="adduser" size={25} color="#0e2f44" />
          <Text style ={styles.Client}>Add Office Maintenance</Text>
        </TouchableOpacity>
      </View> */}

      <View style ={styles.info}>
        <TouchableOpacity style ={styles.infolist} onPress={() => {this.props.navigation.navigate('ResetPass', {
          name: this.props.navigation.state.params.name
        })}}>
          <MaterialCommunityIcons name="form-textbox-password" size={25} color="black" />
          <Text style ={styles.Client}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style ={styles.info}>
        <TouchableOpacity style ={styles.infologout} onPress={() => {this.props.navigation.navigate('Login')}}>
          <Entypo name="log-out" size={25} color="#0e2f44" />
          <Text style ={styles.Client}>Logout</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
  ownerinfo: {
        alignItems: 'center',
        marginTop: '5%',
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
    picContainer: {
      width: '40%',
      padding: 5,
      backgroundColor: '#007982',
      borderColor: '#007982',
      borderRadius: 15,
      marginBottom: '6%',
      elevation: 20,
      overflow: 'hidden',
      alignItems: 'center',
      marginRight:'2%'
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
      marginBottom: '6%',
      elevation: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    infologout: {
      width: '90%',
      padding: 10,
      backgroundColor: '#E03030',
      borderColor: '#007982',
      borderRadius: 15,
      marginBottom: '6%',
      elevation: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    image: {
        width:  '100%',
        height:  200,
        borderRadius: 15,
    },

    infoContainer: {
      width: '60%',
      padding: 10,
      backgroundColor: '#007982',
      borderColor: '#007982',
      borderRadius: 15,
      marginBottom: '6%',
      elevation: 20,
      overflow: 'hidden',
      alignItems: 'center',
    },
    infoHeader: {
      width: '100%',
      fontSize: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      color : '#0e2f44',
      borderBottomWidth: 2,
      borderBottomColor: '#0e2f44',
    },
    detail: {
      width: '100%',
      fontSize: 16,
      marginTop: '2%'
    },
    Client: {
      fontSize: 20,
      marginLeft: '2%',
      fontWeight: 'bold',
      color : '#0e2f44',
    }
});

export default Landing;