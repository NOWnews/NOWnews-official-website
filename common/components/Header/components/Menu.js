import React, { PureComponent, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

class Menu extends PureComponent {

  render () {
    const { menus, currentMainMenu, currentChildMenu } = this.props;
    let childMenus = [];
    let mainMenuDoms = [];

    menus.map(({ _id, child, isExternal, name, sn, url }) => {
      let isCurrentMainMenu = false;

      if (_id === currentMainMenu) {
        childMenus = child || [];
        isCurrentMainMenu = true;
      }

      let linkClass = css(
        styles.link,
        (isCurrentMainMenu) && styles.menuActive
      );

      mainMenuDoms.push(
        <Link
          className={linkClass}
          key={sn}
          target={isExternal === true ? '_blank' : null}
          to={url}>
          { name }
        </Link>
      );
    });

    return (
      <div>
        <div className={css(styles.menu)}>{ mainMenuDoms }</div>
        <div className={css(styles.subMenu)}>
          { childMenus.map(({ _id, sn, isExternal, url, name }) =>
            <Link
              className={`${css(styles.link)} ${(_id === currentChildMenu) && css(styles.subMenuActive)}`}
              key={sn}
              target={isExternal === true ? '_blank' : null}
              to={url}>
              { name }
            </Link>
          )}
        </div>
      </div>
    );
  };
}
const styles = StyleSheet.create({
  link: {
    color: '#000',
    padding: '1rem 10px',
    textDecoration: 'none',
    transition: '.2s opacity ease',
    ':hover': {
      color: '#EE7800',
      opacity: 0.6
    }
  },
  menu: {
    display: 'flex',
    fontWeight: 800,
    justifyContent: 'space-around',
    background: '#fec340'
  },
  menuActive: {
    background: '#ffffff',
    color: '#000000'
  },
  subMenu: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subMenuActive: {
    color: '#EE7800'
  }
});

Menu.propTypes = {
  currentMainMenu: PropTypes.string,
  currentChildMenu: PropTypes.string,
  menus: PropTypes.array.isRequired
};

export default Menu;
