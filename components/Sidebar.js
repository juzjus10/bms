import React, { useState } from 'react';
import { createStyles, Navbar, Group, Code, Anchor } from '@mantine/core';
import {
  SwitchHorizontal,
  Logout,
  BrandHipchat,
  Certificate,
  Activity,
  Home,
  QuestionMark,
  Users,
  Notes,
  Settings,
} from 'tabler-icons-react';
import Link from 'next/link';
import { signOut } from "next-auth/react"
// import { MantineLogo } from '../../shared/MantineLogo';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
        },
      },
    },
  };
});

const data = [
  { link: '/', label: 'Home', icon: Home },
  { link: '/residentrecords', label: 'Residents Records', icon: Users },
  { link: '/blotterrecords', label: 'Blotter Records', icon: Notes },
  { link: '/certificates', label: 'Certificates', icon: Certificate },
  { link: '/activity', label: 'Activities', icon: Activity },
  { link: '/inquiries', label: 'Inquiries', icon: QuestionMark }, 
];

export function Sidebar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <Link href={item.link}>
    <Anchor
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      component="a"
      key={item.label}
      underline={false}
    
      onClick={(event) => {
        //event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Anchor>
    </Link>
  ));

  return (
    <>
    
      <Navbar.Section grow>
       
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <Settings className={classes.linkIcon} />
          <span>Settings</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => {
          event.preventDefault(); 
           signOut({ callbackUrl: "/auth/login" })
           }}>
          <Logout className={classes.linkIcon} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
      </>
  );
}