import { createTheme } from '@mui/material/styles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const GlobalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
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
    },
    selectInput: {
      height: 50,
      width: '100%',
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
    errorText: {
      color: 'red',
      fontSize: 14, 
      marginTop: 4, 
    },
});

export const SelectStyles = {
  control: (base, state) => ({
    ...base,
    height: 50,
    borderColor: state.isFocused ? '#666' : '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    boxShadow: state.isFocused ? '0 1px 3px rgba(0, 0, 0, 0.2)' : 'none',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 8,
    zIndex: 100,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
    color: state.isSelected ? '#000' : '#333',
  }),
};

export const CardStyles = StyleSheet.create({
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
