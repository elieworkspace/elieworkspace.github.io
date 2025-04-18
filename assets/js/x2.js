/* Fichier pour donner le resultat d'un cryptage et d'un decryptage */

let keyvalue = "ufhEWKbts#==xy#.]EL'Z!.v}1F7&Mi+%JN}@TIJDH{HZQ@8+6"

function encrypted(decrypted, secretKey) {
    try {
        return CryptoJS.AES.encrypt(decrypted, secretKey).toString();
    } catch (error) {
        console.log(error)
    }

}

function decrypted(encrypt, secretKey) {
    const decrypted = CryptoJS.AES.decrypt(encrypt, secretKey);
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText
}

let listeTexte = [
    "Étude Biblique | A l'étranger",
    "Étude de la Bible et de la philosophie",
]

for (i of listeTexte){
    console.log(i, encrypted(i, keyvalue))
}