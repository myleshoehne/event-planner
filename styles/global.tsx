import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const GlobalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textInput: {
      width: '90%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontSize: 16,
      backgroundColor: '#fff',
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      margin: 5
    },
    selectInput: {
      height: 50,
      width: '90%',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: '#fff',
      fontSize: 16,
      justifyContent: 'center',
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    button: {
      width: '90%',
      height: 50,
      backgroundColor: '#FF6F20', 
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      margin: 5
    },
    smallButton: {
      width: '20%',
      height: 50,
      backgroundColor: '#FF6F20',  
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      margin: 5
    },
    buttonText: {
      color: '#fff',  // White text for contrast
      fontSize: 16,
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      fontSize: 14, 
      marginTop: 4, 
    },
    displayText: {
      color: '#333',  
      fontSize: 16,   
      fontWeight: 'normal', 
      marginVertical: 5,  
      lineHeight: 20,  
      textAlign: 'center',
    },
});

export const SelectStyles = {
  control: (base, state) => ({
    ...base,
    width: '100%',
    height: 50,
    borderColor: state.isFocused ? '#666' : '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    position: 'relative',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 8,
    margin: 5
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
    color: state.isSelected ? '#000' : '#333'
  }),
};

export const CardStyles = StyleSheet.create({
  container: {
    width: '90%',
    height: '55%',
    padding: 20,
    backgroundColor: '#f9f9f9', // Slightly lighter background for the container
    borderRadius: 12, // Rounded corners for a softer appearance
    shadowColor: '#000', // Shadow for popping out effect
    shadowOffset: { width: 0, height: 5 }, // Offset to make it look like it's elevated
    shadowOpacity: 0.3, // Slight opacity for depth
    shadowRadius: 6, // Spread of the shadow
    elevation: 4, // Elevation on Android
    margin: 16, 
    marginBottom: 40,// Adds spacing around the container
    borderColor: '#ddd', // Optional border to define the edges
    borderWidth: 1,
  },
  box: {
    width: '100%' as ViewStyle['width'],
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
    flexDirection: 'column' as ViewStyle['flexDirection'],
    justifyContent: 'center' as ViewStyle['justifyContent'],
    alignItems: 'flex-start' as ViewStyle['alignItems'],
    zIndex: 1
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    marginBottom: 8,
    color: '#333',
  },
  eventDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  eventType: {
    fontSize: 16,
    color: '#333',
  },
});

export const ScrollViewStyles = StyleSheet.create({
  scrollContainer: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexGrow: 1,
  }
});
