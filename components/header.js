import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

  export default () => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link route="/">
                <a className="item">Главная</a>
            </Link>
            <Menu.Item>
                   <h4> Учет курсов на блокчейне Ethereum</h4>
            </Menu.Item>
            <Menu.Menu position='right'>

                <Link route="/search">
                    <a className="item">Поиск</a>
                </Link>

                <Link route="/courses/new">
                    <a className="item">Создать курс</a>
                </Link>

                <Link route="/about">
                    <a className="item">О проекте</a>
                </Link>
            </Menu.Menu>
        </Menu> 
    );
};