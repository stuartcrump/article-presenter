import React, { useState } from 'react';
import {
  HeaderName,
  HeaderContainer,
  Header as CarbonHeader,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderNavigation,
  SideNav,
  SideNavItems,
  HeaderSideNavItems
} from 'carbon-components-react';
import { useHistory } from 'react-router-dom';

function HeaderComponent({ categories }) {
  const [menuState, setMenuState] = useState(false);
  let history = useHistory();

  const handleMenuItemClick = (path, sideMenu) => {
    history.push(`/category/${path}`);

    if (sideMenu) {
      setMenuState(!menuState);
    }
  };

  function RenderMenuItems(sideMenu) {
    return categories.map(({ id, name }) => {
      return (
        <HeaderMenuItem onClick={() => handleMenuItemClick(name, sideMenu)} key={id}>
          {name}
        </HeaderMenuItem>
      );
    });
  }

  return (
    <HeaderContainer
      render={() => (
        <>
          <CarbonHeader aria-label='Acoustic Header'>
            <HeaderMenuButton aria-label='Menu State Handler' onClick={() => setMenuState(!menuState)} isActive={menuState} />
            <
            // @ts-ignore
            HeaderName prefix='Acoustic' onClick={() => history.push('/')}>
              Workshop
            </HeaderName>
            <HeaderNavigation aria-label='Acoustic'>{RenderMenuItems(false)}</HeaderNavigation>
            <SideNav aria-label='Side navigation' expanded={menuState} isPersistent={false}>
              <SideNavItems>
                <HeaderSideNavItems>{RenderMenuItems(true)}</HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </CarbonHeader>
        </>
      )}
    />
  );
}

export default HeaderComponent;
