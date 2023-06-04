import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import { NavLink } from 'react-router-dom';
import { SwitchToggle } from './ThemeToggle';
import useBoundStore from "../../store/Store";

const useStyles = createStyles((theme) => ({
  h4: {
    padding: 0,
    margin: 0,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    // textDecoration: 'none',
    // color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    // fontSize: theme.fontSizes.sm,
    // fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

// interface HeaderSimpleProps {
//   links: { link: string; label: string }[];
// }

export function HeaderSimple({ links }) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0]);
  const { classes, cx } = useStyles();

  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <MantineLogo size={28} />
        <Group spacing={5} className={classes.links}>
          <NavLink to="/" onClick={() => {setActive(links);}}>
            <h4
            className={cx(classes.link, { [classes.linkActive]: active === links })}>
              Home
            </h4>
          </NavLink>
          {!!user && (
            <NavLink to="posts" onClick={() => {setActive(links);}}>
              {" "}
              <h4 
              className={cx(classes.link, { [classes.linkActive]: active === links })}>
                Posts
              </h4>
            </NavLink>
          )}
          {!!user ? (
            <h4 
            className={cx(classes.link, { [classes.linkActive]: active === links })} 
            onClick={onLogout}>
              Logout
            </h4>
          ) : (
            <NavLink to="login" onClick={() => {setActive(links);}}>
              <h4
              className={cx(classes.link, { [classes.linkActive]: active === links })}>
                Login
              </h4>
            </NavLink>
          )}
          <SwitchToggle />
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </Container>
    </Header>
  );
}