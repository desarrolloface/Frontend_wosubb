import React,{useState} from 'react'
import { View, Text, TouchableOpacity,} from 'react-native'
import { Button, Switch, Dialog, Portal, Provider, } from 'react-native-paper'
import styles from './styles'
import { editarNotificaciones } from '../../data/usuarios'
import { guardarUsuarioRedux } from '../../redux/actions/usuarioActions'
import { useSelector, useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from '@expo/vector-icons/FontAwesome5';
import {Check}  from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';

export default function ConfiguracionNotificaciones({navigation, setVisibleConfiguracionNotificaciones}){
    const usuarioRedux = useSelector(state => state.usuario.usuario)
    const [notificaciones, setNotificaciones] = useState(usuarioRedux.notificaciones)
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch();

    const guardarNotificaciones = async () => {
        const jsonValue = await AsyncStorage.getItem('usuario')
        const datosUsuario = JSON.parse(jsonValue);
        datosUsuario.notificaciones = notificaciones;
       
        const body = {
            id: usuarioRedux.id,
            notificaciones: notificaciones
        }

        try {
            await AsyncStorage.setItem('usuario', JSON.stringify(datosUsuario))
        }catch (e) {
            console.log("error al guardar notificaciones");
        } 

        editarNotificaciones(body).then(async () => {
           dispatch(guardarUsuarioRedux(datosUsuario));
           setModal(true);
        }).catch((err) => {
            console.log("error al editar notificaciones");
        }); 
        
    }

    return(
        
        <View style={styles.containerConfiguracionNotificaciones}>
            <Provider >
            <View style={{height: '13%', width: '100%', flexDirection: 'row'}}>
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', marginRight: '55%', alignItems: 'center'}} onPress={()=>{setVisibleConfiguracionNotificaciones(false)}}>
                    <Icons name="chevron-left" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigation.navigate("Home")}}>
                    <Icons name="times" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
            </View> 
            <View style={{height: '10%', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <Text style={{fontSize: 23, fontWeight: 'bold',color: '#ffffff'}}>Notificaciones</Text>
            </View>
            <View style={styles.contanierNotificaciones}>
                <View style={styles.containterDesactivarNotificaciones}>
                    <Text style={styles.textoNotificaciones}>Estado de notificaciones</Text>
                    <Switch color='#ffffff' style={styles.inputActivarNotificaciones} value={notificaciones} onValueChange={()=> {notificaciones ? setNotificaciones(false):setNotificaciones(true)}}/>
                </View>
                
            </View>
            {
                usuarioRedux.notificaciones !== notificaciones ? <Animatable.View animation='fadeInDown' style={styles.containerBoton}>
                
                <Button style={styles.botonGuardar} mode="contained" onPress={guardarNotificaciones}>
                    <Text style={styles.textoBotonGuardar}>Guardar</Text>
                </Button>  
                
                
                </Animatable.View>
                :(null)
            }
            
            
            <Portal>
                <Dialog style={{backgroundColor: "white"}} visible={modal} onDismiss={()=>{setVisibleConfiguracionNotificaciones(false)}}>
                    <Dialog.Content style={{ flex:1,width: '100%', justifyContent: "center", alignItems: 'center', paddingBottom: '20%', paddingTop: '15%'}}>
                        <View style={{width: '13%',
                            height: '15%',
                            padding :'15%',
                            marginTop: '6%',
                            justifyContent: "center",
                            backgroundColor: '#5FC14D',
                            alignItems: 'center',
                            borderRadius: 100,}}>
                            <Check size={40} color='#ffffff'></Check>
                        </View>   
                        </Dialog.Content>   
                        <Dialog.Content style={styles.containerAlertaCerrarSesion}>
                            <Text style={styles.textoAlertaCerrarSesion}>¡Los cambios se han</Text>
                            <Text style={styles.textoAlertaCerrarSesion}>realizado con éxito!</Text>
                        </Dialog.Content>
                        <Dialog.Actions style={{justifyContent: 'center', alignItems:'center'}}>
                        <Button style={styles.BotonSi} onPress={()=>{setVisibleConfiguracionNotificaciones(false)}}><Text style={{color: "#ffffff",}}>OK</Text></Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Provider> 
        </View> 
    )
}