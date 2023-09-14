import React, {useState} from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

export default function ModalSelectAlerta({setisModalOpen,tiempo, guardarDatos}) {
    
    const horasAM = ['0','01','02','03','04','05','06','07','08','09','10','11','00']; 
    const horasPM = ['12','13','14','15','16','17','18','19','20','21','22','23','24'];
    const [conth, setCont] = useState(1);
    const [contM, setContM] = useState(0);
    const [zh, setZH] = useState(false);
    const [cont, setCon] = useState(0)
    
    const setHora =()=>{
        let AMPM = ""
        let hora = ""
        let minutos = ""
        setCon(cont + 1)
        zh ? (AMPM="AM"):(AMPM="PM")

        AMPM === "AM" ? (hora=horasAM[conth] )
        :(hora=horasPM[conth])

        contM < 10 ? (minutos="0" + contM.toString())
        :(minutos=contM.toString())

        let horaf=(hora+":"+minutos+":"+"00")
        
        guardarDatos(horaf, tiempo) 
        
    }
    
    return (
    <>   
        
        <Modal transparent={true} animationType='fade'>
        <View style={modalContainerStyle.modalContainer}> 
        <TouchableOpacity style={{width:'100%', height:'100%'}} onPress={()=>{setisModalOpen(!setisModalOpen)}}></TouchableOpacity>
            <Animatable.View animation='fadeInUpBig' style={modalContainerStyle.modalStyle}>
                
                <View style={modalContainerStyle.rows}>
                        <View style={{height:'100%', justifyContent:'center', alignItems:'center', marginRight:'10%'}}>
                            {/* HORA */}
                            <TouchableOpacity style={{flex:0.2, width:50, alignItems:'center'}} onPress={() => 
                                {
                                    conth === 1 ? (setCont(12))
                                    :(setCont(conth-1))
                                }
                            }>
                                <ChevronUp size={28} color="#0140b1"></ChevronUp>
                            </TouchableOpacity>
                            <Text style={{fontWeight:'bold'}}>{conth}</Text>
                            <TouchableOpacity style={{flex:0.2, width:50, alignItems:'center', justifyContent:'flex-end'}} onPress={() => 
                                {
                                    conth === 12 ? (setCont(1))
                                    :(setCont(conth+1))
                                }
                            }>
                                <ChevronDown size={28} color="#0140b1"></ChevronDown>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:'100%', justifyContent:'center', alignItems:'center', marginRight:'10%'}}><Text style={{fontWeight:'bold'}}>:</Text></View>
                        <View style={{height:'100%', justifyContent:'center', alignItems:'center', marginRight:'20%'}}>
                            {/* MINUTOS */}
                            <TouchableOpacity style={{flex:0.2, width:50,alignItems:'center'}} onPress={() => 
                                {
                                    contM === 0 ? (setContM(59))
                                    :(setContM(contM-1))
                                }
                            }>
                                <ChevronUp size={28} color="#0140b1"></ChevronUp>
                            </TouchableOpacity>
                            <Text style={{fontWeight:'bold'}}>{contM}</Text>
                            <TouchableOpacity style={{flex:0.2, width:50,alignItems:'center', justifyContent:'flex-end'}} onPress={() => 
                                {
                                    contM ===59 ? (setContM(0))
                                    :(setContM(contM+1))
                                }
                            }>
                                <ChevronDown size={28} color="#0140b1"></ChevronDown>
                            </TouchableOpacity>
                            
                            
                        </View>

                        <View style={{height:'100%', justifyContent:'center', alignItems:'center',alignItems:'center'}}>
                            {/* AM/PM */}
                            <TouchableOpacity style={{flex:0.2, width:50, alignItems:'center'}} onPress={() => {setZH(!zh)}
                            }>
                                <ChevronUp size={28} color="#0140b1"></ChevronUp>
                            </TouchableOpacity>
                            <Text>{
                                    zh ? (<Text style={{fontWeight:'bold'}}>AM</Text>):(<Text style={{fontWeight:'bold'}}>PM</Text>)
                                }</Text>
                            <TouchableOpacity style={{flex:0.2, width:50, alignItems:'center', justifyContent:'flex-end'}} onPress={() => {setZH(!zh)}
                            }>
                                <ChevronDown size={28} color="#0140b1"></ChevronDown>
                            </TouchableOpacity>
                            
                            
                        </View>
                </View>

                <View style={modalContainerStyle.contBotn}>

                        <TouchableOpacity style={modalContainerStyle.button} onPress={setHora}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalContainerStyle.buttonC} onPress={()=>{setisModalOpen(!setisModalOpen)}}
                        >
                            <Text style={{color: '#1C405F', fontWeight: 'bold'}}>Cancelar</Text>
                        </TouchableOpacity> 
                    
                </View>
            </Animatable.View>
        </View>
        </Modal>
    </>
    )
}

const modalContainerStyle = StyleSheet.create({
    modalContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(128,138,146, 0.70)'
    },
    modalStyle:{
        width: '100%',
        height: '40%',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }, 
    rows:{
        flex:1,
        width: '88%', 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    contBotn:{
        flex:0.3,
        width: '80%',
        flexDirection: 'row',        
    },
    button:{
        width: '40%',
        height: 50,
        backgroundColor: '#0140b1',
        marginHorizontal: '5%',
        alignSelf: "center",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        bottom: '5%'
      },
      buttonC:{
        width: '40%',
        height: 50,
        backgroundColor: '#BFCEE6',
        marginHorizontal: '5%',
        alignSelf: "center",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        bottom: '5%'
      },
});