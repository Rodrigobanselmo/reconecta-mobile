import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import styled from "styled-components/native";
import Toast from 'react-native-toast-message';
import { Button } from '../../components/Form/Button';
import {CheckEmailExists,CreateEmail,RecoveryPass,SignInEmail,LogOut} from '../../services/firebaseAuth'
import { useSelector, useDispatch } from 'react-redux';


const SafeContainer = styled.SafeAreaView`
  flex: 1;
  padding-top: ${({theme})=>theme.statusHeight}px;
  padding-bottom: 20px;
`;
const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 0 18px;
`;

export default function Splash({navigation}) {

  function handleContinue() {
    navigation.navigate('Auth')
  }
  const user = useSelector(state => state.user);
  console.log('userw',user)
  const dispatch = useDispatch();
  //         onPress={}

  function name() {
    LogOut(()=>dispatch({type: 'LOGOUT_USER'}))
    dispatch({type: 'LOGOUT_USER'})
  }

  return (
    <SafeContainer >
      { user &&
        <Container>
          <Text>Oi</Text>
          <Button
            text='LOGOUT'
            onPress={name}
            />
        </Container>
      }
    </SafeContainer>
  )
}
