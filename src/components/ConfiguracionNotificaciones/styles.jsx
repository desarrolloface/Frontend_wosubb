import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   containerConfiguracionNotificaciones:{
        width: "100%",
        height: "100%",
        backgroundColor: "#0140b1",
        zIndex: 7,
   },
    contanierNotificaciones: {
        width: "100%",
        height: "100%",
    },
    containterDesactivarNotificaciones: {
        width: "100%",
        marginTop: hp(5),
        paddingLeft: wp(5),
        justifyContent: "space-between",
        flexDirection: "row",
    },
    textoNotificaciones: {
        textAlignVertical: "center",
        color: '#ffffff',
        fontSize: wp(4.2),
    },
    inputActivarNotificaciones: {
        marginRight: wp(8),
    },
    containerBoton: {
        width: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        bottom: hp(10),
    },
    botonGuardar: {
        width: wp(50),
        borderRadius: 13,
        backgroundColor: "#ffffff",
    },
    textoBotonGuardar: {
        fontSize: wp(3.5),
        color: "#0140b1",
    },  
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',   
    }, 
    button:{
      width: "55%",
      height: "27%",
      backgroundColor: '#ffffff',
      alignSelf: "center",
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      marginTop: '10%',
      margin:'1%'
    },
    containerAlertaCerrarSesion: {
        marginTop: hp(1),
        marginBottom: hp(2),
        justifyContent: 'center',
        alignItems: "center",
    },
    textoAlertaCerrarSesion: {
        fontSize: wp(5),
        fontWeight: 'bold'
    },
    BotonSi: {
        paddingHorizontal: '19%',
        paddingVertical: '3%',
        backgroundColor: "#0140b1",
        borderRadius: 15
    },  
});

export default styles;