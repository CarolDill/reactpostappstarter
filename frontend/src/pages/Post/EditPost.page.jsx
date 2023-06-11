import { TextInput, Button, Group, Box } from "@mantine/core";
import { useState } from "react";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate, useLoaderData } from "react-router-dom";
import useBoundStore from "../../store/Store";


export function EditPostPage() {
  const navigate = useNavigate();
  const post = useLoaderData();
  const [error, setError] = useState();
  // const { user } = useBoundStore((state) => state);

  const form = useForm({
    initialValues: {...post},
  });

  const handleSubmit = async (values) => {
    // console.log(values.id);
    const res = await axios.post(`${DOMAIN}/api/posts/edit/${values.id}`, values);
    console.log("edit post res:", res.data)
    if(res?.response?.data) {
      console.log('error')
      setError(res.response.data.message);
    } else if (res?.data.success) {
      console.log('success editPost');
      navigate(`/posts/${values.id}`);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder={post.title}
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder={post.category}
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder={post.image}
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder={post.content}
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
}

export const postEditDetailsLoader = async ({ params }) => {
  const id = params.id;
  const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
  return res.data;
};
