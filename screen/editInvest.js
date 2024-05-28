import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons,Feather } from '@expo/vector-icons'; 

class EditInvest extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        
      
      amount: '',
      date: new Date(),
      

 
    };
 
  }
  Update = () => {
      var fullDate, month
  
    month = this.state.date.getMonth() + 1;
    fullDate = this.state.date.getFullYear()+"-"+month+"-"+this.state.date.getDate();
    if (this.state.amount === ''){
      alert('Amount should not empty');
    }else{
       var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/UpdateInvestor.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    id: this.props.navigation.state.params.id,
                    updateBy: this.props.navigation.state.params.updateBy,
                    date:fullDate,
                    amount: this.state.amount,
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

                    if (response[0].message === 'No Data'){

                        alert("Insertion failed");
                        this.setState({amount : ''})
                    }else {
                        alert("Insertion Successful");
                        this.setState({amount : ''})

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
              


    }

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
            <Text style ={styles.headerText}>Edit Invest</Text>
        </View>
        <View style ={styles.info}>
          <View style ={ styles.infolist}>
              <Text style ={styles.Client}>Name : {this.props.navigation.state.params.name} </Text>
              <Text style ={styles.Client}>Present Invest : {this.props.navigation.state.params.amount} </Text>

          </View>
        </View>

        <Text style ={styles.pd}>Invest *: </Text>
        <View style = {styles.main}>
            <View style = {styles.phoneNumber}>
                <TextInput 
                placeholder= 'Insert invest in Taka'
                keyboardType ="numeric"
                onChangeText = {amount => this.setState({amount})}
                />
            </View>
        </View>

        <TouchableOpacity onPress={this.Update} style ={ styles.button} >
            <View style ={ styles.passContainer}>
                <Text style ={styles.passText}>Update Invest</Text>
            </View>
        </TouchableOpacity>

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
      marginTop: '3%',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: '1%',
      marginLeft: '4%'
    },
    main: {
    alignItems : 'center'
  },

  phoneNumber:{
      backgroundColor: '#007982',
      borderColor: '#007982',
      borderRadius: 5,
      padding: 5,
      width: '92%',
      alignItems: 'center',
      
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

export default EditInvest;