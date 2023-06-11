import { createStyles, Text, Title, TextInput, Button, Image, rem } from '@mantine/core';
// import image from './image.svg';
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import useBoundStore from "../../store/Store";

import { useLoaderData, Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    maxWidth: 800,
    margin: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column-reverse',
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: '30%',

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xl} * 4)`,

    [theme.fn.smallerThan('sm')]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: 'flex',
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: '100%',
    // justifyItems:'flex-end',
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
}));

const getName = (email) => {
  const pos = email.indexOf("@");
  return email.substring(0,pos);
}

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ArticleDetail() {
  const {  user } = useBoundStore((state) => state);
  const post = useLoaderData();
  // console.log(post);

  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>{post.Title}</Title>
        <Text fw={500} fz="lg" mb={5}>
          {post.title}
        </Text>
        <Text  fz="xs" mb={3}>
          By: {getName(user.email)}
        </Text>
        <Text  fz="xs" mb={3}>
         {capitalize(post.category)}
        </Text>
        <Text fz="sm" c="dimmed">
          {post.content}
        </Text>

        <div className={classes.controls}>
          {user &&<Link to={"../posts/edit/" + post.id}><Button className={classes.control}>Edit</Button></Link>}
        </div>
      </div>
      <Image src={post.image} className={classes.image} />
    </div>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  const id = params.id;
  const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
  // console.log(res.data);
  return res.data;
};