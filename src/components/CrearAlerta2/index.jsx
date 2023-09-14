import React,{useState} from "react"
import { View, Text, TouchableOpacity, TextInput} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFA5 from 'react-native-vector-icons/FontAwesome';
import styles from "./styles"
import Modal from "../ModalLugar";
import Mapa from "../mapaLugar";


export default function CrearAlerta2({handlePressButtons, navigation ,setIsVisibleAlertas2, Ubicacioncoord, setUbicacioncoord, ubicacion, setUbicacion, descripcion_ubicacion, setdescripcion_ubicacion}){

    const [isModalOpen, setisModalOpen] = useState(false);
    const [isMapaOpen, setisMapaOpen] = useState(false);
    
    return( 

        <>
           {
            isModalOpen ? 
            <Modal
            setisModalOpen={setisModalOpen}
            setisMapaOpen={setisMapaOpen} 
            setUbicacion={setUbicacion} 
            coordenadasAlerta={Ubicacioncoord}  
            setCoordenadasAlerta={setUbicacioncoord} 
            >
            </Modal>
           :(null)
           }

            {
            isMapaOpen ? 
            <Mapa  
            setisMapaOpen={setisMapaOpen}   
            coordenadasAlerta={Ubicacioncoord}         
            setCoordenadasAlerta={setUbicacioncoord}
            ubicacion={ubicacion}
            setUbicacion={setUbicacion} 
            navigation={navigation}
            />
            :(null)
            }

            <View style={styles.containerModal}>
                    <View style={{height: '13%', width: '100%', flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', marginRight: '55%', alignItems: 'center'}} onPress={()=>{setIsVisibleAlertas2(false)}}>
                            <Icon name="chevron-left" size={18} color='black'></Icon>
                        </TouchableOpacity>
                
                        <TouchableOpacity style={{flex:1, width: '100%', marginTop:'10%', justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigation.navigate("Home")}}>
                            <Icon name="times" size={20} color='black'></Icon>
                        </TouchableOpacity>
                    </View>
                        <View style={{alignItems: 'center', width: '100%', paddingTop: "2%"}}>
                            <Text style={{fontSize: 23, fontWeight: 'bold',color: 'black'}}>Crear Alertas</Text>
                            <Text style={{fontSize: 20,color: 'black'}}>Paso 2 de 3</Text>
                        </View>
                        
                        <View  style={styles.containerBotonesAlerta}>
                            <View style={{flex:2}}>
                                <Text style={styles.textAlertas}>¿Dónde estás?</Text>
                                <TouchableOpacity style={styles.textInput} onPress={()=>setisModalOpen(true)}> 
                                        <Text style={styles.text}>{ubicacion}</Text>
                                        <View style={{justifyContent: "center",paddingRight:'5%'}}><Icon name="chevron-down" size={15} color="black"></Icon></View>
                                </TouchableOpacity>
  
                                <View style={{flexDirection:'row',marginTop: '5%', marginBottom: '2%'}}>
                                    <Text style={{fontWeight: 'bold', marginLeft: '10%'}}>Detalla tu ubicación </Text><Text style={{fontWeight: 'bold', color: 'grey'}}>(No obligatorio)</Text> 
                                </View>
                                <View style={styles.textInput2}>
                                        <TextInput                                            
                                            value={descripcion_ubicacion}
                                            placeholder='Estoy en...'
                                            multiline={true} 
                                            onChangeText={(text)=> setdescripcion_ubicacion(text)}
                                            style={{paddingVertical:'2%', width:'100%', height:'100%'}}>
                                            
                                        </TextInput>   
                                </View> 
                            </View>
                            <View style={{ flex: 1.5, padding:'2%'}}>
                                <TouchableOpacity style={styles.button} onPress={()=>{handlePressButtons("Crear3")}}>
                                    <Text style={{color: 'white', fontWeight: 'bold'}}>Siguiente</Text>
                                </TouchableOpacity>
                                <View style={{flex:3, flexDirection:'row', justifyContent: 'center',}}>
                                  <View style={{margin:'2%'}}><IconFA5 name="circle" size={10} color="#BFCEE7"/></View>
                                  <View style={{margin:'2%'}}><IconFA5 name="circle" size={10} color="#0140b1"/></View>
                                  <View style={{margin:'2%'}}><IconFA5 name="circle" size={10} color="#BFCEE7"/></View>
                                </View>
                            </View>
                        </View>         
            </View>
        </>
        
    )
}

