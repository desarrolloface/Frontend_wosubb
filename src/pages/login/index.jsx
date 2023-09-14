import React,{useState,useEffect} from 'react';
import styles from "./styles";
import { View, Text, Keyboard, TouchableOpacity, BackHandler, TextInput, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { verificacionUsuario} from '../../data/usuarios';
import logo from '../../assets/logosimbologia.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PortadaAfterLogin from '../portadaAfterLogin';
import Toast  from 'react-native-toast-message';
import {validacionesLogin} from '../../utils/validaciones';
import { Formik } from "formik";
import Icons from '@expo/vector-icons/FontAwesome5';

export default function Login({navigation}) {
  const [portadaAfterLogin, setPortadaAfterLogin] = useState(false);
  const [verContraseña, setVerContraseña] = useState(false);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    ); 

    return () => {
        backHandler.remove(); 
    };

  }, []);


  const initialValues = {
    correo: "",
    contrasena: "",
  }

  const guardarDatosUsuario = async (usuario) => {
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (e) {
      console.log("error al guardar datos");
    } 
  }


  return (
    <>
      {portadaAfterLogin ? <PortadaAfterLogin navigation={navigation} setPortadaAfterLogin={setPortadaAfterLogin}/> : null}
      
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text1}>WOS</Text>
          <Image style={styles.imegen} source={logo}></Image>
          <Text style={styles.text1}>BB</Text>
        </View>
        <Animatable.View animation='fadeInUpBig'  style = {styles.container1}>
          
            <Formik
                      initialValues={initialValues}
                      validationSchema={validacionesLogin}
                      onSubmit={(values) => {
                        Keyboard.dismiss();
                        verificacionUsuario(values).then((res)=>{
                          guardarDatosUsuario(res.usuario)
                            values.correo = "";
                            values.contrasena = "";
                            setPortadaAfterLogin(true);
                        }).catch((err)=>{
                            if(err.response.status === 401){
                              Toast.show({
                                type: 'error',
                                text1: 'El correo ingresado no pertenece a la universidad',
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 60,
                              
                              });
                            }else{
                              if(err.response.status === 404){
                                /* console.log(values.correo)
                                console.log(values.contrasena) */
                                Toast.show({
                                  type: 'error',
                                  text1: 'El correo ingresado no tiene una cuenta asociada',
                                  visibilityTime: 3000,
                                  autoHide: true,
                                  topOffset: 60,
                                
                                });
                              }else{
                                if(err.response.status === 400){
                                  Toast.show({
                                    type: 'error',
                                    text1: 'Error',
                                    text2: 'La contraseña ingresada es incorrecta',
                                    visibilityTime: 3000,
                                    autoHide: true,
                                    topOffset: 60,
                                  
                                  });
                                }
                              }
                          }
                        })
                        
                      }}
            >
              {({ handleChange, handleSubmit, values, touched, errors, handleBlur}) => (
                <>
                      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" > 
                      {/* titulo */}
                      <View style={styles.title}>
                        <Text style={styles.textTitle}>Bienvenido/a</Text>
                      </View>
                      
                      {/* inputs */}
                      <View style={{flex:1.2, paddingBottom: '4%', paddingTop: '8%'}}>
                        <TextInput 
                                  //mode='outlined'
                                  onBlur={handleBlur('correo')}
                                  //outlineColor="#E5E5E5" activeOutlineColor="gray"
                                  onChangeText={handleChange('correo')}
                                  value={values.correo}
                                  placeholder='Correo'
                                  style={styles.textInput}>
                        </TextInput>
                        {errors.correo && touched.correo ? 
                              (
                                  <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.correo}</Text>
                                  </View>
                              ):(null)
                        }
                        <View style={styles.textInput}> 
                          <TextInput 
                              style={{flex: 3, color:'black'}}
                              //mode="outlined"
                              onBlur={handleBlur('contrasena')}
                              //outlineColor="#E5E5E5" activeOutlineColor="gray"
                              value={values.contrasena}
                              placeholder="Contraseña"
                              onChangeText={handleChange('contrasena')}
                              //textContentType='number'
                              //right={<TextInput.Icon icon="eye" onPress={()=>{setVerContraseña(!verContraseña)}}/>}
                              secureTextEntry={!verContraseña} 
                              >
                          </TextInput>
                          <TouchableOpacity style={{flex: 0.5, justifyContent: 'center'}} onPress={()=>{setVerContraseña(!verContraseña)}}>
                            <Icons name="eye" size={20} color='#7f9fd7'></Icons>
                          </TouchableOpacity>
                        </View>
                        {errors.contrasena && touched.contrasena ? 
                              (
                                  <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.contrasena}</Text>
                                  </View>
                              ):(null)
                        }
                      </View>
                      <View style={{flex:1, marginTop: '1%', paddingBottom: '1%'}}>
                        <TouchableOpacity style={{alignItems: "center"}} onPress={()=>{Keyboard.dismiss(),navigation.navigate("RecuperarContraseña")}}>
                          <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems: "center"}} onPress={()=>{Keyboard.dismiss(),navigation.navigate("Registro")}}>
                          <Text style={styles.text}>¿No tienes cuenta? ¡Regístrate aquí!</Text>
                        </TouchableOpacity>
                      </View>
                      
                      {/* boton */}
                      <View style={{flex:5,marginTop: '5%'}}>
                      <TouchableOpacity style={styles.button } onPress={handleSubmit}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Iniciar sesión</Text>
                      </TouchableOpacity>
                    </View>
                    </KeyboardAwareScrollView>
                    
                </>
              )}
            </Formik>           
          </Animatable.View>
        
      </View>
      
    </>
  );
}



