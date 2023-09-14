import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const styles = StyleSheet.create({
    containerAlertas: {
        backgroundColor: "white",   
        width: "100%",
        height: "100%",
        
    },
    alertasPantallaGrand: {
        width: "100%",
        height: hp(82),
        flexGrow: 0,
    },
    alertasPantallaPeque: {
        width: "100%",
        height: hp(79),
    },
    containerAlertasActuales: {
        width: "100%",
    },
    containerNoAlertas: {
        width: "100%",
        marginTop: hp(4.5),
        paddingLeft: wp(5),
    },
    textoNoAlertas: {
        fontSize: wp(6),
    },
    botonPlusPantallaPeque:{
        position: "absolute",
        width: 60,
        height: 60,
        paddingBottom: '2%',
        backgroundColor: '#0140b1',
        paddingTop: hp(1),
        marginBottom: hp(9),
        marginLeft: wp(80),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        elevation: 3,
        bottom: 0
    },
    
})

export default styles;