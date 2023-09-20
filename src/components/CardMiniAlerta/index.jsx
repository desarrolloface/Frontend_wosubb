import React,{useState} from "react"
import { View, Text, TouchableOpacity} from 'react-native';
import styles from "./styles"
import IconFA5 from 'react-native-vector-icons/FontAwesome';


export default function CarMinidAlerta({alerta, setVerAlerta, setAlertaSeleccionada, mostrarUsuario, i}){

    const [collapsed, setCollapsed] = useState(null);
    /* console.log(alerta); */
    const initialRegion = ({
        latitude: alerta.latitude,   
        longitude: alerta.longitude,        
        latitudeDelta: 0.001,          
        longitudeDelta: 0.002,          
    }) 
    
    const seleccionarAlerta = () => {
        setVerAlerta(alerta)
        setAlertaSeleccionada(true) 
    }

    const pinTipoAlerta = (alerta) => {
        if(alerta.tipo === "Persona sospechosa"){
            return <IconFA5 name="circle" size={10} color="red"/>
        }
        if(alerta.tipo === "Actividad sospechosa"){
            return <IconFA5 name="circle" size={10} color="#ffc83e"/>
        }
        if(alerta.tipo === "Falla de iluminacion"){
            return <IconFA5 name="circle" size={10} color="#ef893c"/>
        }
        if(alerta.tipo === "Incidente de robo"){
            return <IconFA5 name="circle" size={10} color="green"/>
        }
        if(alerta.tipo === "Incidente de violencia"){
            return <IconFA5 name="circle" size={10} color="#ea75ea"/>
        }else{
            return <IconFA5 name="circle" size={10} color="#75b2ea"/>
        }
        if(alerta.tipo === "Otros"){
            return <IconFA5 name="circle" size={10} color="#75b2ea"/>
        }
}


    return(
        <>  
                
            <View style={{width:'100%', alignItems: "center"} }>   
                    <TouchableOpacity style={{backgroundColor: '#f2f5fb', width:'94%', borderRadius: 17, marginVertical: '1%', alignItems: "center", flexDirection: 'row', paddingVertical: '3.8%'}} onPress={() => {setCollapsed(i === collapsed ? null : i); mostrarUsuario(initialRegion)}}>
                        
                        <View style={{flex: 2, paddingLeft:'5%', marginRight: '5%'}}>
                            <View style={{flex: 2, marginRight: '5%', flexDirection: 'row'}}>
                                <View style={{justifyContent: "center",paddingRight:'5%'}}>
                                    {pinTipoAlerta(alerta)}
                                </View> 
                                <Text style={styles.textoTipo}>{alerta.tipo}</Text>
                            </View>
                            {i === collapsed && (
                                <Text style={styles.descripcion} numberOfLines={2}>{alerta.descripcion}</Text>     
                            )} 
                        </View>
                        <View style={{flex: 0.5, justifyContent: "center"}}>
                            <Text style={styles.textoHora}>{alerta.fecha.slice(11,16)}</Text> 
                                {i === collapsed && (
                                    <TouchableOpacity onPress={seleccionarAlerta}>
                                        <Text style={styles.vermas}>Ver más</Text>
                                    </TouchableOpacity>    
                                )} 
                        </View> 
                                              
                    </TouchableOpacity> 
            </View>
        </>
            
    )
}