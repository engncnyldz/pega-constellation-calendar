// utilizing theming, comment out, if want individual style
// import styled from 'styled-components';
// import { Configuration } from '@pega/cosmos-react-core';

// export default styled(Configuration)``;

// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';
import { defaultThemeProp } from '@pega/cosmos-react-core';

export const DrawerStyle = styled.div(({ theme }) => {
  return css`
    height: 100%;
    background-color: ${theme.base.colors.gray['extra-light']};
  `;
});

DrawerStyle.defaultProps = defaultThemeProp;
