import React from 'react';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled(RectButton)`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.primary.main};
	border-radius: 5px;
	align-items: center;
	padding: 18px;
`;


export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.primary.contrastText};
`;


export function Button({ title, onPress, ...rest }){
	return (
		<Container
			onPress={onPress}
			{ ...rest }
		>
			<Title>
				{ title }
			</Title>
		</Container>
	)
}
