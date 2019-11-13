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

function HeaderComponent({ categories }) {
  const [menuState, setMenuState] = useState(false);

  function RenderMenuItems() {
    return categories.map(category => {
      return (
        <HeaderMenuItem href={`/category/${category.name}`} key={category.id}>
          {category.name}
        </HeaderMenuItem>
      );
    });
  }

  return (
    <HeaderContainer
      render={() => (
        <>
          <CarbonHeader aria-label='Acoustic Header'>
            <HeaderMenuButton
              aria-label='Menu State Handler'
              onClick={() => {
                setMenuState(!menuState);
              }}
              isActive={menuState}
            />
            <HeaderName href='/' prefix='Acoustic'>
              Workshop
            </HeaderName>
            <HeaderNavigation aria-label='Acoustic'>{RenderMenuItems()}</HeaderNavigation>
            <SideNav aria-label='Side navigation' expanded={menuState} isPersistent={false}>
              <SideNavItems>
                <HeaderSideNavItems>{RenderMenuItems()}</HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </CarbonHeader>
        </>
      )}
    />
  );
}

export default HeaderComponent;
