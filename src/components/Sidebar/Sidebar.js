import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import './Sidebar.css';

// ?? Fix Sidebar for mobile device
const SidebarItem = ({ label, items, link, depthStep = 10, depth = 0, ...rest }) => {
    return (
        <>
            <Link to={link}>
                <ListItem button dense {...rest}>
                    <ListItemText style={{ paddingLeft: depth * depthStep }}>
                        <h5>{label}</h5>
                    </ListItemText>
                </ListItem>
            </Link>
            {Array.isArray(items)
                ? (
                    <List disablePadding dense>
                        {items.map((subItem) => (
                            <SidebarItem
                                key={subItem.name}
                                depth={depth + 1}
                                depthStep={depthStep}
                                {...subItem}
                            />
                        ))}
                    </List>
                )
                : null}
        </>
    )
}

const Sidebar = ({ items, depthStep, depth }) => {
    return (
        <div className="sidebar">
            <List disablePadding dense>
                {items.map((sidebarItem, index) => (
                    <SidebarItem
                        key={`$(sidebarItem.name)${index}`}
                        depthStep={depthStep}
                        depth={depth}
                        {...sidebarItem}
                    />
                ))}
            </List>
        </div>
    )
}

export default Sidebar