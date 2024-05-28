import React, {Component} from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity, ScrollView,Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableWithoutFeedback} from 'react-native-gesture-handler';

class Login extends Component {
    constructor(props) {
 
    super(props);
 
    this.state = {
        name: '', 
        pass: ''
      
 
    };
 
  }

  login = () => {
      var name = this.state.name;
      var pass = this.state.pass;
      if (name.length == 0 || pass.length == 0){
          alert("Required field is empty! Please insert a valid name/email and Password");
          
      }else {
         var SearchAPI = "http://10.0.2.2:8081/appJson/lamia/login.php";
                var header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };

                var Data = {
                    name: name,
                    pass: pass
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
                        this.props.navigation.navigate('Landing',{
                            name : response[0].name,
                        });
                        

                        
                    }
                })
                .catch((error) => {
                    console.error(error);
                    
                });
      }
  }

  render(){

    return (
        <LinearGradient
    colors={['#006c38', '#007982']}
    style={{
      flex: 1,
    }}
    >
      <ScrollView keyboardShouldPersistTaps='always'>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
          <View style ={styles.main}>
            <Image source={require('../assets/lamia.png')} style ={styles.image} />
              <View style ={styles.inputContainer}>
                  <TextInput style ={styles.input} 
                  placeholder='Enter Your Name/ Email ID'
                   onChangeText={name => this.setState({name})}
                  
                  />
                  <TextInput style ={styles.input} 
                  placeholder='Enter Your Password' 
                  onChangeText={pass => this.setState({pass})}
                  secureTextEntry={true}
                  
                  />
              </View>

              <TouchableOpacity onPress={this.login}>
                  <View style ={ styles.passContainer}>
                      <Text style ={styles.passText}>Login</Text>
                  </View>
              </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </LinearGradient>
    );
  }

};

const styles = StyleSheet.create({
  main: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        paddingTop: 200,
        justifyContent: 'center'
    },
  image: {
        width:  '63%',
        height:  "30%",
        marginBottom: '12%'
    },
  inputContainer: {
        width: '100%',
        alignItems: 'center'
    },
  input: {
        width: '90%',
        height: 40,
        textAlign: 'center',
        borderBottomColor: '#C4CDD8',
        borderBottomWidth: 2,
        marginBottom: '12%',
        fontSize:  18,
        color: 'white'
    },
  passContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#00FC80',
        borderWidth: 2,
        borderColor: '#00FC80',
        borderRadius: 10,
        marginBottom: '24%' 
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
});

export default Login;