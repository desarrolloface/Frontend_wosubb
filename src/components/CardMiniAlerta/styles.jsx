import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    
    textoTipo:{
        fontSize: wp(3.5),
        //marginTop: hp(3),
        fontWeight: 'bold'
    },
    textoHora: {
        fontSize: wp(3),
        fontWeight: 'bold'
    },
    descripcion: {
        fontSize: wp(3),
        marginLeft: wp(5.5),
        marginTop: hp(1),
        marginBottom: hp(1),
    },
    vermas: {
        fontWeight: 'bold',
        fontSize: wp(3),
        marginTop: hp(1),
        marginBottom: hp(1),

    }
})

export default styles;