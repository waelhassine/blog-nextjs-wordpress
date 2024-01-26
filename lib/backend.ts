import { promises as fsPromises } from "fs";

const credentials = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
};

const apiEndpoint = process.env.WOEDPRESS_URL;

async function createPost(
  title: string,
  content: string,
  imageName: string,
): Promise<void> {
  try {
    const imagePath = `public/${imageName}`;
    const imageData = await fsPromises.readFile(imagePath);

    // Step 1: Upload media
    const mediaResponse = await uploadMedia(imageData, imageName);

    // Step 2: Create post
    const newPost = await createWordPressPost(title, content, mediaResponse.id);

    console.log("Post created successfully:", newPost.id);
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

async function uploadMedia(imageData: Buffer, imageName: string) {
  const mediaEndpoint = `${apiEndpoint}/wp/v2/media`;
  const base64Image = imageData.toString("base64");

  const response = await fetch(mediaEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(
        `${credentials.username}:${credentials.password}`,
      )}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file: base64Image,
      title: "My awesome image",
      alt_text: "an image of something awesome",
      caption: "This is the caption text",
      description: "More explanatory information",
    }),
  });

  return await response.json();
}

async function createWordPressPost(
  title: string,
  content: string,
  mediaId: number,
) {
  const postsEndpoint = `${apiEndpoint}/wp/v2/posts`;

  const response = await fetch(postsEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(
        `${credentials.username}:${credentials.password}`,
      )}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      featured_media: mediaId,
    }),
  });

  return await response.json();
}
async function getAllPosts(page = 1, perPage = 6) {
  try {
    const postsEndpoint = `${apiEndpoint}/wp/v2/posts?_embed=true&per_page=${perPage}&page=${page}`;
    const response = await fetch(postsEndpoint, {
      next: { revalidate: 3600 },
      headers: {
        Authorization: `Basic ${btoa(
          `${credentials.username}:${credentials.password}`,
        )}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      if (data.length === 0) {
        console.log("No posts found for Page", page);
      } else {
        console.log("Posts for Page", page, ":", data.posts);
      }

      return {
        posts: data,
        totalPosts: parseInt(response.headers.get("X-WP-Total") || "0", 10), // Convert to number
      };
    } else {
      // Handle the case where 'data' is undefined
      console.error("Error: Unexpected undefined value in response data");
      return { posts: [], totalPosts: null };
    }
  } catch (error) {
    console.error("Error fetching posts for page", page, ":", error);
    return { posts: [], totalPosts: null };
  }
}
async function getPostBySlug(slug: string): Promise<any> {
  try {
    const response = await fetch(
      `${apiEndpoint}/wp/v2/posts?_embed=true&slug=${slug}`,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `${credentials.username}:${credentials.password}`,
          )}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const [post] = await response.json();

    return { post };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    throw error;
  }
}

export { createPost, getAllPosts, getPostBySlug };
