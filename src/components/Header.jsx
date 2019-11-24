import React, { useState, useEffect } from 'react';
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
import { apiUrl, taxonomy } from '../utils/constants';
import rxFetch from '../utils/helpers';
import './Header.scss';

function HeaderComponent() {
  const [menuState, setMenuState] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [categories, setCategories] = useState({
    error: false,
    message: 'Error',
    numFound: 0,
    documents: []
  });
  const history = useHistory();

  useEffect(() => {
    const categoriesURL = `${apiUrl}/delivery/v1/search?q=*:*&fl=id,name&fq=classification:(category)&fq=path:(%5C/${taxonomy}/*)`;
    const categories$ = rxFetch(categoriesURL).subscribe({
      next: response => setCategories(response),
      complete: () => setFetched(true)
    });

    return () => categories$.unsubscribe();
  }, []);

  const handleNavClick = (path, sideNav) => {
    history.push(`/category/${path}`);

    if (sideNav) {
      setMenuState(!menuState);
    }
  };

  const renderMenuItems = sideMenu => {
    const { documents, error, message, numFound } = categories;

    if (fetched) {
      if (error) {
        return <h2>{message}, couldn't get categories.</h2>;
      } else if (numFound === 0) {
        return <h2>No categories found.</h2>;
      } else {
        return (
          documents &&
          documents.map(({ id, name }) => (
            <HeaderMenuItem onClick={() => handleNavClick(name, sideMenu)} key={id}>
              {name}
            </HeaderMenuItem>
          ))
        );
      }
    } else {
      return <HeaderMenuItem>Loading</HeaderMenuItem>;
    }
  };

  return (
    <HeaderContainer
      render={() => (
        <>
          <CarbonHeader aria-label='Acoustic Header'>
            <HeaderMenuButton aria-label='Menu State Handler' onClick={() => setMenuState(!menuState)} isActive={menuState} />
            <div
              className='logo-wrapper'
              onClick={() => {
                history.push('/');
              }}
            >
              <HeaderName prefix='Acoustic'>Workshop</HeaderName>
            </div>
            <HeaderNavigation aria-label='Acoustic'>{renderMenuItems(false)}</HeaderNavigation>
            <SideNav aria-label='Side navigation' expanded={menuState} isPersistent={false}>
              <SideNavItems>
                <HeaderSideNavItems>{renderMenuItems(true)}</HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </CarbonHeader>
        </>
      )}
    />
  );
}

export default HeaderComponent;
