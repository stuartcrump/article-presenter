import React, { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
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
import { apiUrl, taxonomy } from '../../constants';

function HeaderComponent() {
  const [menuState, setMenuState] = useState(false);
  const [error, setError] = useState('');
  const [fetched, setFetched] = useState(false);
  const [categories, setCategories] = useState({
    numFound: 0,
    documents: []
  });
  let history = useHistory();

  useEffect(() => {
    const categoriesURL = `${apiUrl}/delivery/v1/search?q=*:*&fl=id,name&fq=classification:(category)&fq=path:(%5C/${taxonomy}/*)`;
    const data$ = Observable.create(observer => {
      fetch(categoriesURL)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          setError(error);
          observer.error(error);
        });
    }).subscribe(
      data => {
        if (data.errors) {
          setError(data.message);
        } else {
          setCategories(data);
        }

        setFetched(true);
      },
      error => {
        console.log('error', error);
        setError(error);
        setFetched(true);
      }
    );

    return () => data$.unsubscribe();
  }, []);

  const handleNavClick = (path, sideNav) => {
    history.push(`/category/${path}`);

    if (sideNav) {
      setMenuState(!menuState);
    }
  };

  const renderMenuItems = sideMenu => {
    if (fetched) {
      return error ? (
        <h2>{error}</h2>
      ) : (
        categories.documents.map(({ id, name }) => (
          <HeaderMenuItem onClick={() => handleNavClick(name, sideMenu)} key={id}>
            {name}
          </HeaderMenuItem>
        ))
      );
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
            <HeaderName
              prefix='Acoustic'
              onClick={() => {
                history.push('/');
              }}
            >
              Workshop
            </HeaderName>
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
