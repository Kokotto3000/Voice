"use strict";

document.addEventListener("DOMContentLoaded", main);

function main(){
    //récupération des éléments HTML
    const BUTTON= document.querySelector("button");
    const CONTENT= document.querySelector(".content");

    const greetings= ["bien bien bien, et toi ?", "qu'est-ce que ça peut te faire !", "Oh c'est tellement gentil de penser à moi !!! Merci !!!"];

    //API expérimentale, ne marche pas avec tous les navigateurs... Chrome et android uniquement...
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    //ne marche pas avec Firefox... trouver solution pour envoyer un  jolie message d'erreur si le navigateur ne fonctionne pas avec un . then .catch ...
    //console.log(recognition);
    //SpeechRecognition {grammars: SpeechGrammarList, lang: "", continuous: false, interimResults: false, maxAlternatives: 1, …}
    //recognition.interimResults= true; uniquement pour écrire sinon l'ordi s'entend et se répond tout seul... (peut-être drôle cela dit :)))

    //ajout des fonctions
    /*recognition.onstart= ()=>{
        //console.log("Voice is activated, you can talk !");
    };*/

    recognition.onresult= (e)=>{
        //quand on arrête de parler, il comprend qu'on a fini et envoie le résultat
        //console.log(e);
        /*results: SpeechRecognitionResultList
            0: SpeechRecognitionResult
                0: SpeechRecognitionAlternative
                    confidence: 0.9385558366775513
                    transcript: "c'est nul tu m'entends pas"*/
        const current= e.resultIndex;
        const transcript= e.results[current][0].transcript;
        //retranscrit ce qu'on dit sur l'écran
        CONTENT.textContent= transcript;
        read(transcript);
    }

    //liaison avec event, quand on appuie sur le bouton active le micro
    BUTTON.addEventListener("click", ()=>{
        //lance le processus de reconnaissance
        recognition.start();
    });

    //ajout de la lecture (pareil pour chrome... expérimental)
    function read(message){
        const speech= new SpeechSynthesisUtterance();
        //console.log(speech);
        
        //ajout des conditions
        if(message.includes("ça va") || message.includes("comment ça va") || message.includes("ça roule") || message.includes("comment ça se passe")){
            //random sur les réponses
            const finalSpeech= greetings[Math.floor(Math.random()*greetings.length)];
            speech.text= finalSpeech;
        }else{
            speech.text= "Je n'ai pas compris...";
        }

        //ajout des propriétés
        speech.volume= 1;
        //vitesse
        speech.rate= 1;
        //ton plus ou moins élevé
        speech.pitch= 1;
        //il existe une liste de voix liées au navigateur pour chaque langue, mais je n'arrive pas encore à les changer (pauvre pioupiou, je crois qu'il va finir avec une voix de hortense)... voir notes sur synth.getVoices()

        window.speechSynthesis.speak(speech);
    }

}