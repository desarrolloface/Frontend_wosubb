import React,{useState} from 'react'
import { View, Text, TouchableOpacity,} from 'react-native'
import { Button, Switch } from 'react-native-paper'
import styles from './styles'
import { editarNotificaciones } from '../../data/usuarios'
import { guardarUsuarioRedux } from '../../redux/actions/usuarioActions'
import { useSelector, useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from '@expo/vector-icons/FontAwesome5';

export default function ConfiguracionNotificaciones({navigation, setVisibleConfiguracionNotificaciones}){
    const usuarioRedux = useSelector(state => state.usuario.usuario)
    const [notificaciones, setNotificaciones] = useState(usuarioRedux.notificaciones)
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
        }).catch((err) => {
            console.log("error al editar notificaciones");
        }); 
        
    }

    return(
        
        <View style={styles.containerConfiguracionNotificaciones}>
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
            <View style={styles.containerBoton}>
                {
                    usuarioRedux.notificaciones === notificaciones ? <Button style={[styles.botonGuardar, {backgroundColor: "#E5E5E5"}]} mode="contained" onPress={guardarNotificaciones} disabled={true}
                    ><Text style={styles.textoBotonGuardar}>Guardar</Text></Button> : <Button style={styles.botonGuardar} mode="contained" onPress={guardarNotificaciones}
                    ><Text style={styles.textoBotonGuardar}>Guardar</Text></Button>
                }
            </View>
 
        </View> 
    )
}