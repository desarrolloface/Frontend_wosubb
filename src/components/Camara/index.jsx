import React, {useRef, useState } from 'react'
import {View, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from './styles';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/AntDesign';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from '@expo/vector-icons/FontAwesome5';
import { Circle } from 'lucide-react-native';




export default function Camara({setVisibleCamara, setImagen}){
    const [type, _] = useState(Camera.Constants.Type.back);
    const [foto, setFoto] = useState(null);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const camaraRef = useRef(null);
    const [cargando, setCargando] = useState(false);
    const dimensionesPantalla = Dimensions.get("window");
    const height = Math.round((dimensionesPantalla.width * 16) / 9);
 
    
     const TomarFoto = async () => {
        //setCargando(true);
        if(camaraRef){
            await camaraRef.current.takePictureAsync().then((result) => {
                setFoto(result.uri)
            }).catch((err) => {
               console.log(err); 
            });
        }
     };

   /*   useEffect(() => {
        if(foto !== null){
            setCargando(false);
        }
     }, [foto]); */



     const guardarImagen = () => {
        setVisibleCamara(false);
        setImagen(foto);
     };

     const Imagen = () => {
        return (
            <>
                <View style={styles.containerImagen}>
                    <Image source={{uri: foto}} style={[styles.camera ,{height: "100%"}]}/>
                </View>
                <View style={styles.containerBotonesFotoTomada}>
                    <TouchableOpacity style={styles.botonFotoTomada} onPress={()=>{setFoto(null)}}>
                        <IconMC
                            name='reload'
                            color='white'
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botonFotoTomada} onPress={guardarImagen}>
                        <Icon
                            name='check'
                            color='white'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </>
           
        )
     }

     const Camara = () => {
        return (
            <>  
                <View style={styles.containerBotonesCamara}>
                    <View>
                        <TouchableOpacity style={styles.botonMenu} onPress={()=>{setVisibleCamara(false)}}>
                            <Icons 
                                name='chevron-left'
                                color='black' 
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                    
                    {/* <View>
                        <TouchableOpacity style={{top: '60%'}} 
                        onPress={()=> 
                            setFlash(flash === Camera.Constants.FlashMode.off 
                            ? Camera.Constants.FlashMode.on
                            : Camera.Constants.FlashMode.off)}>

                            <IconMC 
                                name='flash'
                                color={flash === Camera.Constants.FlashMode.off
                                ? "gray" 
                                : "white"}
                                size={35}
                            />
                                        
                        </TouchableOpacity>
                    </View> */}
                </View>

                <Camera style={[styles.camera ,{height: height }]} type={type}
                ref={camaraRef} flashMode={flash}
                ratio='16:9'
                />        
                
                <View style={styles.containerBotonSacarFoto}>
                    <TouchableOpacity style={styles.botonSacarFoto} onPress={TomarFoto}>
                        <Circle size={75} color="black"/>
                        
                    </TouchableOpacity>
                </View>
            </>    
        )
     }

    return(
        <View style={styles.containerCamara}>
           {!foto ? <Camara/> :
            <Imagen />}
        </View>

    )
}