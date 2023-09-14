import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "#0140b1",
        width: "100%",
        zIndex: 3,
        height: "100%"
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