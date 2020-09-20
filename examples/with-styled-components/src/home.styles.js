import styled, { keyframes } from 'styled-components';

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const HomeContainer = styled.div`
  text-align: center;
`;

export const HomeHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  height: 150px;
  padding: 20px;
  color: white;

  .home-logo {
    animation: ${logoSpin} infinite 20s linear;
    height: 80px;
  }
`;

export const HomeIntro = styled.p`
  font-size: large;
`;