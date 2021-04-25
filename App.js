//importing components from respective libraries
import  * as React from 'react';
import {Component}  from 'react';
import {View, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Header from './components/Header';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            text: '',
            definition: '',
            lexicalCategory: '',
            isSearchPressed: false
        }
    }

    //creating the function to get the word by using the API link
    getWord =(word)=> {
        var searchKeyWord = word.toLowerCase();
        var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyWord+".json"    
        
        return fetch(url)
        .then((data)=> {
            if (data.status === 200) {
                return data.json()
            } else {
                return null
            }
        })
        .then ((response)=> {
            var responseObject = response;

            if (responseObject) {
                var wordData = responseObject.definitions[0]

                var definition = wordData.description;
                var lexicalCategory = wordData.wordtype
                console.log(definition)
                console.log(wordData)

                this.setState({
                    "word": this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexicalCategory
                })
            } else {
                this.setState({
                    "word": this.state.text,
                    "definition": "Not found",
                    "lexicalCategory": "Not found   "
                })
            }


        })
    }

    render() {
        return (
            <View>

            <Header text = "DICTIONARY"/>

              <View style = {{fontSize: 20}}>
              <Text>
                {this.state.isSearchPressed && this.state.word == "Loading"
                ?this.state.word
                :""
                }
              </Text>
              <Text>
              {this.state.word !== "Loading"}
              </Text>
              </View>

              <View>
              
              </View>

                <TextInput style={styles.inputBox} onChangeText={text => {
                    this.setState({
                        text: text,
                        isSearchPressed: false,
                        word: "Loading...",
                        lexicalCatagory: '',
                        examples: [],
                        defination: ""
                    });
                }}
                value={this.state.text}
                />

                <TouchableOpacity  style = {styles.button}onPress={()=> {
                    this.setState({isSearchPressed: true})
                    this.getWord(this.state.text)
                }}>
                <Text>Search</Text>
                </TouchableOpacity>

                
            <View>
            <Text style={{color: "green", fontWeight: 'bold', fontSize: 20}}>
                Word: {" "}
            </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {this.state.word}
            </Text>
            </View>

            <View>
            <Text style={{color: "aqua", fontWeight: 'bold', fontSize: 20}}>
                Type: {" "}
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {this.state.lexicalCategory}
            </Text>
            </View>


            <View>
                <Text style={{color: "red", fontWeight: 'bold', fontSize: 20}}>
                        Definition: {" "}
                    </Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        {this.state.definition}
                </Text>
            </View>


        </View>


     
        );
    }
}


const styles = StyleSheet.create({

    totalStyle: {

    },

    button : {
      borderWidth: 3,
      marginTop: 30, 
      width: 100,
      height: 40,
      marginLeft: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
      borderRadius: 30
    },
    container: {
        flex: 1
    },

    InputBoxContainer: {
        flex: 0.3,
        alignItems: "center",
        justifyContent: "center"
    },

    inputBox: {
        width: "80%",
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderWidth: 4,
        borderRadius: 50,
        marginTop: 40
    }
})