import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import API from "../services/api"


const CEP = ({ navigation }: any) => {
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUf] = useState("")

    async function buscarCEP()
    {
        var regExp = /[a-zA-Z]/g;
        if(cep == ""){
            Alert.alert("CEP Vazio")
        }
        else if( ( !/[-]/g.test(cep) && cep.length == 9) || ( cep.charAt(5) != "-" && cep.length == 9) || (/[-]/g.test(cep) && cep.length == 8) || cep.length < 8 || cep.length > 9 || regExp.test(cep) || cep.indexOf(' ') >= 0 ){
            Alert.alert("CEP Inválido")
        }

        try{
            const response = await API.get(`${cep}/json/`)
            if(response.data.erro == true)
            {
                Alert.alert("CEP não encontrado")
            }
            setRua(response.data.logradouro)
            setBairro(response.data.bairro)
            setCidade(response.data.localidade)
            setUf(response.data.uf)
        }catch(error){
            console.log("ERRO" + error)
        }
    }

    function limparCampos()
    {
        setCep("")
        setRua("")
        setBairro("")
        setCidade("")
        setUf("")
    }

    return (
        <View style={styles.containerPrincipal}>
            <View style={styles.containerCEP}>
                <TextInput style={styles.inputCEP} value={cep} onChangeText={(texto) => setCep(texto)} placeholder={"Digite seu Cep"} />
                <TouchableOpacity style={styles.buttonBuscar} onPress={buscarCEP} >
                    <Text style={styles.textBuscar } >Buscar</Text>
                </TouchableOpacity>
            </View>
            <TextInput style={styles.inputText} value={rua} onChangeText={(texto) => setRua(texto)} placeholder={"Rua"} />
            <TextInput style={styles.inputText} value={bairro} onChangeText={(texto) => setBairro(texto)} placeholder={"Bairro"} />
            <TextInput style={styles.inputText} value={cidade} onChangeText={(texto) => setCidade(texto)} placeholder={"Cidade"} />
            <TextInput style={styles.inputUF} value={uf} onChangeText={(texto) => setUf(texto)} placeholder={"UF"} />
            <TouchableOpacity style={styles.buttonLimpar} onPress={limparCampos} >
                    <Text style={styles.textBuscar } >Limpar Campos</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CEP

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        flexDirection: "column",
    },
    containerCEP: {
        flexDirection: 'row',
        height: 100,
        marginHorizontal: 20,
    },
    inputCEP: {
        borderColor: "#000000",
        borderWidth: 2,
        width: 200,
        fontSize: 24,
        marginTop: 30,
        marginEnd: 20,
        borderRadius: 10,
        padding: 10,
    },
    buttonBuscar: {
        backgroundColor: "#018786",
        width: 120,
        height: 70,
        marginTop: 30,
        marginEnd: 20,
        borderRadius: 10,
        padding: 20,
    },
    textBuscar: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    inputText: {
        borderColor: "#000000",
        borderWidth: 2,
        padding: 10,
        fontSize: 24,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 20,
    },
    inputUF: {
        borderColor: "#000000",
        borderWidth: 2,
        width: 100,
        padding: 10,
        fontSize: 24,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 20,
    },
    buttonLimpar: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 20,
    },
})