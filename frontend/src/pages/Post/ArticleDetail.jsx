import { createStyles, Text, Title, TextInput, Button, Image, rem } from '@mantine/core';
// import image from './image.svg';
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import useBoundStore from "../../store/Store";

import { useLoaderData } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
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
    maxWidth: '40%',

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
    flex: '1',
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export function ArticleDetail() {
  const {  user } = useBoundStore((state) => state);
  const post = useLoaderData();
  console.log(post);

  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>{post.Title}</Title>
        <Text fw={500} fz="lg" mb={5}>
          {post.userId}
        </Text>
        <Text fz="sm" c="dimmed">
          {post.content}
        </Text>

        <div className={classes.controls}>
          {!!user ? (
            <Button className={classes.control}>Edit</Button>
          ) : (
            <p>test</p>
          )}
          
        </div>
      </div>
      <Image src={post.image} className={classes.image} />
    </div>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  const id = params.id;
  // console.log(typeof(id));
  const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
  console.log(res.data);
  return res.data;
  // return null;
};