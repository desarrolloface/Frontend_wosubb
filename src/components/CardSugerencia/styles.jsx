import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerCardSugerencia: {
        width: "100%",
        alignItems: "center",
        marginBottom: hp(3),
    },
    cardSugerencia: {
        width: "88%",
        paddingVertical: hp(2),
        paddingHorizontal: wp(3),
        backgroundColor: "#4D79C8",
        //borderWidth: 1,
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 10,
        paddingBottom: hp(2),
    },
    containerSuperior: {
        width: "100%",
        paddingVertical: '3%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textoNombreUsuario: {
        fontSize: wp(4.5),
        fontWeight: "bold",
        color:'#ffffff'
    },
    textoCorreoUsuario: {
        fontSize: wp(4),
        //fontWeight: "bold",
        color:'#ffffff'
    },
    containerTextoSugerencia: {
        width: "100%",
        marginTop: hp(1),
    },
    textoSugerencia: {
        fontSize: wp(3.5),
        color:'#ffffff'
    },
    botonEliminar: {
        backgroundColor: '#ffffff',
        padding: '2%',
        borderRadius: 100,
        marginLeft:'86%',
        top:13,
        zIndex: 7 
    }
});

export default styles