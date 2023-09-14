import React,{useState, useEffect} from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { Button, Provider, Dialog, Portal } from "react-native-paper"
import styles from "./styles"
import {eliminarSugerencia} from "../../data/sugerencias"
import { eliminarSugerenciaRedux } from "../../redux/actions/sugerenciasActions"
import {useSelector, useDispatch} from "react-redux"
import CardSugerencia from "../CardSugerencia"
import Toast from 'react-native-toast-message';
import Icons from '@expo/vector-icons/FontAwesome5';
import { AlertTriangle } from 'lucide-react-native';

export default function ModalVerSugerencias({navigation, setModalVerSugerencias, socket}){
    const [sugerencias, setSugerencias] = useState(null);
    const [sugerencia, setSugerencia] = useState(null);
    const sugerenciasRedux = useSelector(state => state.sugerencias.sugerencias);
    const [modalEliminarSugerencia, setModalEliminarSugerencia] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if(sugerenciasRedux !== null){
            setSugerencias(sugerenciasRedux)
        }else{
            setSugerencias(null)
        }
    }, [sugerenciasRedux]) 
    
    

   const handleEliminarSugerencia = () => {
        eliminarSugerencia(sugerencia.id).then( async ()=>{
            dispatch(eliminarSugerenciaRedux(sugerencia));
            await socket.emit("eliminarSugerencia", sugerencia);
            setModalEliminarSugerencia(false);

            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'La sugerencia fue eliminada correctamente',
                visibilityTime: 2000,
            });

        }).catch((err)=>{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'La sugerencia no pudo ser eliminada',
                visibilityTime: 2000,
            }); 
        }) 

    } 

   
    return(
        <View style={styles.containerModalVerSugerencias}>
            <Provider>
            <View style={{height: '13%', width: '100%', flexDirection: 'row'}}>
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', marginRight: '55%', alignItems: 'center'}} onPress={()=>{setModalVerSugerencias(false)}}>
                    <Icons name="chevron-left" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigation.navigate("Home")}}>
                    <Icons name="times" size={20} color='#ffffff'></Icons>
                </TouchableOpacity>
            </View>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Sugerencias</Text>
            </View>
            <View style={styles.sugerencias}>
                <ScrollView style={styles.containerSugerencias}>  
                    {
                        sugerencias !== null ? (
                            sugerencias.map((suge, i)=>{
                                return(
                                    <CardSugerencia key={i} sugerencia={suge} setModalEliminarSugerencia={setModalEliminarSugerencia} setSugerencia={setSugerencia}/>
                                )
                            })
                        ):(
                            <View style={styles.containerNoSugerencias}>
                                <Text style={styles.textoNoSugerencias}>No hay sugerencias.</Text>
                            </View>
                        )
                    }

                </ScrollView>
            </View>
                    <Portal>
                        <Dialog style={{backgroundColor: "white"}} visible={modalEliminarSugerencia} onDismiss={()=>setModalEliminarSugerencia(false)}>
                            <Dialog.Content style={{ flex:1,width: '100%', justifyContent: "center", alignItems: 'center', paddingBottom: '20%', paddingTop: '15%'}}>
                                <View style={{width: '13%',
                                    height: '15%',
                                    padding :'15%',
                                    marginTop: '6%',
                                    justifyContent: "center",
                                    backgroundColor: '#FFC83E',
                                    alignItems: 'center',
                                    borderRadius: 100,}}>
                                    <AlertTriangle size={60} color='#ffffff'></AlertTriangle>
                                </View>   
                            </Dialog.Content>   
                            <Dialog.Content style={styles.containerAlertaCerrarSesion}>
                                <Text style={styles.textoAlertaCerrarSesion}>¿Deseas eliminar esta</Text>
                                <Text style={styles.textoAlertaCerrarSesion}>sugerencia?</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                            <Button style={styles.BotonSi} onPress={handleEliminarSugerencia}><Text style={{color: "#ffffff",}}>Si</Text></Button>
                            <Button style={styles.BotonNo} onPress={()=>setModalEliminarSugerencia(false)} ><Text style={{color: "#0140b1",}}>No</Text></Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
            </Provider>
        </View>
    );
}
