import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import IconAD from "react-native-vector-icons/AntDesign";
import styles from "./styles";

export default function CardSugerencia({sugerencia,setModalEliminarSugerencia,setSugerencia}){
    
    const handleDeleteSugerencia = () => {
        setSugerencia(sugerencia)
        setModalEliminarSugerencia(true)
    }

    return(
        <View style={styles.containerCardSugerencia}>
            <TouchableOpacity style={styles.botonEliminar} onPress={handleDeleteSugerencia}>
                <IconAD name="close" size={15} color="black" />
            </TouchableOpacity>
            <View style={styles.cardSugerencia}>         
                <View style={styles.containerSuperior}>
                    <View >
                        <Text style={styles.textoNombreUsuario}>
                            {sugerencia.usuario.nombre} {sugerencia.usuario.apellido}
                        </Text> 
                        <Text style={styles.textoCorreoUsuario}>{sugerencia.usuario.correo}</Text>
                    </View>
                    
                </View>
                <View style={styles.containerTextoSugerencia}>
                    <Text style={styles.textoSugerencia}>{sugerencia.sugerencia}</Text>
                </View>

            </View>
        </View> 
    )
}
