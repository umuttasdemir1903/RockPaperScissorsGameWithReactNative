import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useState} from 'react';

//* Data import
import {choices} from './src/data/mockData';

//* Util import
import {COLORS} from './src/util/constant';

const App = () => {
  
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const handleUserChoice = userChoice => {
    setUserChoice(userChoice);
    randomComputerChoice(userChoice);
  };

  const randomComputerChoice = userChoice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];
    setComputerChoice(computerChoice);
    determineWinner(userChoice, computerChoice);
  };

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) {
      setResult('Quits !');
    } else if (
      (user?.name === 'rock' && computer?.name === 'scissors') ||
      (user?.name === 'paper' && computer?.name === 'rock') ||
      (user?.name === 'scissors' && computer?.name === 'paper')
    ) {
      setResult('Congratulations 🥳🤩🌟');
    } else {
      setResult('You lost 😔');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Text style={styles.title}>ROCK PAPER SCİSSORS</Text>
        <Text style={styles.choiceText}>User Choice:</Text>
        <View style={styles.choices}>
          {choices?.map(choice => (
            <TouchableOpacity
              key={`${choice.id}-choice`}
              style={choice.name === userChoice?.name ? [styles.button,styles.activeButton] : styles.button }
              onPress={() => handleUserChoice(choice)}>
              <Image source={choice.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>

        {computerChoice && (
          <>
            <Text style={styles.choiceText}>Computer Choice:</Text>
            <View style={styles.button}>
              <Image source={computerChoice?.image} style={styles.image} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
  },
  choiceText: {
    marginVertical: 20,
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  image: {
    width: 90,
    height: 90,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: COLORS.white,
  },
  activeButton:{
    borderWidth:3,
    borderColor:"purple"
  }
});
