import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   containerModalVerSugerencias:{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "#0140b1",
        zIndex: 7,
   },
  
   containerTitle: {
        width: "100%",
        //height: "100%",
        marginTop: hp(4.3),
        paddingBottom: hp(1),
        alignItems: "center",
    },
    title: {
        fontSize: wp(5.6),
        color: '#ffffff',
        fontWeight: 'bold'
    },
    sugerencias: {
        width: "100%",
        height: hp(86),
    },
    containerSugerencias: {
        width: "100%",
        marginBottom: hp(15),
        paddingTop: hp(2),
    },
    containerNoSugerencias: {
        width: "100%",
        marginTop: hp(6.5),
        paddingLeft: wp(8),
    },
    textoNoSugerencias: {
        fontSize: wp(4.5),
        color: '#ffffff'
    },
    containerTextoAlerta: {
        alignItems: "center",
        marginTop: hp(2),
    },
    textoAlerta: {
        fontSize: wp(4),
    },
    textoBotonAlerta: {
        color: "#01579b"
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
    BotonNo: {
        paddingHorizontal: '19%',
        paddingVertical: '3%',
        backgroundColor: "#BFCEE6",
        borderRadius: 15
    } 
})

export default styles;