import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Keyboard, Modal, UIManager, LayoutAnimation, Platform, StyleSheet } from 'react-native';
import styled, {css} from "styled-components/native";
import Toast from 'react-native-toast-message';
import { Button } from '../../components/Form/Button';
import {CheckEmailExists,CreateEmail,RecoveryPass,SignInEmail,LogOut} from '../../services/firebaseAuth'
import { useSelector, useDispatch } from 'react-redux';
import Week from '../../components/Calendar/week';
import Month from '../../components/Calendar/month';
import useCalendar from '../../hooks/useCalendar'
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header } from '../../components/Main/Header';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

export const HandleButton = styled.TouchableOpacity`
	align-self: center;
  border-radius:5px;
  padding:20px;
  padding-top: ${RFValue(5)}px;
  padding-bottom: ${RFValue(5)}px;
`;

export const HandleView = styled.View`
	align-self: center;
  height:${RFValue(6)}px;
  width:45px;
  margin-top: ${RFValue(5)}px;
  border-radius:5px;
  background-color: ${({ theme }) => theme.colors.background.line};
`;

const IconButton = styled(BorderlessButton)`
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(26)}px;
  color: ${({ theme }) => theme.colors.text.light};
  opacity:0.8;
`;
export const HeaderText = styled.Text`
	font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text.light};
  opacity:0.5;
  padding-left:20px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const TodayButton = styled.TouchableOpacity`
  flex-direction:row;
	align-items: center;
  flex:1;
  justify-content:flex-end;
  padding-right:10px;
`;

export const TodayText = styled.Text`
	font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text.light};
  opacity:0.5;
  padding-right:10px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
export const TodayIcon = styled(Feather)`
	font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text.light};
  opacity:0.8;
`;


const BottomView = styled.View`
  flex:1;
  /* background-color: #fff; */
  background-color: ${({ theme }) => theme.colors.background.paper};
  margin-top:${RFValue(-30)}px;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
`;


const SafeContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: ${({theme})=>theme.statusHeight}px;
  padding-bottom: ${({theme})=>theme.bottomHeight}px;
`;
const Container = styled(LinearGradient)`
  padding-top: ${({theme})=>theme.statusHeight}px;
  /* flex: 1; */
  padding-bottom:${RFValue(45)}px;
  ${props => props.swipe && css`
    /* height: ${RFValue(450)}px; */
  `}
  /* padding: 0 18px; */
`;
export const HeaderView = styled.View`
	width: 100%;
	align-items: center;
	/* justify-content: center; */
	flex-direction:row;
  padding: ${RFValue(5)}px ${RFValue(7)}px ${RFValue(15)}px ${RFValue(7)}px;
  
  /* padding: ${RFValue(5)}px ${RFValue(7)}px ${RFValue(10)}px ${RFValue(7)}px;
  margin-bottom:${RFValue(10)}px;
  border-bottom-color:#ffffff33;
  border-bottom-width:1px; */

`;

export default function Splash({navigation}) {

  const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getTodayMonth, getNextMonth, getPrevMonth } = useCalendar();
  const [selected, setSelected] = React.useState(todayFormatted)
  const [swipe, setSwipe] = React.useState(false)
  const monthRef = React.useRef(null)

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function handleContinue() {
    navigation.navigate('Auth')
  }
  const user = useSelector(state => state.user);
  // console.log('userw',user)
  const dispatch = useDispatch();
  //         onPress={}

  function name() {
    LogOut(()=>dispatch({type: 'LOGOUT_USER'}))
    dispatch({type: 'LOGOUT_USER'})
  }

  function handleTodayButton() {
    getTodayMonth()
    setSelected(todayFormatted)
    monthRef.current.scrollToIndex({index:parseInt(todayFormatted.split('-')[1])-1,animated:true,viewOffset:RFValue(50)})
  }

  function handleHandleBar() {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
          500,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity
        )        
    );
    setSwipe(swipe=>!swipe)
  }

  return (
    <>
    <Container swipe={swipe} colors={['#387b85', '#22474c']}>
      <HeaderView>
        <IconButton onPress={()=>{}}>
          <Icon name='chevron-left'/>
        </IconButton>
        <HeaderText>Agendamento</HeaderText>
        <TodayButton onPress={handleTodayButton}> 
          <TodayText>Hoje</TodayText>
          <TodayIcon name='calendar'/>
        </TodayButton>
      </HeaderView>
      <Week selected={selected} monthRef={monthRef} swipe={swipe} setSelected={setSelected} todayFormatted={todayFormatted} calendarRows={calendarRows} selectedDate={selectedDate} daysShort={daysShort} monthNames={monthNames} getNextMonth={getNextMonth} getPrevMonth={getPrevMonth}/>
      {/* <Month selected={selected} setSelected={setSelected} calendarRows={calendarRows} selectedDate={selectedDate} daysShort={daysShort} monthNames={monthNames} getNextMonth={getNextMonth} getPrevMonth={getPrevMonth}/> */}
      {/* <Button
        text='LOGOUT'
        onPress={name}
        /> */}
    </Container>
    <BottomView style={[styles.shadow]}>
    <HandleButton onPress={handleHandleBar}>
        <HandleView/>
    </HandleButton>

    </BottomView>
    </>
    // <SafeContainer colors={['#4c669f', '#3b5998', '#192f6a']}>
    //   { user &&
    //   }
    // </SafeContainer>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.98,
    shadowRadius: 16.00,

    elevation: 8,
  },
});

// {/* <LinearGradient
// // Button Linear Gradient

// style={styles.button}>
// <Text style={styles.text}>Sign in with Facebook</Text>
// </LinearGradient> */}