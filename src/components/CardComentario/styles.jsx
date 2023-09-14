import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerComentario: {
        width: wp(96),
        marginTop: hp(2),
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
    },
    containerDatosComentario: {
        width: "85%",
        flexDirection: "column",
    },
    containerUsuario: {
        paddingTop: hp(1),
        width: "100%",
        minHeight: hp(5),
        paddingHorizontal: wp(4),
    },
    usuario: {
        fontSize: wp(4),
    },
    nombreUsuario: {
        fontWeight: "bold",
        fontSize: wp(4.5),
    },  
    datoComentario: {
        fontSize: wp(3.5),
        marginRight: wp(3),
        color: '#4D79C8'
    },
    datolike: {
        fontSize: wp(3.5),
        marginBottom: wp(0.1),
    },
    containerBotonLike:{
        alignItems: "center",
        flexDirection: "row",
    },
});

export default styles